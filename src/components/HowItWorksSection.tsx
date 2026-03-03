import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Ask Your Question",
    description: "Type any question or topic you want structured.",
  },
  {
    num: "02",
    title: "AI Structures the Response",
    description: "NoteLM formats your output into organized knowledge.",
  },
  {
    num: "03",
    title: "Export & Store",
    description: "Download as PDF and store it automatically.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="howitworks" className="section-dark py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center md:text-left space-y-4 group"
            >
              <motion.span
                className="text-6xl font-extrabold opacity-20 inline-block"
                whileInView={{ opacity: 0.2, scale: [0.7, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.1, duration: 0.5 }}
              >
                {s.num}
              </motion.span>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-surface-dark-foreground/70 leading-relaxed text-sm">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
