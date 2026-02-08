import { Layout } from "@/components/layout/Layout";
import { Users, Globe, Heart, Shield } from "lucide-react";

const metrics = [
  { icon: Users, number: "47,000+", label: "People Protected" },
  { icon: Globe, number: "85", label: "Countries" },
  { icon: Heart, number: "12,000+", label: "Healthcare Access" },
  { icon: Shield, number: "8,400+", label: "Emergency Interventions" },
];

const financial = [
  { label: "Programs", value: "92%" },
  { label: "Admin", value: "5%" },
  { label: "Fundraising", value: "3%" },
];

export default function ImpactPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6">Impact</h1>
            <p className="body-large text-muted-foreground">
              Measurable change, transparent reporting, real lives.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center mx-auto mb-3">
                  <m.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-semibold text-primary" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>{m.number}</p>
                <p className="text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-campaign text-center max-w-2xl mx-auto">
          <h2 className="headline-section mb-8">Fund Allocation</h2>
          <div className="grid grid-cols-3 gap-6">
            {financial.map((f) => (
              <div key={f.label}>
                <p className="text-3xl font-semibold" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>{f.value}</p>
                <p className="text-sm text-primary-foreground/70">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
