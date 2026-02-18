import { MapPin } from "lucide-react";

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
          <div className="mb-10">
            <div className="bg-card border border-border rounded p-5 text-center max-w-sm mx-auto">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">Location</p>
              <p className="font-display font-bold text-foreground text-sm">City Campus, University of Wolverhampton</p>
            </div>
          </div>

          <h2 className="text-xl font-display font-bold text-foreground mb-4">Getting Here</h2>
          <div className="bg-card border border-border rounded p-6 space-y-4 mb-8">
            <div>
              <h3 className="font-body font-semibold text-foreground text-sm mb-1">By Train</h3>
              <p className="text-muted-foreground text-sm font-body">Wolverhampton railway station is a 15-minute walk from City Campus. Regular services run from Birmingham New Street.</p>
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

          {/* Embedded Google Map */}
          <div className="rounded overflow-hidden border border-border">
            <iframe
              title="City Campus, University of Wolverhampton"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422.5!2d-2.1288!3d52.5886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d0e7a3c3b%3A0x5e3e5e3e5e3e5e3e!2sSpringfield%20Campus%2C%20University%20of%20Wolverhampton!5e0!3m2!1sen!2suk!4v1700000000000"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Venue;
