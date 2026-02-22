import { Link } from "react-router-dom";
import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_SETTINGS } from "@/lib/settingsStore";

const FooterSection = () => {
  const { data: settings } = useSettings();
  const s = settings ?? DEFAULT_SETTINGS;
  const visibleLinks = s.navLinks.filter((l) => l.visible && l.to !== "/");

  return (
    <footer className="bg-academic-gradient text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-lg mb-3">{s.footerTitle}</h3>
            <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
              {s.footerTagline}
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-3 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body">
              {visibleLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-3 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
              {s.footerContactLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
              <li className="mt-2">
                <a href={`mailto:${s.footerEmail}`} className="hover:text-primary-foreground transition-colors">
                  {s.footerEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs text-primary-foreground/50 font-body">
          © {new Date().getFullYear()} {s.footerCopyright}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
