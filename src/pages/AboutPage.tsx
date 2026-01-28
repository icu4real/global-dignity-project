import { Layout } from "@/components/layout/Layout";
import { Shield, Globe, Award, Heart } from "lucide-react";
import { LeadershipSection } from "@/components/about/LeadershipSection";
import { PartnersSection } from "@/components/about/PartnersSection";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every decision we make prioritizes the physical and emotional safety of the individuals we serve.",
  },
  {
    icon: Heart,
    title: "Human Dignity",
    description: "We believe in the inherent worth and dignity of every person, regardless of their identity.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our network spans 85 countries, adapting our approach to local contexts and needs.",
  },
  {
    icon: Award,
    title: "Evidence-Based",
    description: "We measure our impact rigorously and continuously improve our programs based on outcomes.",
  },
];

export default function AboutPage() {
  // To add leader photos, import them and pass them here:
  // import sarahChen from "@/assets/leaders/sarah-chen.jpg";
  // const leaderImages = { sarahChen, ... };
  
  // To add partner logos, import them and pass them here:
  // import ilgaWorld from "@/assets/partners/ilga-world.png";
  // const partnerLogos = { ilgaWorld, ... };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              About Us
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              Protecting dignity across borders
            </h1>
            <p className="body-large text-muted-foreground">
              Founded in 2010, Pride Campaign is an international humanitarian 
              organization dedicated to advancing equality and protecting the 
              dignity of all individuals. We work in partnership with local 
              organizations across 85 countries to provide education, advocacy, 
              legal support, and pathways to full social inclusion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card-elevated p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--pride-red))] via-[hsl(var(--pride-green))] to-[hsl(var(--pride-purple))] opacity-60" />
              <h2 className="font-serif text-2xl text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To advance equality and protect the dignity of all individuals 
                worldwide, through education, advocacy, legal protection, and 
                sustainable pathways to full social inclusion and community support.
              </p>
            </div>
            <div className="card-elevated p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--pride-purple))] via-[hsl(var(--pride-blue))] to-[hsl(var(--pride-green))] opacity-60" />
              <h2 className="font-serif text-2xl text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every person can live freely, safely, and with 
                full dignity, with equal rights and protection under the law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={value.title} className="text-center p-6 bg-card rounded-md border border-border relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-50"
                  style={{
                    background: `linear-gradient(90deg, hsl(${index * 70} 55% 50%), hsl(${(index + 1) * 70} 55% 50%))`
                  }}
                />
                <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <LeadershipSection />

      {/* Partners */}
      <PartnersSection />

      {/* Transparency */}
      <section className="section-padding">
        <div className="container-campaign text-center max-w-3xl mx-auto">
          <h2 className="headline-section text-foreground mb-6">
            Transparency & Accountability
          </h2>
          <p className="body-large text-muted-foreground mb-8">
            We are committed to the highest standards of transparency and 
            accountability. As a registered 501(c)(3) nonprofit, we publish 
            annual reports, undergo independent audits, and maintain clear 
            financial disclosures.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="card-elevated px-6 py-4">
              <p className="text-2xl font-semibold text-primary font-sans">92%</p>
              <p className="text-sm text-muted-foreground">Program spending</p>
            </div>
            <div className="card-elevated px-6 py-4">
              <p className="text-2xl font-semibold text-primary font-sans">A+</p>
              <p className="text-sm text-muted-foreground">Charity rating</p>
            </div>
            <div className="card-elevated px-6 py-4">
              <p className="text-2xl font-semibold text-primary font-sans">10</p>
              <p className="text-sm text-muted-foreground">Years of impact</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
