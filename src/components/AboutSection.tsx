import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.p variants={fadeUp} custom={0} className="text-gold text-sm uppercase tracking-[0.25em] mb-4 font-body">
            About the Initiative
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8">
            Where Ideas Take Shape
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="w-16 h-px bg-gold mx-auto mb-10" />
          <motion.p variants={fadeUp} custom={3} className="text-muted-foreground text-lg leading-relaxed mb-6">
            Research Corner is a vibrant platform where undergraduate students, postgraduate students, and recent graduates can showcase their research, exchange ideas, and build lasting collaborations with peers, academics, and industry partners.
          </motion.p>
          <motion.p variants={fadeUp} custom={4} className="text-muted-foreground text-lg leading-relaxed">
            Each session features research presentations, panel discussions, and networking opportunities designed to promote innovation, academic excellence, and professional growth within the School of Computing and Mathematical Sciences.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
