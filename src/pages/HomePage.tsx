import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Globe } from "lucide-react";
import prideLogo from "@/assets/pride-logo.jpeg";

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl mx-auto text-center">
            <img src={prideLogo} alt="Pride" className="h-16 w-auto mx-auto mb-8 rounded-md" />
            <h1 className="headline-hero text-foreground mb-6 text-balance">
              Dignity. Equality. Belonging.
            </h1>
            <p className="body-large text-muted-foreground mb-10">
              Building a world where every person lives freely, safely, and with full dignity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button className="btn-primary text-base px-8 py-4">
                  Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/stories">
                <Button variant="outline" className="text-base px-8 py-4">Community Stories</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container-campaign">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-semibold text-primary-foreground">85+</p>
              <p className="text-sm text-primary-foreground/70">Countries</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-semibold text-primary-foreground">2.4M</p>
              <p className="text-sm text-primary-foreground/70">Lives Impacted</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-semibold text-primary-foreground">92%</p>
              <p className="text-sm text-primary-foreground/70">To Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-4xl mx-auto">
            <h2 className="headline-section text-foreground text-center mb-12">How We Create Change</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Heart, title: "Protect", desc: "Legal defense, emergency relocation, and crisis response for those in danger." },
                { icon: Users, title: "Connect", desc: "Building communities of support, shared stories, and solidarity worldwide." },
                { icon: Globe, title: "Advocate", desc: "Policy reform, education, and institutional change across 85 countries." },
              ].map((item) => (
                <div key={item.title} className="card-elevated p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="headline-section text-foreground mb-4">Your Voice Matters</h2>
            <p className="text-muted-foreground mb-8">
              Join as a member to share your story, track impact, and contribute to lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button className="btn-primary text-base px-8 py-4">
                  Become a Member <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="outline" className="text-base px-8 py-4">Contribute</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
