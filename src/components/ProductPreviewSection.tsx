import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Database, Search } from "lucide-react";

const slides = [
  {
    id: "ask",
    icon: Search,
    label: "Ask",
  },
  {
    id: "structured",
    icon: FileText,
    label: "Structure",
  },
  {
    id: "export",
    icon: Download,
    label: "Export",
  },
  {
    id: "stored",
    icon: Database,
    label: "Store",
  },
];

const SlideAsk = () => (
  <div className="p-6 sm:p-8 space-y-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-foreground/30" />
      <span className="text-xs text-muted-foreground font-medium">NoteLM AI: New Note</span>
    </div>
    <div className="space-y-4">
      <label className="text-sm font-medium text-muted-foreground">Your Question</label>
      <div className="rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm">
        What is the difference between API and LLM?
      </div>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold"
      >
        Generate
      </motion.div>
    </div>
  </div>
);

const SlideStructured = () => (
  <div className="p-6 sm:p-8 space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-foreground/30" />
      <span className="text-xs text-muted-foreground font-medium">NoteLM AI: Structured Output</span>
    </div>
    <div className="space-y-3">
      <div className="h-5 w-3/4 rounded bg-foreground/80" />
      <div className="space-y-2 pl-4 border-l-2 border-border">
        <div className="h-3 w-full rounded bg-foreground/10" />
        <div className="h-3 w-5/6 rounded bg-foreground/10" />
        <div className="h-3 w-4/6 rounded bg-foreground/10" />
      </div>
      <div className="h-4 w-1/2 rounded bg-foreground/15 mt-4" />
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="h-8 rounded bg-secondary border border-border" />
        <div className="h-8 rounded bg-secondary border border-border" />
        <div className="h-8 rounded bg-secondary border border-border" />
      </div>
      <div className="border-t border-border mt-4 pt-3 space-y-2">
        <div className="h-3 w-full rounded bg-foreground/8" />
        <div className="h-3 w-5/6 rounded bg-foreground/8" />
      </div>
    </div>
  </div>
);

const SlideExport = () => (
  <div className="p-6 sm:p-8 space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-foreground/30" />
      <span className="text-xs text-muted-foreground font-medium">NoteLM AI: Export</span>
    </div>
    <div className="flex flex-col items-center justify-center py-6 space-y-5">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
      >
        <FileText className="w-16 h-16 text-foreground/60" strokeWidth={1} />
      </motion.div>
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold">USER_NOTE.pdf</p>
        <p className="text-xs text-muted-foreground">Ready to download</p>
      </div>
      <div className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold">
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </div>
    </div>
  </div>
);

const SlideStored = () => (
  <div className="p-6 sm:p-8 space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-foreground/30" />
      <span className="text-xs text-muted-foreground font-medium">NoteLM AI: Metadata & Database</span>
    </div>
    <div className="space-y-2">
      {[
        { q: "API vs LLM", date: "Feb 22, 2026", model: "NoteLM-4o" },
        { q: "React vs Vue comparison", date: "Feb 21, 2026", model: "NoteLM 3.5" },
        { q: "Database indexing", date: "Feb 20, 2026", model: "NoteLM v1.1" },
      ].map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm"
        >
          <span className="font-medium truncate mr-4">{row.q}</span>
          <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
            <span>{row.date}</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">{row.model}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const slideComponents = [SlideAsk, SlideStructured, SlideExport, SlideStored];

const ProductPreviewSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [paused, next]);

  const SlideComponent = slideComponents[current];

  return (
    <section className="py-24 lg:py-32 bg-secondary/30" id="productprev">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight"
        >
          See NoteLM in Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-muted-foreground mb-12 max-w-lg mx-auto"
        >
          Watch how a simple question becomes structured knowledge, automatically.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Preview card */}
          <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden min-h-[320px] sm:min-h-[340px] relative">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <SlideComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  i === current
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <s.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="h-0.5 w-full bg-border rounded-full overflow-hidden">
              <motion.div
                key={`${current}-${paused}`}
                className="h-full bg-foreground/40 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: paused ? undefined : "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;