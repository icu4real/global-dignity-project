import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSubscription } from "@/components/EmailSubscription";
import {
  TrendingUp,
  Globe,
  Shield,
  Scale,
  ArrowUpRight,
  Users,
  BarChart3,
  Target,
} from "lucide-react";

const impactPortfolio = [
  {
    name: "Legal Defense Fund",
    allocation: 38,
    raised: "$1.2M",
    target: "$3.2M",
    progress: 38,
    change: "+12.4%",
    region: "Global",
    icon: Scale,
    description: "Constitutional challenges & legal representation",
  },
  {
    name: "Emergency Protection",
    allocation: 28,
    raised: "$890K",
    target: "$2.1M",
    progress: 42,
    change: "+8.7%",
    region: "Sub-Saharan Africa",
    icon: Shield,
    description: "Relocation & safe housing for at-risk individuals",
  },
  {
    name: "Education & Advocacy",
    allocation: 22,
    raised: "$640K",
    target: "$1.8M",
    progress: 36,
    change: "+15.2%",
    region: "Southeast Asia",
    icon: Globe,
    description: "Community programs & policy advocacy",
  },
  {
    name: "Healthcare Access",
    allocation: 12,
    raised: "$320K",
    target: "$950K",
    progress: 34,
    change: "+6.1%",
    region: "Latin America",
    icon: Users,
    description: "Medical care & mental health support",
  },
];

const recentActivity = [
  { action: "Legal victory", detail: "Constitutional protection expanded in Kenya", date: "2 days ago", type: "milestone" },
  { action: "Fund deployed", detail: "$45K emergency relocation — Uganda", date: "5 days ago", type: "deployment" },
  { action: "New partnership", detail: "UN Human Rights Council collaboration", date: "1 week ago", type: "partnership" },
  { action: "Impact report", detail: "Q4 2025 transparency report published", date: "2 weeks ago", type: "report" },
];

const metrics = [
  { label: "Total Impact", value: "$3.05M", subtitle: "Deployed YTD", icon: BarChart3 },
  { label: "Active Programs", value: "34", subtitle: "Across 85 countries", icon: Target },
  { label: "Lives Protected", value: "12,400+", subtitle: "This year", icon: Shield },
  { label: "Growth", value: "+18.3%", subtitle: "vs. last year", icon: TrendingUp },
];

export default function MembersPage() {
  return (
    <Layout>
      {/* Hero — portfolio overview style */}
      <section className="section-padding bg-primary">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-primary-foreground/60 text-sm font-medium tracking-widest uppercase mb-4">
              Impact Dashboard
            </p>
            <h1 className="headline-hero text-primary-foreground mb-4">
              Your Impact Portfolio
            </h1>
            <p className="body-large text-primary-foreground/70 max-w-xl">
              Track how contributions create measurable change. Every dollar is an investment in human dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-0 -mt-8 relative z-10">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.label} className="card-elevated">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <ArrowUpRight className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Allocation */}
      <section className="section-padding">
        <div className="container-campaign">
          <Tabs defaultValue="portfolio" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="headline-section text-foreground">Fund Allocation</h2>
              <TabsList>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="portfolio" className="space-y-4">
              {impactPortfolio.map((fund) => (
                <Card key={fund.name} className="card-elevated overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
                      {/* Icon & Name */}
                      <div className="flex items-center gap-4 md:w-1/3">
                        <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
                          <fund.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground text-sm">{fund.name}</h3>
                          <p className="text-xs text-muted-foreground">{fund.description}</p>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{fund.raised} raised</span>
                          <span className="text-muted-foreground">{fund.target} goal</span>
                        </div>
                        <Progress value={fund.progress} className="h-2" />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 md:w-1/4 justify-end">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">{fund.allocation}%</p>
                          <p className="text-xs text-muted-foreground">Allocation</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-accent">{fund.change}</p>
                          <p className="text-xs text-muted-foreground">Growth</p>
                        </div>
                        <div className="text-right hidden lg:block">
                          <p className="text-xs text-muted-foreground">{fund.region}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="space-y-3">
              {recentActivity.map((item, i) => (
                <Card key={i} className="card-elevated">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      item.type === "milestone" ? "bg-accent" :
                      item.type === "deployment" ? "bg-primary" :
                      item.type === "partnership" ? "bg-accent" :
                      "bg-muted-foreground"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Become a Member CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="headline-section text-foreground mb-3">Become a Member</h2>
            <p className="text-muted-foreground mb-8">
              Get access to impact reports, fund allocation updates, and exclusive member briefings.
            </p>
            <EmailSubscription
              subscriptionType="newsletter"
              buttonText="Join"
              placeholder="Your email address"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
