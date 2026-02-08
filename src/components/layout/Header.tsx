import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Our Work", href: "/our-work" },
  { name: "Impact", href: "/impact" },
  { name: "Members", href: "/members" },
  { name: "Resources", href: "/get-help" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Subtle pride gradient line */}
      <div className="h-[3px] bg-gradient-to-r from-[hsl(0,65%,55%)] via-[hsl(145,55%,42%)] to-[hsl(280,55%,50%)] opacity-60" />
      
      <nav className="container-campaign" aria-label="Global">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-semibold text-lg">P</span>
            </div>
            <span className="font-serif text-xl tracking-tight text-foreground">
              Pride Campaign
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/donate">
              <Button className="btn-primary">
                Contribute
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="btn-primary w-full mt-4">
                  Contribute
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
