import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6">About Pride</h1>
            <p className="body-large text-muted-foreground">
              Founded in 2010, Pride advances equality and protects the
              dignity of all individuals through education, advocacy, and legal support
              across 85 countries.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-elevated p-8">
              <h2 className="font-serif text-xl text-foreground mb-3">Mission</h2>
              <p className="text-muted-foreground">
                To advance equality and protect the dignity of all individuals
                through education, advocacy, and sustainable community support.
              </p>
            </div>
            <div className="card-elevated p-8">
              <h2 className="font-serif text-xl text-foreground mb-3">Vision</h2>
              <p className="text-muted-foreground">
                A world where every person lives freely, safely, and with
                full dignity and equal rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-campaign text-center max-w-xl mx-auto">
          <h2 className="headline-section text-foreground mb-4">Join the Movement</h2>
          <p className="text-muted-foreground mb-8">
            Whether through sharing your story, contributing, or volunteering — every action counts.
          </p>
          <Link to="/auth">
            <Button className="btn-primary text-base px-8 py-4">
              Get Involved <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
