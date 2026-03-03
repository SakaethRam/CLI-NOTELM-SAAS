import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/hooks/use-scroll-fade-in";
import { FileText, Download, Database } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Structured AI Output",
    description: "AI responses are automatically formatted into readable, organized notes.",
  },
  {
    icon: Download,
    title: "One-Click PDF Export",
    description: "Generate clean, professional PDFs instantly.",
  },
  {
    icon: Database,
    title: "Metadata & Storage",
    description: "Every note is saved with timestamp, model details, and performance tracking.",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollFadeIn();

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight"
        >
          Why NoteLM?
        </motion.h2>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-border bg-card p-8 transition-shadow duration-300 hover:shadow-xl group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: -8, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block mb-5"
              >
                <f.icon className="w-8 h-8 text-foreground" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;