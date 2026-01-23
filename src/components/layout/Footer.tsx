import { Link } from "react-router-dom";
import { Heart, Mail, Shield, Globe } from "lucide-react";

const footerLinks = {
  organization: [
    { name: "About Us", href: "/about" },
    { name: "Our Work", href: "/our-work" },
    { name: "Impact Report", href: "/impact" },
    { name: "Stories", href: "/stories" },
  ],
  support: [
    { name: "Donate", href: "/donate" },
    { name: "Get Help", href: "/get-help" },
    { name: "Partner With Us", href: "/about#partners" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Transparency", href: "/transparency" },
  ],
};

const certifications = [
  { name: "Verified Nonprofit", icon: Shield },
  { name: "Global Reach", icon: Globe },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-campaign section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl">Dignity Global</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Protecting lives, restoring dignity, and building hope for LGBTQ+ 
              individuals facing violence and persecution worldwide.
            </p>
            <div className="flex items-center gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2 text-xs text-primary-foreground/70"
                >
                  <cert.icon className="w-4 h-4" />
                  <span>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h4 className="font-medium mb-4">Organization</h4>
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
            <h4 className="font-medium mb-4">Support</h4>
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
            <h4 className="font-medium mb-4">Legal</h4>
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
              href="mailto:contact@dignityglobal.org"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              contact@dignityglobal.org
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Dignity Global. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Registered 501(c)(3) nonprofit organization
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
