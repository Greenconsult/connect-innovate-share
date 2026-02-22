import { User, Mic, Users } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";
import { useCurrentEvent } from "@/hooks/useEvents";
import { Loader2 } from "lucide-react";

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

const Speakers = () => {
  const { data: event, isLoading } = useCurrentEvent();
  const speakers = event?.speakers ?? [];

  return (
    <>
      <section className="relative py-20 flex items-center overflow-hidden">
        <img src={campusHero} alt="University of Wolverhampton" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {event?.name || "REC"}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Speakers</h1>
          <p className="text-white/70 font-body text-lg">Meet our keynote and invited speakers</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {speakers.map((speaker) => {
              const Icon = roleIcons[speaker.role] ?? User;
              return (
                <div
                  key={speaker.id}
                  className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {speaker.imageUrl ? (
                      <img
                        src={speaker.imageUrl}
                        alt={speaker.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0 shadow border border-border"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0 shadow">
                        <Icon className="w-6 h-6 text-yellow-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-bold text-foreground text-lg">{speaker.name}</h3>
                      <span
                        className={`inline-block text-xs font-body font-bold px-2.5 py-0.5 rounded-full mt-1 ${
                          roleColors[speaker.role] ?? "bg-muted text-foreground"
                        }`}
                      >
                        {speaker.role}
                      </span>
                      <p className="text-muted-foreground font-body text-xs mt-1">{speaker.affiliation}</p>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-body font-semibold text-foreground mb-1">
                      <span className="text-yellow-600">Topic:</span> {speaker.topic}
                    </p>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{speaker.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          {!isLoading && speakers.length === 0 && (
            <p className="text-center text-muted-foreground font-body">No speakers announced yet.</p>
          )}
          <div className="text-center mt-12 p-6 bg-slate-800 rounded-xl max-w-xl mx-auto">
            <p className="text-white/80 font-body text-sm">
              Interested in speaking at Research and Employability Corner?{" "}
              <a href="/contact" className="text-yellow-400 font-semibold hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Speakers;
