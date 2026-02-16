import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-academic-gradient text-primary-foreground py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <p className="text-primary-foreground/70 font-body text-sm uppercase tracking-widest mb-4">
            University of Wolverhampton
          </p>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Research Corner 2026
          </h1>
          <p className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Building a Research Culture in Computing & Mathematical Sciences
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/call-for-papers"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors inline-flex items-center gap-2"
            >
              Submit Your Paper <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/schedule"
              className="border border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors"
            >
              View Schedule
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/60 text-sm font-body">
            <span className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Bi-monthly Sessions
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Springfield Campus
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Open to All Students
            </span>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
            About the Initiative
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
            Research Corner is a vibrant platform where undergraduate students, postgraduate students, and recent graduates can showcase their research, exchange ideas, and build lasting collaborations with peers, academics, and industry partners.
          </p>
          <Link to="/about" className="text-primary font-body font-semibold text-sm hover:underline inline-flex items-center gap-1">
            Learn more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Key features */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-12">
            Why Attend?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Present Your Research", desc: "Share your findings with an engaged academic audience and receive valuable feedback." },
              { title: "Network & Collaborate", desc: "Connect with peers, alumni, faculty, and industry professionals." },
              { title: "Build Your Profile", desc: "Gain experience in academic presentation and work toward publications." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded p-6">
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Ready to Participate?
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">
            Whether you want to present your research or attend as an audience member, Research Corner welcomes you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/call-for-papers"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors"
            >
              Submit a Paper
            </Link>
            <Link
              to="/contact"
              className="border border-border hover:bg-muted text-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
