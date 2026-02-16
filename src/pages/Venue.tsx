import { MapPin, Clock, Calendar } from "lucide-react";

const Venue = () => {
  return (
    <>
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Venue</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Location and travel information</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: MapPin, label: "Location", value: "Springfield Campus, Wolverhampton" },
              { icon: Calendar, label: "Frequency", value: "Twice Every Year" },
              { icon: Clock, label: "Duration", value: "2–3 hours per session" },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded p-5 text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-display font-bold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-display font-bold text-foreground mb-4">Getting Here</h2>
          <div className="bg-card border border-border rounded p-6 space-y-4 mb-8">
            <div>
              <h3 className="font-body font-semibold text-foreground text-sm mb-1">By Train</h3>
              <p className="text-muted-foreground text-sm font-body">Wolverhampton railway station is a 15-minute walk from Springfield Campus. Regular services run from Birmingham New Street.</p>
            </div>
            <div>
              <h3 className="font-body font-semibold text-foreground text-sm mb-1">By Bus</h3>
              <p className="text-muted-foreground text-sm font-body">Several bus routes serve the campus area. Check National Express West Midlands for timetables.</p>
            </div>
            <div>
              <h3 className="font-body font-semibold text-foreground text-sm mb-1">By Car</h3>
              <p className="text-muted-foreground text-sm font-body">Limited parking is available on campus. We recommend using public transport where possible.</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-muted border border-border rounded h-64 flex items-center justify-center">
            <p className="text-muted-foreground font-body text-sm">Map — Springfield Campus, University of Wolverhampton</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Venue;
