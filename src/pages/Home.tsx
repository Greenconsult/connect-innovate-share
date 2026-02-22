import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowRight, BookOpen, Briefcase, TrendingUp, Loader2 } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";
import { useEffect, useState } from "react";
import { useCurrentEvent, useEvents } from "@/hooks/useEvents";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Pad = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-lg px-4 py-2 min-w-[64px] text-center">
      <span className="text-3xl md:text-4xl font-display font-bold text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-white/60 font-body text-xs uppercase tracking-widest mt-1.5">{label}</span>
  </div>
);

const Home = () => {
  const { data: event, isLoading } = useCurrentEvent();
  const eventDate = event?.date ? new Date(event.date + "T00:00:00") : new Date("2026-04-21T00:00:00");
  const { days, hours, minutes, seconds } = useCountdown(eventDate);

  const displayDate = event?.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })
    : "April 21, 2026";

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={campusHero} alt="University of Wolverhampton City Campus" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/75" />
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white/90 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {displayDate} · {event?.venue || "University of Wolverhampton"}
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight drop-shadow-lg">
            Research and Employability Corner
          </h1>
          <p className="text-xl md:text-2xl font-display font-semibold text-yellow-300 mb-4 drop-shadow">
            {event?.tagline || "Research-Driven. Industry-Ready. Career-Focused."}
          </p>

          {days <= 20 && (
            <div className="flex items-center justify-center gap-3 mb-10">
              <Pad value={days} label="Days" />
              <span className="text-white/40 font-display text-3xl font-bold mb-5">:</span>
              <Pad value={hours} label="Hours" />
              <span className="text-white/40 font-display text-3xl font-bold mb-5">:</span>
              <Pad value={minutes} label="Mins" />
              <span className="text-white/40 font-display text-3xl font-bold mb-5">:</span>
              <Pad value={seconds} label="Secs" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/proceedings" className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded text-sm font-body font-bold transition-colors inline-flex items-center gap-2 shadow-lg">
              View Proceedings <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/schedule" className="bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 text-white px-8 py-3 rounded text-sm font-body font-semibold transition-colors">
              View Schedule
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/75 text-sm font-body">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <CalendarDays className="w-4 h-4 text-yellow-300" /> Engaging Sessions
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <MapPin className="w-4 h-4 text-yellow-300" /> {event?.venue?.split(",")[0] || "City Campus"}
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <Users className="w-4 h-4 text-yellow-300" /> Open to All Students
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About preview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">About the Initiative</h2>
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
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-12">Why Attend?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, title: "Present Your Research", desc: "Share your findings with an engaged academic and industry audience and receive valuable feedback." },
              { icon: Briefcase, title: "Network & Collaborate", desc: "Connect with peers, alumni, faculty, and industry professionals." },
              { icon: TrendingUp, title: "Build Your Profile", desc: "Gain experience in academic presentation, work toward publications and connect with Industry for employment." },
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

      {/* Editions */}
      <section className="bg-section-alt py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-4">Editions</h2>
          <p className="text-muted-foreground font-body text-center mb-10 max-w-xl mx-auto">
            Browse past and upcoming editions of the Research and Employability Corner.
          </p>
          <EditionsList />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">Ready to Participate?</h2>
          <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">
            Whether you want to present your research or attend as an audience member, Research Corner welcomes you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/proceedings" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors">
              View Proceedings
            </Link>
            <Link to="/contact" className="border border-border hover:bg-muted text-foreground px-6 py-3 rounded text-sm font-body font-semibold transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const EditionsList = () => {
  const { data: events = [], isLoading } = useEvents();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (events.length === 0) {
    return <p className="text-center text-muted-foreground font-body">No editions available yet.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {events.map((ev) => {
        const displayDate = ev.date
          ? new Date(ev.date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })
          : "Date TBA";

        return (
          <Link
            key={ev.id}
            to={`/editions/${ev.id}`}
            className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/40"
          >
            <div className="relative h-32 overflow-hidden">
              <img src={campusHero} alt={ev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-display font-bold text-white text-lg drop-shadow">{ev.name || "Untitled Event"}</h3>
              </div>
              <div className="absolute top-3 right-3 flex gap-1.5">
                {ev.isCurrent && (
                  <span className="bg-yellow-400 text-black text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase">
                    Current
                  </span>
                )}
                <span className={`text-[10px] font-body font-bold px-2 py-0.5 rounded-full uppercase ${ev.status === "upcoming" ? "bg-emerald-500 text-white" : "bg-white/80 text-slate-700"}`}>
                  {ev.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-2">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{displayDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{ev.venue || "Venue TBA"}</span>
              </div>
              {ev.tagline && (
                <p className="text-xs text-muted-foreground font-body italic truncate">{ev.tagline}</p>
              )}
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-body mt-3 pt-3 border-t border-border">
                <span>{ev.speakers.length} speaker{ev.speakers.length !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{ev.schedule.length} session{ev.schedule.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
