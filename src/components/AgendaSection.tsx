import { motion } from "framer-motion";

const agenda = [
  {
    time: "Opening",
    title: "Welcome Address",
    description: "Overview of the session and introduction of speakers.",
  },
  {
    time: "15–20 min",
    title: "Keynote Talk",
    description: "Invited guest — an academic, alumnus, or industry researcher — shares insights on a topical research area.",
  },
  {
    time: "20 min each",
    title: "Student & Graduate Presentations",
    description: "2–3 presentations per session, each followed by a 5-minute Q&A.",
  },
  {
    time: "Open",
    title: "Panel Discussion",
    description: "Open conversation on challenges and opportunities in student research.",
  },
  {
    time: "Closing",
    title: "Networking & Refreshments",
    description: "Informal discussion, idea exchange, and mentorship opportunities.",
  },
];

const AgendaSection = () => {
  return (
    <section className="py-24 md:py-32 bg-navy-gradient">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4 font-body">
            What to Expect
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
            Typical Event Agenda
          </h2>
        </motion.div>

        <div className="space-y-0">
          {agenda.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 md:gap-10 group"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gold shrink-0 mt-2" />
                {i < agenda.length - 1 && (
                  <div className="w-px flex-1 bg-gold/20" />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                <span className="text-xs text-gold/70 uppercase tracking-widest font-body">
                  {item.time}
                </span>
                <h3 className="text-xl font-display font-semibold text-primary-foreground mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed font-body max-w-lg">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
