import { Mail, MapPin, Phone, Send } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const Contact = () => {
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
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Contact</h1>
          <p className="text-white/70 font-body text-lg">Get in touch with the organising team</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white border border-border rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-foreground text-sm">Email</p>
                    <a href="mailto:researchcorner@wlv.ac.uk" className="text-primary text-sm font-body hover:underline">researchcorner@wlv.ac.uk</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white border border-border rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-foreground text-sm">Phone</p>
                    <p className="text-muted-foreground text-sm font-body">+44 (0)1902 321000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white border border-border rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-foreground text-sm">Address</p>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">
                      Department of Computing & Mathematical Sciences<br />
                      University of Wolverhampton<br />
                      City Campus, Wolverhampton, WV10 0JP
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">Send a Message</h2>
              <form className="space-y-4 bg-white border border-border rounded-xl p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Name</label>
                  <input type="text" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Email</label>
                  <input type="email" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Subject</label>
                  <input type="text" className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-body font-semibold text-foreground mb-1">Message</label>
                  <textarea rows={4} className="w-full border border-border rounded-lg px-3 py-2.5 text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Your message..." />
                </div>
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg text-sm font-body font-bold transition-colors flex items-center justify-center gap-2 shadow">
                  <Send className="w-4 h-4" /> Send Message
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
