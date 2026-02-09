import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  TrendingUp, Shield, BarChart3, Target, ArrowUpRight,
  LogOut, PenLine, User, Bell, Send, Trash2,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  AreaChart, Area,
} from "recharts";

const COLORS = ["hsl(350,60%,70%)", "hsl(45,70%,55%)", "hsl(145,50%,50%)", "hsl(210,60%,55%)", "hsl(280,50%,60%)"];

interface Donation {
  id: string; amount: number; category: string; donation_type: string;
  donor_name: string; donor_email: string; status: string; created_at: string;
}

interface Profile {
  display_name: string | null; bio: string | null; avatar_url: string | null;
}

interface MyStory {
  id: string; title: string; content: string; excerpt: string | null;
  is_published: boolean; created_at: string;
}

export default function MembersPage() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "overview";

  const [donations, setDonations] = useState<Donation[]>([]);
  const [profile, setProfile] = useState<Profile>({ display_name: "", bio: "", avatar_url: "" });
  const [myStories, setMyStories] = useState<MyStory[]>([]);
  const [loading, setLoading] = useState(true);

  // Story form
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [submittingStory, setSubmittingStory] = useState(false);

  // Profile form
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [donRes, profRes, storiesRes] = await Promise.all([
        supabase.from("donations").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("display_name, bio, avatar_url").eq("user_id", user.id).maybeSingle(),
        supabase.from("community_stories").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setDonations((donRes.data as Donation[]) || []);
      if (profRes.data) {
        setProfile(profRes.data as Profile);
        setEditName(profRes.data.display_name || "");
        setEditBio(profRes.data.bio || "");
      }
      setMyStories((storiesRes.data as MyStory[]) || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const stats = useMemo(() => {
    const totalRaised = donations.reduce((s, d) => s + d.amount, 0);
    const confirmed = donations.filter((d) => d.status === "confirmed");
    const confirmedTotal = confirmed.reduce((s, d) => s + d.amount, 0);
    const uniqueDonors = new Set(donations.map((d) => d.donor_email)).size;

    const byCategory: Record<string, number> = {};
    donations.forEach((d) => { byCategory[d.category] = (byCategory[d.category] || 0) + d.amount; });
    const categoryData = Object.entries(byCategory).map(([name, value]) => ({
      name: name === "legal" ? "Legal Protection" : name === "safety" ? "Safety & Emergency" : name, value,
    }));

    const monthlyData: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthlyData[d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })] = 0;
    }
    donations.forEach((d) => {
      const key = new Date(d.created_at).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (monthlyData[key] !== undefined) monthlyData[key] += d.amount;
    });
    const trendData = Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));

    const byType: Record<string, number> = {};
    donations.forEach((d) => { byType[d.donation_type] = (byType[d.donation_type] || 0) + d.amount; });
    const typeData = Object.entries(byType).map(([name, value]) => ({
      name: name === "one-time" ? "One-time" : "Recurring", value,
    }));

    return { totalRaised, confirmedTotal, uniqueDonors, categoryData, trendData, typeData, count: donations.length };
  }, [donations]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: editName.trim(), bio: editBio.trim() })
      .eq("user_id", user.id);
    if (error) toast.error("Failed to save profile");
    else {
      toast.success("Profile updated");
      setProfile((p) => ({ ...p, display_name: editName.trim(), bio: editBio.trim() }));
    }
    setSavingProfile(false);
  };

  const handleSubmitStory = async () => {
    if (!user || !storyTitle.trim() || !storyContent.trim()) return;
    setSubmittingStory(true);
    const { data, error } = await supabase.from("community_stories").insert({
      user_id: user.id,
      title: storyTitle.trim(),
      content: storyContent.trim(),
      excerpt: storyContent.trim().slice(0, 200),
      is_published: false,
    }).select().single();
    if (error) toast.error("Failed to submit story");
    else {
      toast.success("Story submitted! It will be reviewed before publishing.");
      setMyStories((prev) => [data as MyStory, ...prev]);
      setStoryTitle("");
      setStoryContent("");
    }
    setSubmittingStory(false);
  };

  const handleDeleteStory = async (id: string) => {
    const { error } = await supabase.from("community_stories").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      setMyStories((prev) => prev.filter((s) => s.id !== id));
      toast.success("Story deleted");
    }
  };

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  if (authLoading || loading) {
    return <Layout><section className="section-padding"><div className="container-campaign text-center"><p className="text-muted-foreground">Loading...</p></div></section></Layout>;
  }
  if (!user) return null;

  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const metrics = [
    { label: "Total Raised", value: fmt(stats.totalRaised), sub: "All contributions", icon: BarChart3 },
    { label: "Contributions", value: stats.count.toString(), sub: "Total transactions", icon: Target },
    { label: "Unique Donors", value: stats.uniqueDonors.toString(), sub: "Community members", icon: Shield },
    { label: "Confirmed", value: fmt(stats.confirmedTotal), sub: "Verified funds", icon: TrendingUp },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 bg-primary">
        <div className="container-campaign flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/60 text-sm tracking-widest uppercase mb-2">Impact Dashboard</p>
            <h1 className="font-serif text-3xl md:text-4xl text-primary-foreground">
              Welcome, {profile.display_name || user.email?.split("@")[0]}
            </h1>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </section>

      {/* Engagement prompt */}
      <section className="py-3 bg-accent/10 border-b border-accent/20">
        <div className="container-campaign flex items-center gap-3">
          <Bell className="h-4 w-4 text-accent" />
          <p className="text-sm text-foreground">
            {myStories.length === 0
              ? "Share your first story and inspire others in the community."
              : "Thank you for contributing! Your stories help build understanding."}
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-0 -mt-0 relative z-10 pt-6">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <Card key={m.label} className="card-elevated">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <m.icon className="h-4 w-4 text-muted-foreground" />
                    <ArrowUpRight className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding">
        <div className="container-campaign">
          <Tabs defaultValue={defaultTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Analytics</TabsTrigger>
              <TabsTrigger value="stories">My Stories</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground text-sm mb-4">Monthly Contributions</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.trendData}>
                          <defs>
                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(350,60%,70%)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(350,60%,70%)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                          <Tooltip formatter={(v: number) => fmt(v)} />
                          <Area type="monotone" dataKey="amount" stroke="hsl(350,60%,70%)" fill="url(#colorAmt)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground text-sm mb-4">Fund Allocation</h3>
                    <div className="h-48 flex items-center">
                      {stats.categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={stats.categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                              {stats.categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(v: number) => fmt(v)} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-muted-foreground text-sm mx-auto">No data yet</p>
                      )}
                    </div>
                    {stats.categoryData.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4 justify-center">
                        {stats.categoryData.map((cat, i) => (
                          <div key={cat.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="card-elevated md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground text-sm mb-4">By Contribution Type</h3>
                    <div className="h-40">
                      {stats.typeData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.typeData} layout="vertical">
                            <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                            <Tooltip formatter={(v: number) => fmt(v)} />
                            <Bar dataKey="value" fill="hsl(220, 45%, 18%)" radius={[0, 4, 4, 0]} barSize={24} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-muted-foreground text-sm text-center pt-12">No data yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories" className="space-y-6">
              <Card className="card-elevated">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
                    <PenLine className="h-4 w-4" /> Write a Story
                  </h3>
                  <Input
                    placeholder="Story title"
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Share your experience... Your story will be reviewed before publishing."
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    rows={6}
                  />
                  <Button
                    onClick={handleSubmitStory}
                    disabled={submittingStory || !storyTitle.trim() || !storyContent.trim()}
                    className="btn-primary"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {submittingStory ? "Submitting..." : "Submit Story"}
                  </Button>
                </CardContent>
              </Card>

              {myStories.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground text-sm">Your Stories</h3>
                  {myStories.map((story) => (
                    <Card key={story.id} className="card-elevated">
                      <CardContent className="p-4 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground text-sm">{story.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              story.is_published ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                            }`}>
                              {story.is_published ? "Published" : "In Review"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{story.content.slice(0, 100)}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteStory(story.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="card-elevated max-w-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{profile.display_name || "Member"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Display Name</label>
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                    <Textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Tell the community about yourself..." rows={4} />
                  </div>
                  <Button onClick={handleSaveProfile} disabled={savingProfile} className="btn-primary">
                    {savingProfile ? "Saving..." : "Save Profile"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
