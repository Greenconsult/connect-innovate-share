import { FileText, CheckCircle, Send } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

const topics = [
  "Artificial Intelligence & Machine Learning",
  "Cybersecurity & Network Security",
  "Software Engineering & DevOps",
  "Data Science & Big Data Analytics",
  "Internet of Things (IoT)",
  "Human-Computer Interaction",
  "Mathematical Modelling & Optimisation",
  "Cloud Computing & Distributed Systems",
];

const Proceedings = () => {
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
            Call for Abstracts
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">Proceedings</h1>
          <p className="text-white/70 font-body text-lg">Access all research presentations and abstracts here after the event</p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Welcome banner */}
          <div className="flex items-start gap-4 mb-10 bg-slate-800 text-white rounded-xl p-6 shadow">
            <FileText className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display font-bold text-white mb-2 text-lg">We Welcome Your Research</h2>
              <p className="text-white/70 font-body text-sm leading-relaxed">
                Research and Employability Corner invites abstract submissions from undergraduate students and postgraduate students of the Department of Computing & Mathematical Sciences. Proceedings of abstract will be available on this page after the event.
              </p>
            </div>
          </div>

          {/* Topics */}
          <h3 className="font-display font-bold text-foreground text-xl mb-5">Topics of Interest</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{topic}</span>
              </div>
            ))}
          </div>

          {/* Guidelines */}
          <h3 className="font-display font-bold text-foreground text-xl mb-5">Submission Guidelines</h3>
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-4 mb-10">
            {[
              { label: "Abstract Length", value: "250–500 words" },
              { label: "Presentation Duration", value: "20 minutes + 5 minutes Q&A" },
              { label: "Format", value: "PDF or Word document" },
            ].map((g) => (
              <div key={g.label} className="flex items-center gap-3">
                <span className="text-xs font-body font-bold uppercase tracking-wide text-muted-foreground w-44 shrink-0">{g.label}</span>
                <span className="text-sm font-body text-foreground font-semibold">{g.value}</span>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <span className="text-xs font-body font-bold uppercase tracking-wide text-muted-foreground w-44 shrink-0">Submission Email</span>
              <a href="mailto:researchcorner@wlv.ac.uk" className="text-sm font-body text-primary font-semibold hover:underline flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> researchcorner@wlv.ac.uk
              </a>
            </div>
          </div>

          {/* Dates */}
          <h3 className="font-display font-bold text-foreground text-xl mb-5">Important Dates</h3>
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
            {[
              { label: "Abstract Submission Deadline", value: "TBA", color: "border-l-yellow-400" },
              { label: "Notification of Acceptance", value: "TBA", color: "border-l-blue-500" },
              { label: "Presentation Date", value: "TBA", color: "border-l-emerald-500" },
            ].map((row) => (
              <div key={row.label} className={`flex items-center justify-between px-5 py-4 border-b last:border-0 border-border border-l-4 ${row.color}`}>
                <span className="text-sm font-body font-semibold text-foreground">{row.label}</span>
                <span className="text-sm font-body text-muted-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Proceedings;
