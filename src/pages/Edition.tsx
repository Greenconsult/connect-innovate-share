import { useParams, Link } from "react-router-dom";
import { useEvent } from "@/hooks/useEvents";
import { CalendarDays, MapPin, Clock, Users, Mic, User, ArrowLeft, Loader2 } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const roleColors: Record<string, string> = {
  "Keynote Speaker": "bg-yellow-400 text-black",
  "Invited Speaker": "bg-blue-500 text-white",
  "Panel Moderator": "bg-emerald-500 text-white",
};

const roleIcons: Record<string, typeof Mic> = {
  "Keynote Speaker": Mic,
  "Invited Speaker": User,
  "Panel Moderator": Users,
};

const Edition = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading } = useEvent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground font-body">Edition not found.</p>
        <Link to="/" className="text-primary font-body font-semibold text-sm hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const displayDate = event.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "TBA";

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 flex items-center overflow-hidden">
        <img src={campusHero} alt="University of Wolverhampton" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-6 text-white">
          <Link to="/" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm font-body mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-4 ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {event.status === "upcoming" ? "Upcoming" : "Past Event"}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">{event.name || "Untitled Event"}</h1>
          <p className="text-white/70 font-body text-lg">{event.tagline}</p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Event overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Date</p>
                <p className="text-sm font-body font-semibold text-foreground">{displayDate}</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Duration</p>
                <p className="text-sm font-body font-semibold text-foreground">{event.duration}</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Venue</p>
                <p className="text-sm font-body font-semibold text-foreground">{event.venue}</p>
              </div>
            </div>
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm flex items-center gap-3">
              <Users className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Audience</p>
                <p className="text-sm font-body font-semibold text-foreground">{event.audience}</p>
              </div>
            </div>
          </div>

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-display font-bold text-foreground mb-5">Speakers</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {event.speakers.map((speaker) => {
                  const Icon = roleIcons[speaker.role] ?? User;
                  return (
                    <div key={speaker.id} className="bg-white border border-border rounded-xl p-5 shadow-sm flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0 shadow">
                        <Icon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground text-sm">{speaker.name}</h3>
                        <span className={`inline-block text-[10px] font-body font-bold px-2 py-0.5 rounded-full mt-0.5 ${roleColors[speaker.role] ?? "bg-muted text-foreground"}`}>
                          {speaker.role}
                        </span>
                        <p className="text-muted-foreground font-body text-xs mt-1">{speaker.affiliation}</p>
                        <p className="text-xs font-body mt-1"><span className="text-yellow-600 font-semibold">Topic:</span> {speaker.topic}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Schedule */}
          {event.schedule.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-display font-bold text-foreground mb-5">Schedule</h2>
              <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                {event.schedule.map((item, i) => (
                  <div key={item.id} className={`flex items-start gap-4 px-5 py-4 ${i < event.schedule.length - 1 ? "border-b border-border" : ""}`}>
                    <div className="flex items-center gap-2 min-w-[130px]">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">{item.time}</span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-xs font-body">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Committee */}
          {event.committee.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-display font-bold text-foreground mb-5">Committee</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {event.committee.map((member) => (
                  <div key={member.id} className="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground text-xs">{member.name}</h3>
                      <p className="text-muted-foreground font-body text-[10px]">{member.role} · {member.affiliation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {event.topics.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-display font-bold text-foreground mb-5">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {event.topics.map((topic) => (
                  <span key={topic} className="bg-primary/10 text-primary text-xs font-body font-semibold px-3 py-1.5 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Edition;
