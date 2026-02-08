import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  TrendingUp,
  Shield,
  Scale,
  ArrowUpRight,
  BarChart3,
  Target,
  LogOut,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const COLORS = [
  "hsl(220, 45%, 18%)",
  "hsl(45, 60%, 50%)",
  "hsl(145, 55%, 42%)",
  "hsl(0, 65%, 55%)",
  "hsl(210, 65%, 50%)",
];

interface Donation {
  id: string;
  amount: number;
  category: string;
  donation_type: string;
  donor_name: string;
  donor_email: string;
  status: string;
  created_at: string;
}

export default function MembersPage() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchDonations = async () => {
      const { data } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });
      setDonations((data as Donation[]) || []);
      setLoading(false);
    };
    fetchDonations();
  }, [user]);

  const stats = useMemo(() => {
    const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
    const confirmed = donations.filter((d) => d.status === "confirmed");
    const confirmedTotal = confirmed.reduce((sum, d) => sum + d.amount, 0);
    const uniqueDonors = new Set(donations.map((d) => d.donor_email)).size;

    // Category breakdown
    const byCategory: Record<string, number> = {};
    donations.forEach((d) => {
      byCategory[d.category] = (byCategory[d.category] || 0) + d.amount;
    });

    const categoryData = Object.entries(byCategory).map(([name, value]) => ({
      name: name === "legal" ? "Legal Protection" : name === "safety" ? "Safety & Emergency" : name,
      value,
    }));

    // Monthly trend (last 6 months)
    const monthlyData: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      monthlyData[key] = 0;
    }
    donations.forEach((d) => {
      const date = new Date(d.created_at);
      const key = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (monthlyData[key] !== undefined) {
        monthlyData[key] += d.amount;
      }
    });
    const trendData = Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount,
    }));

    // Type breakdown (one-time vs recurring)
    const byType: Record<string, number> = {};
    donations.forEach((d) => {
      byType[d.donation_type] = (byType[d.donation_type] || 0) + d.amount;
    });
    const typeData = Object.entries(byType).map(([name, value]) => ({
      name: name === "one-time" ? "One-time" : "Recurring",
      value,
    }));

    return { totalRaised, confirmedTotal, uniqueDonors, categoryData, trendData, typeData, count: donations.length };
  }, [donations]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-campaign text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!user) return null;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const metrics = [
    { label: "Total Raised", value: formatCurrency(stats.totalRaised), subtitle: "All contributions", icon: BarChart3 },
    { label: "Contributions", value: stats.count.toString(), subtitle: "Total transactions", icon: Target },
    { label: "Unique Donors", value: stats.uniqueDonors.toString(), subtitle: "Community members", icon: Shield },
    { label: "Confirmed", value: formatCurrency(stats.confirmedTotal), subtitle: "Verified funds", icon: TrendingUp },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 bg-primary">
        <div className="container-campaign">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/60 text-sm tracking-widest uppercase mb-2">
                Impact Dashboard
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-primary-foreground">
                Your Portfolio
              </h1>
            </div>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-0 -mt-6 relative z-10">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <Card key={m.label} className="card-elevated">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <m.icon className="h-4 w-4 text-muted-foreground" />
                    <ArrowUpRight className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
                    {m.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{m.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Charts & Data */}
      <section className="section-padding">
        <div className="container-campaign">
          <Tabs defaultValue="overview" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="headline-section text-foreground">Analytics</h2>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trend Chart */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground text-sm mb-4">Monthly Contributions</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.trendData}>
                          <defs>
                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(220, 45%, 18%)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(220, 45%, 18%)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                          <Tooltip formatter={(v: number) => formatCurrency(v)} />
                          <Area type="monotone" dataKey="amount" stroke="hsl(220, 45%, 18%)" fill="url(#colorAmt)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Pie */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground text-sm mb-4">Fund Allocation</h3>
                    <div className="h-48 flex items-center">
                      {stats.categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={stats.categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={75}
                              dataKey="value"
                              paddingAngle={4}
                            >
                              {stats.categoryData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v: number) => formatCurrency(v)} />
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

                {/* Type Bar Chart */}
                <Card className="card-elevated md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-foreground text-sm mb-4">By Contribution Type</h3>
                    <div className="h-40">
                      {stats.typeData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.typeData} layout="vertical">
                            <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                            <Tooltip formatter={(v: number) => formatCurrency(v)} />
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

            <TabsContent value="activity" className="space-y-3">
              {donations.length === 0 ? (
                <Card className="card-elevated">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No contributions recorded yet.</p>
                  </CardContent>
                </Card>
              ) : (
                donations.slice(0, 20).map((d) => (
                  <Card key={d.id} className="card-elevated">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        d.status === "confirmed" ? "bg-accent" : "bg-muted-foreground"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {formatCurrency(d.amount)} — {d.category === "legal" ? "Legal Protection" : d.category === "safety" ? "Safety & Emergency" : d.category}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {d.donor_name} · {d.donation_type}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          d.status === "confirmed" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          {d.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(d.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
