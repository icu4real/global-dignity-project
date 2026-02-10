import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Heart, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  status: string;
  category: string;
  start_date: string;
  created_at: string;
}

interface Engagement {
  campaign_id: string;
}

export default function CampaignsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [engagementCounts, setEngagementCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: campaignData } = await supabase
        .from("campaigns")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      setCampaigns((campaignData as Campaign[]) || []);

      // Get engagement counts
      const { data: allEngagements } = await supabase
        .from("campaign_engagements")
        .select("campaign_id");
      const counts: Record<string, number> = {};
      (allEngagements || []).forEach((e: any) => {
        counts[e.campaign_id] = (counts[e.campaign_id] || 0) + 1;
      });
      setEngagementCounts(counts);

      if (user) {
        const { data: userEngagements } = await supabase
          .from("campaign_engagements")
          .select("campaign_id")
          .eq("user_id", user.id);
        setEngagements((userEngagements as Engagement[]) || []);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const isJoined = (campaignId: string) =>
    engagements.some((e) => e.campaign_id === campaignId);

  const handleJoin = async (campaignId: string) => {
    if (!user) {
      toast.error("Please sign in to join campaigns");
      return;
    }
    setJoining(campaignId);
    if (isJoined(campaignId)) {
      const { error } = await supabase
        .from("campaign_engagements")
        .delete()
        .eq("campaign_id", campaignId)
        .eq("user_id", user.id);
      if (error) toast.error("Failed to leave campaign");
      else {
        setEngagements((prev) => prev.filter((e) => e.campaign_id !== campaignId));
        setEngagementCounts((prev) => ({ ...prev, [campaignId]: (prev[campaignId] || 1) - 1 }));
        toast.success("You left this campaign");
      }
    } else {
      const { error } = await supabase
        .from("campaign_engagements")
        .insert({ campaign_id: campaignId, user_id: user.id });
      if (error) toast.error("Failed to join campaign");
      else {
        setEngagements((prev) => [...prev, { campaign_id: campaignId }]);
        setEngagementCounts((prev) => ({ ...prev, [campaignId]: (prev[campaignId] || 0) + 1 }));
        toast.success("You joined this campaign!");
      }
    }
    setJoining(null);
  };

  const categoryColors: Record<string, string> = {
    advocacy: "bg-blue-100 text-blue-700",
    legal: "bg-purple-100 text-purple-700",
    safety: "bg-red-100 text-red-700",
    education: "bg-green-100 text-green-700",
    community: "bg-amber-100 text-amber-700",
  };

  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6">Active Campaigns</h1>
            <p className="body-large text-muted-foreground">
              Join movements that matter. Every voice strengthens the cause.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading campaigns...</p>
          ) : campaigns.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <p className="text-muted-foreground mb-6">No active campaigns right now. Check back soon.</p>
              <Link to="/">
                <Button className="btn-primary">Return Home <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {campaigns.map((campaign) => {
                const joined = isJoined(campaign.id);
                const progress = campaign.goal_amount > 0
                  ? Math.min(100, (campaign.current_amount / campaign.goal_amount) * 100)
                  : 0;
                const supporters = engagementCounts[campaign.id] || 0;

                return (
                  <Card key={campaign.id} className="card-elevated overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[campaign.category] || "bg-muted text-muted-foreground"}`}>
                            {campaign.category}
                          </span>
                          <h3 className="font-serif text-xl text-foreground mt-2">{campaign.title}</h3>
                        </div>
                        {joined && <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {campaign.description}
                      </p>

                      {campaign.goal_amount > 0 && (
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                            <span>${campaign.current_amount.toLocaleString()} raised</span>
                            <span>${campaign.goal_amount.toLocaleString()} goal</span>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" /> {supporters} supporter{supporters !== 1 ? "s" : ""}
                        </span>
                        <Button
                          size="sm"
                          variant={joined ? "outline" : "default"}
                          disabled={joining === campaign.id}
                          onClick={() => handleJoin(campaign.id)}
                          className={joined ? "" : "btn-primary"}
                        >
                          {joined ? "Leave" : <><Heart className="h-3.5 w-3.5 mr-1.5" /> Join</>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
