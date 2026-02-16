import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, Users } from "lucide-react";

const details = [
  { icon: Calendar, label: "Frequency", value: "Every two months (bi-monthly)" },
  { icon: Clock, label: "Duration", value: "2–3 hours per session" },
  { icon: MapPin, label: "Venue", value: "Springfield Campus (or City Campus)" },
  { icon: Users, label: "Audience", value: "Students, graduates, staff & industry guests" },
];

const FormatSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4 font-body">
            Event Details
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Format &amp; Structure
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-5 p-6 rounded-lg border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-body">
                  {item.label}
                </p>
                <p className="text-foreground font-display font-medium text-lg">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
