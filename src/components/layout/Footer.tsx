import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { EmailSubscription } from "@/components/EmailSubscription";

const footerLinks = {
  organization: [
    { name: "About Us", href: "/about" },
    { name: "Our Work", href: "/our-work" },
    { name: "Impact & Transparency", href: "/impact" },
  ],
  support: [
    { name: "Contribute", href: "/donate" },
    { name: "Resources", href: "/get-help" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Transparency", href: "/transparency" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Subtle pride gradient line */}
      <div className="h-[3px] bg-gradient-to-r from-[hsl(0,65%,55%)] via-[hsl(145,55%,42%)] to-[hsl(280,55%,50%)] opacity-40" />
      
      <div className="container-campaign section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-sm bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-semibold text-lg">P</span>
              </div>
              <span className="font-serif text-xl tracking-tight">Pride Campaign</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Advancing equality, dignity, and human rights through education, 
              advocacy, and community support worldwide.
            </p>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Organization</h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Legal</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="mailto:contact@pridecampaign.org"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              contact@pridecampaign.org
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="max-w-md mx-auto text-center mb-6">
            <h4 className="font-serif text-lg mb-2">Stay Informed</h4>
            <p className="text-sm text-primary-foreground/60">
              Receive quarterly updates on our global initiatives
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <EmailSubscription
              subscriptionType="newsletter"
              buttonText="Subscribe"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {new Date().getFullYear()} Pride Campaign. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/50">
              Registered 501(c)(3) nonprofit organization
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
