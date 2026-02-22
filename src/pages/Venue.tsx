import { MapPin, Train, Bus, Car } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";
import { useSettings } from "@/hooks/useSettings";
import { useCurrentEvent } from "@/hooks/useEvents";
import { DEFAULT_SETTINGS } from "@/lib/settingsStore";

const travelIcons: Record<string, typeof Train> = {
  train: Train,
  bus: Bus,
  car: Car,
};

const travelStyles = [
  { color: "text-blue-500", bg: "bg-blue-50 border-blue-200" },
  { color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200" },
  { color: "text-orange-500", bg: "bg-orange-50 border-orange-200" },
  { color: "text-violet-500", bg: "bg-violet-50 border-violet-200" },
  { color: "text-rose-500", bg: "bg-rose-50 border-rose-200" },
];

const Venue = () => {
  const { data: settings } = useSettings();
  const { data: event } = useCurrentEvent();
  const s = settings ?? DEFAULT_SETTINGS;

  const displayDate = event?.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })
    : "Date TBA";

  return (
    <>
      {/* Vibrant hero */}
      <section className="relative py-20 flex items-center overflow-hidden">
        <img
          src={campusHero}
          alt={s.venueAddress}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
        <div className="relative z-10 container mx-auto px-6 text-white">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {displayDate}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Venue</h1>
          <p className="text-white/70 font-body text-lg">Location and travel information</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Location card */}
          <div className="flex items-center gap-5 bg-slate-800 text-white rounded-xl p-6 mb-10 shadow">
            <div className="w-14 h-14 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-yellow-300 mb-1">Location</p>
              <p className="font-display font-bold text-white text-lg">{s.venueAddress}</p>
              <p className="text-white/60 font-body text-sm">{s.venueAddressLine2}</p>
            </div>
          </div>

          <h2 className="text-xl font-display font-bold text-foreground mb-5">Getting Here</h2>
          <div className="grid gap-4 mb-10">
            {s.travelOptions.map((opt, i) => {
              const style = travelStyles[i % travelStyles.length];
              const keyword = opt.title.toLowerCase();
              const Icon = keyword.includes("train") ? Train : keyword.includes("bus") ? Bus : Car;
              return (
                <div key={i} className={`flex items-start gap-4 border rounded-xl p-5 ${style.bg} shadow-sm`}>
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.color}`} />
                  <div>
                    <h3 className="font-body font-bold text-foreground text-sm mb-1">{opt.title}</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">{opt.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map */}
          {s.venueMapUrl && (
            <div className="rounded-xl overflow-hidden border border-border shadow-md">
              <iframe
                title={s.venueAddress}
                src={s.venueMapUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Venue;
