import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Home, Briefcase, Globe, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const keyMetrics = [
  { icon: Users, number: "47,000+", label: "People Protected", growth: "+18% from 2023" },
  { icon: Globe, number: "85", label: "Countries Reached", growth: "+12 new countries" },
  { icon: Heart, number: "12,000+", label: "Healthcare Access", growth: "+22% from 2023" },
  { icon: Shield, number: "8,400+", label: "Emergency Interventions", growth: "+15% from 2023" },
];

const programMetrics = [
  {
    icon: Shield,
    title: "Safety & Protection",
    metrics: [
      { label: "Emergency responses", value: "8,400+" },
      { label: "Legal cases supported", value: "3,200" },
      { label: "Safe relocations", value: "1,850" },
      { label: "Average response time", value: "< 48 hrs" },
    ],
  },
  {
    icon: Heart,
    title: "Health & Wellbeing",
    metrics: [
      { label: "Healthcare access", value: "12,000+" },
      { label: "Mental health sessions", value: "28,000" },
      { label: "HIV prevention served", value: "6,500" },
      { label: "Provider partnerships", value: "340" },
    ],
  },
  {
    icon: Home,
    title: "Dignity in Daily Life",
    metrics: [
      { label: "Stable housing placements", value: "6,200" },
      { label: "Education scholarships", value: "890" },
      { label: "Workplace safety support", value: "2,100" },
      { label: "Privacy cases resolved", value: "450" },
    ],
  },
  {
    icon: Briefcase,
    title: "Economic Inclusion",
    metrics: [
      { label: "Employment placements", value: "4,800" },
      { label: "Skills training graduates", value: "3,200" },
      { label: "Business grants awarded", value: "680" },
      { label: "Average income increase", value: "3.2x" },
    ],
  },
];

const financialMetrics = [
  { label: "Program spending", value: "92%", description: "of funds go directly to programs" },
  { label: "Admin costs", value: "5%", description: "efficient operations" },
  { label: "Fundraising", value: "3%", description: "sustainable growth" },
];

const regionalData = [
  { region: "Sub-Saharan Africa", people: "14,200", countries: 28 },
  { region: "Latin America & Caribbean", people: "9,800", countries: 18 },
  { region: "Asia & Pacific", people: "8,400", countries: 15 },
  { region: "Middle East & North Africa", people: "6,100", countries: 12 },
  { region: "Eastern Europe & Central Asia", people: "5,200", countries: 8 },
  { region: "Western Europe & North America", people: "3,300", countries: 4 },
];

export default function ImpactPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Our Impact
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              Measurable change, real lives
            </h1>
            <p className="body-large text-muted-foreground">
              We believe in rigorous measurement and transparent reporting. 
              These numbers represent real progress toward equality and 
              dignity for communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={metric.label} className="card-elevated p-6 text-center relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-50"
                  style={{
                    background: `linear-gradient(90deg, hsl(${index * 60} 55% 50%), hsl(${(index + 1) * 60} 55% 50%))`
                  }}
                />
                <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="stat-number mb-1">{metric.number}</p>
                <p className="font-medium text-foreground mb-2">{metric.label}</p>
                <p className="text-sm text-primary/80 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {metric.growth}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Metrics */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground mb-4">
              Impact by program area
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detailed metrics across our four pillars of support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programMetrics.map((program, index) => (
              <div key={program.title} className="bg-background p-6 rounded-lg border border-border relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-40"
                  style={{
                    background: `linear-gradient(90deg, hsl(${index * 70} 55% 50%), hsl(${(index + 2) * 70} 55% 50%))`
                  }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                    <program.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground">
                    {program.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {program.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-2xl font-semibold text-primary font-sans">
                        {metric.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Breakdown */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground mb-4">
              Global reach
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our programs span 85 countries across six continents
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalData.map((region) => (
              <div key={region.region} className="card-elevated p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-accent" />
                  <h3 className="font-medium text-foreground">{region.region}</h3>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-primary font-sans">
                      {region.people}
                    </p>
                    <p className="text-sm text-muted-foreground">People served</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-primary font-sans">
                      {region.countries}
                    </p>
                    <p className="text-sm text-muted-foreground">Countries</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Financial Transparency
              </span>
            </div>
            <h2 className="headline-section mb-4">
              Your dollars at work
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              We maintain the highest standards of financial accountability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialMetrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-primary-foreground/10 p-6 rounded-lg text-center"
              >
                <p className="text-4xl font-semibold font-sans mb-2">
                  {metric.value}
                </p>
                <p className="font-medium mb-1">{metric.label}</p>
                <p className="text-sm text-primary-foreground/70">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-primary-foreground/80 text-sm">
              Full audited financials available in our annual report
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-campaign text-center max-w-2xl mx-auto">
          <h2 className="headline-section text-foreground mb-6">
            Help us reach more lives
          </h2>
          <p className="body-large text-muted-foreground mb-8">
            Every contribution directly supports protection, healthcare, 
            and dignity for LGBTQ+ individuals facing persecution.
          </p>
          <Link to="/donate">
            <Button className="btn-accent">
              Support Protection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
