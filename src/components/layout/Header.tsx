import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import prideLogo from "@/assets/pride-logo.jpeg";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Our Work", href: "/our-work" },
  { name: "Stories", href: "/stories" },
  { name: "Impact", href: "/impact" },
  { name: "Resources", href: "/get-help" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="h-[3px] bg-gradient-to-r from-[hsl(350,60%,70%)] via-[hsl(145,50%,60%)] to-[hsl(230,60%,65%)] opacity-70" />

      <nav className="container-campaign" aria-label="Global">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={prideLogo} alt="Pride" className="h-8 w-auto rounded-sm" />
            <span className="font-serif text-xl tracking-tight text-foreground">
              Pride
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to={user ? "/members" : "/auth"}>
              <Button variant="outline" size="sm">
                {user ? "Dashboard" : "Sign In"}
              </Button>
            </Link>
            <Link to="/donate">
              <Button className="btn-primary" size="sm">
                Contribute
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to={user ? "/members" : "/auth"} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  {user ? "Dashboard" : "Sign In"}
                </Button>
              </Link>
              <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="btn-primary w-full">Contribute</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
