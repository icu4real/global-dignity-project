import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="headline-hero text-foreground mb-6 text-balance">Dignity. Equality. Progress.</h1>
            <p className="body-large text-muted-foreground mb-10">
              Advancing human rights through education, advocacy, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button className="btn-primary text-base px-8 py-4">
                  Contribute <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="text-base px-8 py-4">About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container-campaign">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
            <div>
              <p className="text-3xl md:text-4xl font-semibold text-primary-foreground">15</p>
              <p className="text-sm text-primary-foreground/70">Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Member */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="headline-section text-foreground mb-4">Become a Member</h2>
            <p className="text-muted-foreground mb-8">
              Create an account to track your impact, view fund allocations, and access exclusive member reports.
            </p>
            <Link to="/auth">
              <Button className="btn-primary text-base px-8 py-4">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
