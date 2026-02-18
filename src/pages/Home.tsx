import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowRight, BookOpen, Briefcase, TrendingUp } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const Home = () => {
  return (
    <>
      {/* Hero with campus image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src={campusHero}
          alt="University of Wolverhampton City Campus"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white/90 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            April 21, 2026 · University of Wolverhampton
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight drop-shadow-lg">
            Research Corner 2026
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-display font-semibold text-yellow-300 mb-4 drop-shadow">
            Research-Driven. Industry-Ready. Career-Focused.
          </p>



          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/proceedings"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded text-sm font-body font-bold transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              View Proceedings <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/schedule"
              className="bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 text-white px-8 py-3 rounded text-sm font-body font-semibold transition-colors"
            >
              View Schedule
            </Link>
          </div>

          {/* Info pills */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/75 text-sm font-body">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <CalendarDays className="w-4 h-4 text-yellow-300" /> Engaging Sessions
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <MapPin className="w-4 h-4 text-yellow-300" /> City Campus
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <Users className="w-4 h-4 text-yellow-300" /> Open to All Students
            </span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
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
              { icon: BookOpen, title: "Present Your Research", desc: "Share your findings with an engaged academic audience and receive valuable feedback." },
              { icon: Briefcase, title: "Network & Collaborate", desc: "Connect with peers, alumni, faculty, and industry professionals." },
              { icon: TrendingUp, title: "Build Your Profile", desc: "Gain experience in academic presentation, work toward publications and connect with Industry." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded p-6">
                <item.icon className="w-6 h-6 text-primary mb-3" />
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
              to="/proceedings"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors"
            >
              View Proceedings
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
