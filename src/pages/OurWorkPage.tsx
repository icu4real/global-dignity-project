import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Home, Briefcase } from "lucide-react";

const pillars = [
  { icon: Shield, title: "Safety & Protection", stat: "8,400+", label: "Emergency interventions" },
  { icon: Heart, title: "Health & Wellbeing", stat: "12,000+", label: "Healthcare access" },
  { icon: Home, title: "Dignity in Daily Life", stat: "6,200+", label: "Housing placements" },
  { icon: Briefcase, title: "Economic Inclusion", stat: "4,800+", label: "Employment placements" },
];

export default function OurWorkPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6">Our Work</h1>
            <p className="body-large text-muted-foreground">
              Integrated support across safety, health, dignity, and economic inclusion in 85 countries.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pillars.map((p) => (
              <div key={p.title} className="card-elevated p-8">
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-serif text-xl text-foreground mb-2">{p.title}</h2>
                <p className="text-2xl font-semibold text-primary mb-1" style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>{p.stat}</p>
                <p className="text-sm text-muted-foreground">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
