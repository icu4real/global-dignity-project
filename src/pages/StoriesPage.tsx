import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stories = [
  {
    id: 1,
    name: "Maria",
    age: 28,
    region: "Latin America",
    category: "Safety & Protection",
    summary: "From persecution to protection: rebuilding after fleeing violence",
    quote: "I never thought I'd feel safe again. Today, I have a job, a home, and hope for my future.",
    story: "Maria faced severe violence and threats in her home country simply for being who she is. After a targeted attack, she knew she had to flee. With nowhere to turn, she connected with our emergency response team, who provided immediate shelter and legal support. Within months, she was safely relocated to a country where she could rebuild her life. Today, Maria works as a community advocate, helping others who face similar situations.",
    journey: ["Crisis", "Emergency response", "Legal aid", "Relocation", "Community integration"],
    anonymous: false,
  },
  {
    id: 2,
    name: "K.",
    age: 24,
    region: "East Africa",
    category: "Health & Wellbeing",
    summary: "Finding healthcare without fear after years of avoidance",
    quote: "For years, I avoided doctors. Here, I found providers who treated me with respect.",
    story: "For years, K. avoided seeking medical care due to past experiences of discrimination and mistreatment. When they finally connected with our healthcare navigation program, they found a network of affirming providers. They received the care they needed, including mental health support and HIV prevention services. Today, K. is healthy, employed, and advocates for inclusive healthcare access in their community.",
    journey: ["Healthcare avoidance", "Program connection", "Affirming care", "Mental health support", "Advocacy"],
    anonymous: true,
  },
  {
    id: 3,
    name: "James",
    age: 32,
    region: "Southeast Asia",
    category: "Economic Inclusion",
    summary: "From unemployment to entrepreneurship through skills training",
    quote: "The training changed everything. I went from surviving to thriving.",
    story: "James struggled to find stable employment due to discrimination. After joining our economic empowerment program, he completed vocational training in digital marketing and received a small business grant. He now runs a successful freelance business and employs two other program graduates. His story demonstrates the ripple effect of economic inclusion—when one person succeeds, they lift others.",
    journey: ["Unemployment", "Skills training", "Business grant", "Launch", "Employing others"],
    anonymous: false,
  },
  {
    id: 4,
    name: "S.",
    age: 26,
    region: "Middle East",
    category: "Safety & Protection",
    summary: "Emergency relocation after imminent threat",
    quote: "In 72 hours, they got me to safety. They saved my life.",
    story: "When S. faced an imminent threat to their life, our emergency response team coordinated a rapid relocation within 72 hours. They received temporary shelter, legal documentation support, and trauma counseling. After six months, S. was granted asylum in a safe country. They're now completing their education and planning to work in human rights law.",
    journey: ["Imminent threat", "72-hour response", "Temporary shelter", "Asylum process", "Education"],
    anonymous: true,
  },
  {
    id: 5,
    name: "Priya",
    age: 30,
    region: "South Asia",
    category: "Dignity in Daily Life",
    summary: "Securing safe housing and community acceptance",
    quote: "For the first time in years, I can sleep without fear.",
    story: "Priya was evicted from multiple housing situations due to discrimination. Our housing program connected her with safe, affirming housing and provided rental subsidies while she stabilized. Through our community integration program, she found support networks and now volunteers to help others navigate housing challenges. She has lived in stable housing for over two years.",
    journey: ["Housing instability", "Program support", "Safe housing", "Community building", "Volunteer work"],
    anonymous: false,
  },
];

const categories = ["All", "Safety & Protection", "Health & Wellbeing", "Dignity in Daily Life", "Economic Inclusion"];

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStories = selectedCategory === "All"
    ? stories
    : stories.filter((story) => story.category === selectedCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              Stories
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              From survival to dignity to hope
            </h1>
            <p className="body-large text-muted-foreground">
              Behind every statistic is a human story. These are the journeys 
              of real people whose lives have been transformed through safety, 
              healthcare, and the restoration of their fundamental dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container-campaign">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStories.map((story) => (
              <article key={story.id} className="card-elevated overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      {story.category}
                    </span>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {story.region}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {story.name}, {story.age}
                  </h3>
                  <p className="text-muted-foreground mb-4">{story.summary}</p>
                  <blockquote className="border-l-4 border-accent pl-4 mb-4">
                    <p className="text-foreground italic">"{story.quote}"</p>
                  </blockquote>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {story.story}
                  </p>
                  
                  {/* Journey Timeline */}
                  <div className="mt-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      Journey
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {story.journey.map((step, index) => (
                        <div key={step} className="flex items-center">
                          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                            {step}
                          </span>
                          {index < story.journey.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-muted-foreground mx-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="py-12 bg-cream">
        <div className="container-campaign text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong>Privacy Note:</strong> Some stories use initials or 
            pseudonyms to protect the safety and privacy of individuals, 
            particularly those in sensitive regions. All stories are shared 
            with full consent.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-campaign text-center max-w-2xl mx-auto">
          <h2 className="headline-section text-foreground mb-6">
            Help write more stories of hope
          </h2>
          <p className="body-large text-muted-foreground mb-8">
            Your support makes these transformations possible. Every 
            contribution helps protect lives and restore dignity.
          </p>
          <Link to="/donate">
            <Button className="btn-accent">
              Support Protection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
