import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Download, Search, Users } from "lucide-react";

interface Donor {
  email: string;
  name: string;
  totalAmount: number;
  donationCount: number;
  lastDonation: string;
  categories: string[];
}

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [donors, searchTerm]);

  const fetchDonors = async () => {
    try {
      const { data: donations, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Aggregate donors
      const donorMap = new Map<string, Donor>();

      donations?.forEach((d) => {
        const existing = donorMap.get(d.donor_email);
        if (existing) {
          existing.totalAmount += Number(d.amount);
          existing.donationCount += 1;
          if (!existing.categories.includes(d.category)) {
            existing.categories.push(d.category);
          }
          if (new Date(d.created_at) > new Date(existing.lastDonation)) {
            existing.lastDonation = d.created_at;
            existing.name = d.donor_name;
          }
        } else {
          donorMap.set(d.donor_email, {
            email: d.donor_email,
            name: d.donor_name,
            totalAmount: Number(d.amount),
            donationCount: 1,
            lastDonation: d.created_at,
            categories: [d.category],
          });
        }
      });

      const donorList = Array.from(donorMap.values()).sort(
        (a, b) => b.totalAmount - a.totalAmount
      );

      setDonors(donorList);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast({
        title: "Error",
        description: "Failed to load donor data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterDonors = () => {
    if (!searchTerm) {
      setFilteredDonors(donors);
      return;
    }

    const term = searchTerm.toLowerCase();
    setFilteredDonors(
      donors.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.email.toLowerCase().includes(term)
      )
    );
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Total Amount", "Donation Count", "Categories", "Last Donation"];
    const rows = filteredDonors.map((d) => [
      d.name,
      d.email,
      d.totalAmount.toString(),
      d.donationCount.toString(),
      d.categories.join("; "),
      format(new Date(d.lastDonation), "yyyy-MM-dd"),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `donors-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredDonors.length} donors to CSV.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalContributions = donors.reduce((sum, d) => sum + d.totalAmount, 0);
  const avgContribution = donors.length > 0 ? totalContributions / donors.reduce((sum, d) => sum + d.donationCount, 0) : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Donors</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage contributor relationships.
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="pride-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donors.length}</div>
            </CardContent>
          </Card>
          <Card className="pride-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Contributed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalContributions)}</div>
            </CardContent>
          </Card>
          <Card className="pride-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(avgContribution)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Donors Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Donors
            </CardTitle>
            <CardDescription>
              {filteredDonors.length} donors found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredDonors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No donors found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Total Contributed</TableHead>
                      <TableHead>Donations</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Last Donation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonors.map((donor) => (
                      <TableRow key={donor.email}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{donor.name}</p>
                            <p className="text-sm text-muted-foreground">{donor.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(donor.totalAmount)}
                        </TableCell>
                        <TableCell>{donor.donationCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {donor.categories.map((cat) => (
                              <span
                                key={cat}
                                className="text-xs bg-muted px-2 py-0.5 rounded"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(donor.lastDonation), "MMM d, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
