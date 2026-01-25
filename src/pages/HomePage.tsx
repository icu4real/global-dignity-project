import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Heart, BookOpen, Users } from "lucide-react";

const pillars = [
  { icon: Scale, title: "Legal Protection", description: "Advocating for equal rights and protections under the law." },
  { icon: Heart, title: "Health & Safety", description: "Ensuring access to healthcare and safe community spaces." },
  { icon: BookOpen, title: "Education & Advocacy", description: "Promoting understanding through research and public education." },
  { icon: Users, title: "Community Support", description: "Building strong, resilient communities worldwide." },
];

const stats = [
  { number: "85+", label: "Countries Reached" },
  { number: "2.4M", label: "Lives Impacted" },
  { number: "92%", label: "Direct to Programs" },
  { number: "15", label: "Years of Operation" },
];

export default function HomePage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">Advancing Global Equality</p>
            <h1 className="headline-hero text-foreground mb-8 text-balance">Dignity. Equality. Progress.</h1>
            <p className="body-large text-muted-foreground mb-10 max-w-2xl mx-auto">
              We advance human rights and equality through education, advocacy, legal protection, and community support—building a world where everyone can live with dignity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate"><Button className="btn-primary text-base px-8 py-4">Support Our Mission<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/about"><Button variant="outline" className="text-base px-8 py-4">Learn More</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-semibold text-primary-foreground mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{stat.number}</p>
                <p className="text-sm text-primary-foreground/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="headline-section text-foreground mb-6">Our Approach</h2>
            <p className="body-large text-muted-foreground">A comprehensive framework addressing the interconnected challenges facing communities worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="p-8 bg-card rounded-md border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center mb-6"><pillar.icon className="w-6 h-6 text-primary" /></div>
                <h3 className="font-serif text-xl text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
              "Every person deserves to live freely, with dignity and equal protection under the law. This is not a privilege—it is a fundamental human right."
            </blockquote>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Pride Campaign Mission Statement</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="headline-section text-foreground mb-6">Support Progress</h2>
            <p className="body-large text-muted-foreground mb-8">Your contribution directly funds programs that advance equality, protect rights, and build stronger communities.</p>
            <Link to="/donate"><Button className="btn-primary text-base px-8 py-4">Make a Contribution<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
