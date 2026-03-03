import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="cta" className="section-dark py-24 lg:py-32">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight"
        >
          Build Your AI Knowledge System Today.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-surface-dark-foreground/70 mb-10 text-lg leading-relaxed"
        >
          Start organizing your AI outputs into structured knowledge.
        </motion.p>
        <motion.a
          href="mailto:abishekram@gmail.com"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center rounded-xl bg-primary-foreground text-primary px-10 py-4 text-base font-semibold transition-colors duration-300 hover:bg-primary hover:text-primary-foreground border border-primary-foreground"
        >
          Contact Sales
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;