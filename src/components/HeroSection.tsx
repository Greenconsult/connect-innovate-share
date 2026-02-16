import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Abstract mathematical and computing visualizations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold font-body text-sm uppercase tracking-[0.3em] mb-6">
            University of Wolverhampton — School of Computing &amp; Mathematical Sciences
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-6 leading-tight"
        >
          Research Corner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gold-light/80 font-display text-xl md:text-2xl italic max-w-2xl mx-auto mb-10"
        >
          Building a Research Culture in Computing &amp; Mathematical Sciences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted/70 text-sm"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gold" />
            Bi-monthly Sessions
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gold/40" />
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            Springfield Campus, Wolverhampton
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16"
        >
          <a
            href="#about"
            className="inline-block border border-gold/30 text-gold hover:bg-gold/10 transition-colors px-8 py-3 rounded-sm text-sm uppercase tracking-widest font-body"
          >
            Discover More
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
