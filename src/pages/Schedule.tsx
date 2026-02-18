import { Clock, CalendarDays } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const schedule = [
  { time: "14:00 – 14:10", title: "Welcome Address", description: "Overview of the session and introduction of speakers.", accent: "bg-yellow-400" },
  { time: "14:10 – 14:30", title: "Keynote Talk", description: "Invited guest shares insights on a topical research area (15–20 mins).", accent: "bg-blue-500" },
  { time: "14:30 – 15:30", title: "Student & Graduate Presentations", description: "2–3 presentations (20 mins each), each followed by a 5-minute Q&A.", accent: "bg-emerald-500" },
  { time: "15:30 – 16:00", title: "Panel Discussion", description: "Open conversation on challenges and opportunities in student research.", accent: "bg-violet-500" },
  { time: "16:00 – 16:30", title: "Networking & Refreshments", description: "Informal discussion, idea exchange, and mentorship opportunities.", accent: "bg-orange-400" },
];

const Schedule = () => {
  return (
    <>
      {/* Vibrant hero */}
      <section className="relative py-20 flex items-center overflow-hidden">
        <img
          src={campusHero}
          alt="University of Wolverhampton"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            April 21, 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Schedule</h1>
          <p className="text-white/70 font-body text-lg">Typical event agenda for each session</p>
        </div>
      </section>

      {/* Schedule content */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Info banner */}
          <div className="flex items-center gap-3 mb-10 bg-slate-800 text-white rounded-xl p-4 shadow">
            <CalendarDays className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-sm font-body">
              <span className="font-semibold text-yellow-300">Frequency:</span> Twice every year &nbsp;·&nbsp;
              <span className="font-semibold text-yellow-300">Duration:</span> 3 hours
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {schedule.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${item.accent} flex-shrink-0 mt-1.5 shadow`} />
                  {i < schedule.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                </div>
                {/* Card */}
                <div className={`pb-8 flex-1`}>
                  <div className="bg-white border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">{item.time}</p>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Schedule;
