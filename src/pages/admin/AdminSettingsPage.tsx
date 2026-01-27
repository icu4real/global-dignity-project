import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Settings, DollarSign, UserPlus, Loader2 } from "lucide-react";

interface CampaignSettings {
  min_contribution: number;
  max_contribution: number;
}

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<CampaignSettings>({
    min_contribution: 100,
    max_contribution: 100000,
  });
  const [inviteEmail, setInviteEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("campaign_settings")
        .select("*");

      if (error) throw error;

      const settingsMap: Record<string, any> = {};
      data?.forEach((s) => {
        settingsMap[s.setting_key] = s.setting_value;
      });

      setSettings({
        min_contribution: settingsMap.min_contribution || 100,
        max_contribution: settingsMap.max_contribution || 100000,
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Upsert min_contribution
      await supabase
        .from("campaign_settings")
        .upsert({
          setting_key: "min_contribution",
          setting_value: settings.min_contribution,
          updated_by: user?.id,
        }, { onConflict: "setting_key" });

      // Upsert max_contribution
      await supabase
        .from("campaign_settings")
        .upsert({
          setting_key: "max_contribution",
          setting_value: settings.max_contribution,
          updated_by: user?.id,
        }, { onConflict: "setting_key" });

      toast({
        title: "Settings Saved",
        description: "Campaign settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const sendInvite = async () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setIsInviting(true);
    try {
      // Check if invite already exists
      const { data: existing } = await supabase
        .from("admin_invites")
        .select("id")
        .eq("email", inviteEmail.toLowerCase())
        .maybeSingle();

      if (existing) {
        toast({
          title: "Already Invited",
          description: "This email has already been invited.",
          variant: "destructive",
        });
        setIsInviting(false);
        return;
      }

      // Create invite
      const { error } = await supabase
        .from("admin_invites")
        .insert({
          email: inviteEmail.toLowerCase(),
          invited_by: user?.id,
          role: "admin",
        });

      if (error) throw error;

      toast({
        title: "Invite Sent",
        description: `Admin invite created for ${inviteEmail}. They can now sign up and access the admin portal.`,
      });
      setInviteEmail("");
    } catch (error) {
      console.error("Error sending invite:", error);
      toast({
        title: "Error",
        description: "Failed to create invite.",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage campaign settings and team access.
          </p>
        </div>

        {/* Campaign Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Contribution Limits
            </CardTitle>
            <CardDescription>
              Set minimum and maximum contribution amounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="min">Minimum Contribution ($)</Label>
                    <Input
                      id="min"
                      type="number"
                      value={settings.min_contribution}
                      onChange={(e) =>
                        setSettings({ ...settings, min_contribution: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max">Maximum Contribution ($)</Label>
                    <Input
                      id="max"
                      type="number"
                      value={settings.max_contribution}
                      onChange={(e) =>
                        setSettings({ ...settings, max_contribution: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Admin Invites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Invite Admin
            </CardTitle>
            <CardDescription>
              Invite a new administrator to the Pride Campaign portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <Button onClick={sendInvite} disabled={isInviting}>
                {isInviting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inviting...
                  </>
                ) : (
                  "Send Invite"
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              The invited user will need to create an account using this email address.
              Once they sign up, they will have access to the admin portal.
            </p>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Signed in as:</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
