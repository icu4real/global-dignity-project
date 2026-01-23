import { Layout } from "@/components/layout/Layout";
import { Shield, Users, Globe, Award, Heart, Building } from "lucide-react";

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

const partners = [
  { name: "International Health Partners", type: "Healthcare" },
  { name: "Global Legal Aid Network", type: "Legal Services" },
  { name: "Safe Housing Coalition", type: "Shelter & Relocation" },
  { name: "Mental Health Without Borders", type: "Mental Health" },
  { name: "Economic Empowerment Alliance", type: "Employment" },
  { name: "Digital Safety Initiative", type: "Privacy & Security" },
];

const team = [
  {
    role: "Executive Director",
    description: "25+ years in international humanitarian work",
  },
  {
    role: "Director of Programs",
    description: "Former UNHCR protection officer",
  },
  {
    role: "Medical Director",
    description: "Public health specialist, infectious diseases",
  },
  {
    role: "Legal Director",
    description: "Human rights attorney, asylum law expert",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              About Us
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              Protecting dignity across borders
            </h1>
            <p className="body-large text-muted-foreground">
              Founded in 2015, Dignity Global is an international humanitarian 
              organization dedicated to protecting LGBTQ+ individuals facing 
              violence, persecution, and discrimination. We work in partnership 
              with local organizations across 85 countries to provide emergency 
              response, healthcare, legal aid, and pathways to safety.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card-elevated p-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To protect the lives, health, and dignity of LGBTQ+ individuals 
                facing persecution worldwide, through emergency response, healthcare 
                access, legal support, and sustainable pathways to safety and 
                self-sufficiency.
              </p>
            </div>
            <div className="card-elevated p-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every person—regardless of sexual orientation or 
                gender identity—can live freely, safely, and with full dignity, 
                without fear of violence or discrimination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="pillar-icon mx-auto mb-4">
                  <value.icon className="w-6 h-6" />
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
      <section className="section-padding">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground mb-4">Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our leadership team brings decades of experience in humanitarian 
              response, public health, human rights law, and international development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.role} className="card-elevated p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{member.role}</h3>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground mb-4">Our Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work alongside trusted organizations worldwide to deliver 
              comprehensive support to those who need it most.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-background p-6 rounded-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
