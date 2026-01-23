import { Layout } from "@/components/layout/Layout";
import { Shield, Heart, Home, Briefcase, Check } from "lucide-react";

const pillars = [
  {
    id: "safety",
    icon: Shield,
    title: "Safety & Protection",
    color: "safety-teal",
    description: "Emergency response, legal aid, safe shelters, and relocation support for those facing immediate danger.",
    details: [
      "24/7 emergency hotline and rapid response",
      "Legal representation and asylum support",
      "Safe house network across 45 countries",
      "Emergency relocation coordination",
      "Security training and digital safety",
    ],
    story: {
      quote: "When I fled, I had nothing. They provided shelter, legal help, and a path to safety. I'm now rebuilding my life in a country where I can be myself.",
      attribution: "— A., 32, relocated from East Africa",
    },
    stat: { number: "8,400+", label: "Emergency interventions in 2024" },
  },
  {
    id: "health",
    icon: Heart,
    title: "Health & Wellbeing",
    color: "dignity-coral",
    description: "Mental health services, trauma care, HIV prevention, and accessible healthcare for all.",
    details: [
      "Trauma-informed mental health counseling",
      "HIV prevention, testing, and treatment",
      "Gender-affirming healthcare access",
      "Substance abuse support programs",
      "Healthcare navigation and advocacy",
    ],
    story: {
      quote: "For years, I avoided doctors out of fear. Here, I found healthcare providers who treated me with respect and gave me the care I needed.",
      attribution: "— R., 26, healthcare program participant",
    },
    stat: { number: "12,000+", label: "People received healthcare access" },
  },
  {
    id: "dignity",
    icon: Home,
    title: "Dignity in Daily Life",
    color: "hope-gold",
    description: "Workplace safety, secure housing, education access, and privacy protection.",
    details: [
      "Safe housing placement and subsidies",
      "Education access and scholarships",
      "Workplace anti-discrimination support",
      "Privacy and identity protection",
      "Community integration programs",
    ],
    story: {
      quote: "They helped me find housing where I could finally feel safe. For the first time in years, I can sleep without fear.",
      attribution: "— J., 24, housing program participant",
    },
    stat: { number: "6,200+", label: "Stable housing placements" },
  },
  {
    id: "economic",
    icon: Briefcase,
    title: "Economic Inclusion",
    color: "primary",
    description: "Job placement, skills training, and entrepreneurship support for sustainable futures.",
    details: [
      "Vocational training and certification",
      "Job placement with inclusive employers",
      "Small business grants and mentorship",
      "Financial literacy education",
      "Remote work opportunities",
    ],
    story: {
      quote: "The skills training and job placement changed everything. I went from surviving to thriving, with a career I'm proud of.",
      attribution: "— T., 29, economic program graduate",
    },
    stat: { number: "4,800+", label: "Sustainable employment placements" },
  },
];

export default function OurWorkPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              Our Work
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              Four pillars of comprehensive support
            </h1>
            <p className="body-large text-muted-foreground">
              Our integrated approach addresses the full spectrum of needs 
              facing LGBTQ+ individuals in crisis—from immediate safety to 
              long-term stability and self-sufficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      {pillars.map((pillar, index) => (
        <section
          key={pillar.id}
          id={pillar.id}
          className={`section-padding ${index % 2 === 1 ? "bg-cream" : ""}`}
        >
          <div className="container-campaign">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="pillar-icon mb-6">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h2 className="headline-section text-foreground mb-4">
                  {pillar.title}
                </h2>
                <p className="body-large text-muted-foreground mb-8">
                  {pillar.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pillar.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="card-elevated p-6">
                  <p className="stat-number mb-1">{pillar.stat.number}</p>
                  <p className="text-muted-foreground">{pillar.stat.label}</p>
                </div>
              </div>

              {/* Story Card */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-primary text-primary-foreground p-8 rounded-lg">
                  <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
                    Real Impact
                  </p>
                  <blockquote className="text-xl leading-relaxed mb-6 italic">
                    "{pillar.story.quote}"
                  </blockquote>
                  <footer className="text-primary-foreground/80">
                    {pillar.story.attribution}
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Approach */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-campaign text-center max-w-3xl mx-auto">
          <h2 className="headline-section mb-6">Our Approach</h2>
          <p className="body-large text-primary-foreground/80 mb-8">
            We believe in meeting people where they are—adapting our programs 
            to local contexts, working alongside community-based organizations, 
            and centering the voices and agency of those we serve. Our work is 
            evidence-based, trauma-informed, and designed for measurable impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-semibold font-sans mb-2">85</p>
              <p className="text-primary-foreground/70">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-semibold font-sans mb-2">200+</p>
              <p className="text-primary-foreground/70">Local Partners</p>
            </div>
            <div>
              <p className="text-3xl font-semibold font-sans mb-2">47,000+</p>
              <p className="text-primary-foreground/70">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
