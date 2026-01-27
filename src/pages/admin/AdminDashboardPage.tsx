import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, Users, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";

interface DashboardStats {
  totalDonations: number;
  totalAmount: number;
  confirmedAmount: number;
  pendingAmount: number;
  uniqueDonors: number;
  recentDonations: Array<{
    id: string;
    donor_name: string;
    amount: number;
    category: string;
    status: string;
    created_at: string;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalAmount: 0,
    confirmedAmount: 0,
    pendingAmount: 0,
    uniqueDonors: 0,
    recentDonations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: donations, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const totalAmount = donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      const confirmedAmount = donations?.filter(d => d.status === "confirmed").reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      const pendingAmount = donations?.filter(d => d.status === "pending").reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      const uniqueEmails = new Set(donations?.map(d => d.donor_email) || []);

      setStats({
        totalDonations: donations?.length || 0,
        totalAmount,
        confirmedAmount,
        pendingAmount,
        uniqueDonors: uniqueEmails.size,
        recentDonations: donations?.slice(0, 5) || [],
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Contributions",
      value: formatCurrency(stats.totalAmount),
      description: `${stats.totalDonations} contributions received`,
      icon: DollarSign,
    },
    {
      title: "Confirmed",
      value: formatCurrency(stats.confirmedAmount),
      description: "Verified transactions",
      icon: TrendingUp,
    },
    {
      title: "Pending",
      value: formatCurrency(stats.pendingAmount),
      description: "Awaiting confirmation",
      icon: Clock,
    },
    {
      title: "Unique Donors",
      value: stats.uniqueDonors.toString(),
      description: "Individual contributors",
      icon: Users,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of Pride Campaign contributions and activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="pride-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Contributions</CardTitle>
            <CardDescription>
              Latest contributions to Pride Campaign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            ) : stats.recentDonations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No contributions yet.
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{donation.donor_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {donation.category} • {format(new Date(donation.created_at), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(donation.amount)}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          donation.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
