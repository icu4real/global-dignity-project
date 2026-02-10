import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  BookOpen,
  Megaphone
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: DollarSign, label: "Donations", href: "/admin/donations" },
  { icon: Users, label: "Donors", href: "/admin/donors" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-md shadow-sm"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PC</span>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Pride Campaign</h2>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== "/admin" && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email}
              </p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
