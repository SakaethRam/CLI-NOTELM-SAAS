import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Is my data stored securely?", a: "Yes. All notes and data are encrypted at rest and in transit. We follow industry-standard security practices to protect your information." },
  { q: "Can I export notes in different formats?", a: "Currently we support PDF export. More formats including Markdown and DOCX are coming soon." },
  { q: "Which AI model powers NoteLM?", a: "NoteLM supports multiple leading AI models. You can choose the model that best fits your needs from the settings panel." },
  { q: "Is NoteLM suitable for students and developers?", a: "Absolutely. NoteLM is designed for anyone who needs to organize knowledge, from students taking research notes to developers documenting code." },
  { q: "Does it work offline?", a: "Yes. NoteLM supports offline usage, allowing you to access, generate or work with your saved notes anytime, even without an internet connection." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-16 tracking-tight"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <AccordionItem value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;