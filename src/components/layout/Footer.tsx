import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container-campaign">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-primary-foreground/10 flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-semibold">P</span>
            </div>
            <span className="font-serif text-lg">Pride Campaign</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
            <Link to="/about" className="hover:text-primary-foreground">About</Link>
            <Link to="/donate" className="hover:text-primary-foreground">Contribute</Link>
            <Link to="/privacy" className="hover:text-primary-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-primary-foreground">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Pride Campaign · 501(c)(3)
          </p>
        </div>
      </div>
    </footer>
  );
}
