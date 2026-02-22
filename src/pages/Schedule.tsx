import { Clock, CalendarDays } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";
import { useCurrentEvent } from "@/hooks/useEvents";
import { Loader2 } from "lucide-react";

const accentColors = ["bg-yellow-400", "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-orange-400"];

const Schedule = () => {
  const { data: event, isLoading } = useCurrentEvent();
  const schedule = event?.schedule ?? [];

  return (
    <>
      <section className="relative py-20 flex items-center overflow-hidden">
        <img src={campusHero} alt="University of Wolverhampton" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {event?.date ? new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" }) : "TBA"}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Schedule</h1>
          <p className="text-white/70 font-body text-lg">Event Agenda</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-10 bg-slate-800 text-white rounded-xl p-4 shadow">
            <CalendarDays className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-sm font-body">
              <span className="font-semibold text-yellow-300">Frequency:</span> Twice every year &nbsp;·&nbsp;
              <span className="font-semibold text-yellow-300">Duration:</span> {event?.duration || "3 hours"}
            </p>
          </div>

          <div className="space-y-0">
            {schedule.map((item, i) => (
              <div key={item.id} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${accentColors[i % accentColors.length]} flex-shrink-0 mt-1.5 shadow`} />
                  {i < schedule.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                </div>
                <div className="pb-8 flex-1">
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
          {isLoading && (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          )}
          {!isLoading && schedule.length === 0 && <p className="text-center text-muted-foreground font-body">Schedule not yet available.</p>}
        </div>
      </section>
    </>
  );
};

export default Schedule;
