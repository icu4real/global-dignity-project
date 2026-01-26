import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, Globe, Shield, Lock, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
const crisisResources = [
  {
    name: "24/7 Emergency Hotline",
    contact: "+1-800-XXX-XXXX",
    description: "Immediate crisis support, available in 12 languages",
    type: "phone",
    urgent: true,
  },
  {
    name: "Encrypted Chat Support",
    contact: "Signal: @DignityGlobalHelp",
    description: "Secure messaging for sensitive situations",
    type: "chat",
    urgent: true,
  },
  {
    name: "Email Support",
    contact: "help@dignityglobal.org",
    description: "Non-urgent inquiries and resource requests",
    type: "email",
    urgent: false,
  },
];

const resourceCategories = [
  {
    title: "Emergency Safety",
    icon: Shield,
    resources: [
      { name: "Emergency relocation support", link: "#" },
      { name: "Safe house network information", link: "#" },
      { name: "Legal emergency assistance", link: "#" },
      { name: "Digital security guide", link: "#" },
    ],
  },
  {
    title: "Healthcare Access",
    icon: Mail,
    resources: [
      { name: "Find affirming providers", link: "#" },
      { name: "Mental health resources", link: "#" },
      { name: "HIV prevention & care", link: "#" },
      { name: "Healthcare navigation guide", link: "#" },
    ],
  },
  {
    title: "Legal Support",
    icon: Globe,
    resources: [
      { name: "Know your rights", link: "#" },
      { name: "Asylum information", link: "#" },
      { name: "Legal aid directory", link: "#" },
      { name: "Documentation support", link: "#" },
    ],
  },
  {
    title: "Community & Support",
    icon: Phone,
    resources: [
      { name: "Support groups", link: "#" },
      { name: "Community organizations", link: "#" },
      { name: "Peer support networks", link: "#" },
      { name: "Safe spaces directory", link: "#" },
    ],
  },
];

const safetyTips = [
  {
    title: "Private Browsing",
    description: "Use incognito/private browsing mode when accessing this site. Clear your history afterward.",
  },
  {
    title: "Secure Communications",
    description: "Use encrypted messaging apps like Signal for sensitive conversations.",
  },
  {
    title: "Device Security",
    description: "Use a password or biometric lock on your devices. Consider using a secondary device if needed.",
  },
  {
    title: "Trusted Networks",
    description: "Avoid using shared or public WiFi for sensitive communications. Use a VPN when possible.",
  },
];

export default function GetHelpPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pride-gradient-subtle">
        <div className="container-campaign">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Resources
            </p>
            <h1 className="headline-hero text-foreground mb-6">
              You are not alone
            </h1>
            <p className="body-large text-muted-foreground">
              Whether you're seeking resources, information, or support, 
              we're here to help. All communications are confidential and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(0,65%,55%)] via-[hsl(145,55%,42%)] to-[hsl(280,55%,50%)] opacity-30" />
        <div className="container-campaign">
          <div className="flex items-center gap-4">
            <Lock className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm">
              <strong>Your privacy matters.</strong> This site does not track your 
              activity. For additional safety, use private browsing and consider 
              the safety tips below.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Contacts */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground mb-4">
              Crisis support
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you're in immediate danger, contact these resources
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crisisResources.map((resource) => (
              <div
                key={resource.name}
                className={`p-6 rounded-lg ${
                  resource.urgent
                    ? "bg-primary text-primary-foreground"
                    : "card-elevated"
                }`}
              >
                {resource.urgent && (
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      24/7 Available
                    </span>
                  </div>
                )}
                <h3 className="font-serif text-xl mb-2">{resource.name}</h3>
                <p className="font-mono text-lg mb-2">{resource.contact}</p>
                <p className={`text-sm ${resource.urgent ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding bg-secondary">
        <div className="container-campaign">
          <div className="text-center mb-12">
            <h2 className="headline-section text-foreground mb-4">
              Resources by category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find information and support across key areas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <div key={category.title} className="bg-background p-6 rounded-lg border border-border relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-40"
                  style={{
                    background: `linear-gradient(90deg, hsl(${index * 70} 55% 50%), hsl(${(index + 1) * 70} 55% 50%))`
                  }}
                />
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center mb-4">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.resources.map((resource) => (
                    <li key={resource.name}>
                      <a
                        href={resource.link}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" />
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="headline-section text-foreground">
                Staying safe online
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safetyTips.map((tip) => (
                <div key={tip.title} className="card-elevated p-6">
                  <h3 className="font-medium text-foreground mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Exit */}
      <section className="py-6 bg-secondary">
        <div className="container-campaign text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need to leave this site quickly?
          </p>
          <Button
            onClick={() => window.location.href = "https://www.google.com"}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Quick Exit
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Tip: Press ESC twice for quick exit, or use Ctrl+W (Cmd+W on Mac) to close this tab
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container-campaign">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="headline-section text-foreground mb-4">
                Send us a message
              </h2>
              <p className="text-muted-foreground">
                If you're not in immediate crisis but need support, fill out the form 
                below. We respond within 24-48 hours. All communications are confidential.
              </p>
            </div>
            <div className="card-elevated p-8">
              <ContactForm defaultType="help_request" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
