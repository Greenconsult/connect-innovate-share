import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_SETTINGS } from "@/lib/settingsStore";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { data: settings } = useSettings();
  const s = settings ?? DEFAULT_SETTINGS;
  const visibleLinks = s.navLinks.filter((l) => l.visible);

  return (
    <>
      {/* Main nav */}
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-display font-bold text-xl text-primary">
              {s.brandName}
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {visibleLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm font-body transition-colors rounded ${
                    location.pathname === link.to
                      ? "text-primary font-semibold bg-muted"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background pb-4">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm font-body ${
                  location.pathname === link.to
                    ? "text-primary font-semibold bg-muted"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
