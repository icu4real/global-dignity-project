import { Link } from "react-router-dom";
import { Shield, Heart, Home, Briefcase, ArrowRight, Users, Globe, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-portrait.jpg";
const pillars = [{
  icon: Shield,
  title: "Safety & Protection",
  description: "Emergency response, legal aid, safe shelters, and relocation support for those facing immediate danger.",
  link: "/our-work#safety"
}, {
  icon: Heart,
  title: "Health & Wellbeing",
  description: "Mental health services, trauma care, HIV prevention, and accessible healthcare for all.",
  link: "/our-work#health"
}, {
  icon: Home,
  title: "Dignity in Daily Life",
  description: "Workplace safety, secure housing, education access, and privacy protection.",
  link: "/our-work#dignity"
}, {
  icon: Briefcase,
  title: "Economic Inclusion",
  description: "Job placement, skills training, and entrepreneurship support for sustainable futures.",
  link: "/our-work#economic"
}];
const impactStats = [{
  number: "47,000+",
  label: "People Protected",
  icon: Users
}, {
  number: "85",
  label: "Countries Reached",
  icon: Globe
}, {
  number: "12,000+",
  label: "Healthcare Access",
  icon: Activity
}];
export default function HomePage() {
  return <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="A person looking forward with hope and dignity" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        {/* Content */}
        <div className="container-campaign relative z-10">
          <div className="max-w-2xl">
            <h1 className="headline-hero text-foreground mb-6 animate-slide-up">
              No one should fear violence for being themselves.
            </h1>
            <p className="body-large text-muted-foreground mb-8 animate-slide-up" style={{
            animationDelay: "0.1s"
          }}>Every day, LGBTQ+ individuals face persecution, violence, and discrimination simply for who they are. We provide protection, healthcare, and dignity to those who need it most across 85 countries worldwide.</p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{
            animationDelay: "0.2s"
          }}>
              <Link to="/donate">
                <Button className="btn-accent w-full sm:w-auto text-base">
                  Support Protection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/get-help">
                <Button className="btn-secondary w-full sm:w-auto text-base">
                  Get Help
                </Button>
              </Link>
              <Link to="/impact">
                <Button variant="ghost" className="w-full sm:w-auto text-base text-foreground hover:text-primary">
                  See Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign text-center max-w-4xl mx-auto">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Our Mission
          </p>
          <h2 className="headline-section text-foreground mb-6">
            Protecting lives. Restoring dignity. Building hope.
          </h2>
          <p className="body-large text-muted-foreground">
            We work alongside local partners, healthcare providers, and legal advocates 
            in 85 countries to ensure that every person—regardless of their sexual 
            orientation or gender identity—can live safely, access healthcare, and 
            thrive with dignity.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              How We Help
            </p>
            <h2 className="headline-section text-foreground">
              Four pillars of support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => <Link key={pillar.title} to={pillar.link} className="card-elevated p-6 group hover:shadow-elevated transition-all duration-300 animate-slide-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="pillar-icon mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              Our Impact
            </p>
            <h2 className="headline-section">
              Measurable change, real lives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map(stat => <div key={stat.label} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-4xl md:text-5xl font-semibold font-sans mb-2">
                  {stat.number}
                </p>
                <p className="text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/impact">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                View Full Impact Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stories Preview */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Real Stories
              </p>
              <h2 className="headline-section text-foreground mb-6">
                From survival to dignity to hope
              </h2>
              <p className="body-large text-muted-foreground mb-6">
                Behind every statistic is a human story. Meet the individuals whose 
                lives have been transformed through safety, healthcare, and the 
                restoration of their fundamental dignity.
              </p>
              <blockquote className="border-l-4 border-accent pl-6 mb-8">
                <p className="text-lg text-foreground italic mb-4">
                  "I never thought I'd feel safe again. Today, I have a job, a home, 
                  and hope for my future. This organization gave me my life back."
                </p>
                <footer className="text-sm text-muted-foreground">
                  — M., 28, resettled with support
                </footer>
              </blockquote>
              <Link to="/stories">
                <Button className="btn-primary">
                  Read More Stories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elevated">
                <img src={heroImage} alt="A person looking forward with hope" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-elevated max-w-xs">
                <p className="text-sm text-muted-foreground mb-1">Since 2015</p>
                <p className="font-serif text-xl text-foreground">
                  Over 47,000 lives protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-cream">
        <div className="container-campaign text-center max-w-3xl mx-auto">
          <h2 className="headline-section text-foreground mb-6">
            Together, we can protect more lives
          </h2>
          <p className="body-large text-muted-foreground mb-8">
            Your support directly funds emergency response, healthcare access, 
            and dignity restoration for LGBTQ+ individuals worldwide. Every 
            contribution makes a measurable difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button className="btn-accent text-base">
                Become a Dignity Ally
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/get-help">
              <Button className="btn-secondary text-base">
                Access Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>;
}