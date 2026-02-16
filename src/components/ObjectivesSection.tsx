import { motion } from "framer-motion";
import { BookOpen, Users, FileText, Handshake, Lightbulb } from "lucide-react";

const objectives = [
  {
    icon: BookOpen,
    title: "Enhance Research Skills",
    description: "Foster a culture of inquiry and critical thinking by exposing students to diverse research methods, presentation styles, and emerging research areas.",
  },
  {
    icon: Users,
    title: "Promote Collaboration",
    description: "Strengthen collaboration between students, alumni, and industry professionals, bridging the gap between academic research and real-world applications.",
  },
  {
    icon: FileText,
    title: "Encourage Publications",
    description: "Motivate students to transform their projects and dissertations into conference papers or journal publications, with guidance from faculty.",
  },
  {
    icon: Handshake,
    title: "Mentorship & Networking",
    description: "Create mentorship links between graduates and current students to encourage continued academic and professional development.",
  },
  {
    icon: Lightbulb,
    title: "Showcase Innovation",
    description: "Provide a platform for sharing innovative ideas and research outcomes that can influence future projects or partnerships.",
  },
];

const ObjectivesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-navy-gradient">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4 font-body">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground">
            Core Objectives
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, i) => (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-lg border border-gold-subtle bg-gold-subtle backdrop-blur-sm hover:border-gold/40 transition-colors ${
                i === 4 ? "md:col-start-1 lg:col-start-2" : ""
              }`}
            >
              <obj.icon className="w-8 h-8 text-gold mb-5 stroke-[1.5]" />
              <h3 className="text-lg font-display font-semibold text-primary-foreground mb-3">
                {obj.title}
              </h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed font-body">
                {obj.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
