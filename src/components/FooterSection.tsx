import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-academic-gradient text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-lg mb-3">Research and Employability Corner</h3>
            <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
              Showcasing Research. Shaping Careers.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-3 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body">
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link to="/speakers" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Speakers</Link></li>
              <li><Link to="/schedule" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Schedule</Link></li>
              <li><Link to="/proceedings" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Proceedings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-3 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm font-body text-primary-foreground/70">
              <li>Department of Computing & Mathematical Sciences</li>
              <li>University of Wolverhampton</li>
              <li>City Campus, Wolverhampton</li>
              <li className="mt-2">
                <a href="mailto:researchcorner@wlv.ac.uk" className="hover:text-primary-foreground transition-colors">
                  researchcorner@wlv.ac.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs text-primary-foreground/50 font-body">
          © {new Date().getFullYear()} University of Wolverhampton. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
