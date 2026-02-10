import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Plus, Trash2, Users, Target } from "lucide-react";
import { format } from "date-fns";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  status: string;
  category: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export default function AdminCampaignsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [category, setCategory] = useState("advocacy");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load campaigns");
    else setCampaigns((data as Campaign[]) || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) return;
    setCreating(true);
    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        title: title.trim(),
        description: description.trim(),
        goal_amount: parseFloat(goalAmount) || 0,
        category,
        created_by: user?.id,
      })
      .select()
      .single();
    if (error) toast.error("Failed to create campaign");
    else {
      setCampaigns((prev) => [data as Campaign, ...prev]);
      setTitle(""); setDescription(""); setGoalAmount(""); setShowForm(false);
      toast.success("Campaign created");
    }
    setCreating(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "completed" : "active";
    const { error } = await supabase.from("campaigns").update({ status: newStatus }).eq("id", id);
    if (error) toast.error("Failed to update");
    else {
      setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
      toast.success(`Campaign ${newStatus}`);
    }
  };

  const deleteCampaign = async (id: string) => {
    const { error } = await supabase.from("campaigns").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.success("Campaign deleted");
    }
  };

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground mt-1">Create and manage community campaigns.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" /> New Campaign
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Input placeholder="Campaign title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              <div className="flex gap-4">
                <Input placeholder="Goal amount (USD)" type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} className="max-w-xs" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                >
                  <option value="advocacy">Advocacy</option>
                  <option value="legal">Legal Protection</option>
                  <option value="safety">Safety & Emergency</option>
                  <option value="education">Education</option>
                  <option value="community">Community</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate} disabled={creating || !title.trim() || !description.trim()}>
                  {creating ? "Creating..." : "Create Campaign"}
                </Button>
                <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No campaigns yet. Create your first one above.</p>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          campaign.status === "active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                        }`}>
                          {campaign.status}
                        </span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          {campaign.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Goal: {fmt(campaign.goal_amount)}</span>
                        <span>Created {format(new Date(campaign.created_at), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(campaign.id, campaign.status)}>
                        {campaign.status === "active" ? "Complete" : "Reactivate"}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteCampaign(campaign.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
