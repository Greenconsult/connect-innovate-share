import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <>
      <section className="bg-academic-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Contact</h1>
          <p className="text-primary-foreground/70 font-body mt-2">Get in touch with the organising team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">Email</p>
                    <a href="mailto:researchcorner@wlv.ac.uk" className="text-primary text-sm font-body hover:underline">researchcorner@wlv.ac.uk</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">Phone</p>
                    <p className="text-muted-foreground text-sm font-body">+44 (0)1902 321000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">Address</p>
                    <p className="text-muted-foreground text-sm font-body">
                      School of Computing & Mathematical Sciences<br />
                      University of Wolverhampton<br />
                      Springfield Campus<br />
                      Wolverhampton, WV10 0JP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Send a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Name</label>
                  <input type="text" className="w-full border border-border rounded px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Email</label>
                  <input type="email" className="w-full border border-border rounded px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Subject</label>
                  <input type="text" className="w-full border border-border rounded px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Message</label>
                  <textarea rows={4} className="w-full border border-border rounded px-3 py-2 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded text-sm font-body font-semibold transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
