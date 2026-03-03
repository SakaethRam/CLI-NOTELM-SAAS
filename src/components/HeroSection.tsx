import { motion } from "framer-motion";

const HeroMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: 8 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
  >
    {/* Title bar */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary">
      <div className="w-3 h-3 rounded-full bg-foreground/20" />
      <div className="w-3 h-3 rounded-full bg-foreground/20" />
      <div className="w-3 h-3 rounded-full bg-foreground/20" />
      <span className="ml-3 text-xs text-muted-foreground font-medium">NoteLM AI: Terminal NoteBook GPT</span>
    </div>
    {/* Content */}
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="h-3 rounded bg-foreground/10"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="h-3 rounded bg-foreground/10"
        />
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "75%" }}
        transition={{ delay: 1.0, duration: 0.7 }}
        className="h-5 rounded bg-foreground/80"
      />
      <div className="space-y-2">
        {[100, 83, 66].map((w, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${w}%`, opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
            className="h-3 rounded bg-foreground/10"
          />
        ))}
      </div>
      <div className="pt-2 border-t border-border space-y-2">
        <motion.div initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ delay: 1.8, duration: 0.5 }} className="h-4 rounded bg-foreground/15" />
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1.9, duration: 0.5 }} className="h-3 rounded bg-foreground/8" />
        <motion.div initial={{ width: 0 }} animate={{ width: "83%" }} transition={{ delay: 2.0, duration: 0.5 }} className="h-3 rounded bg-foreground/8" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.4 }}
        className="flex gap-3 pt-2"
      >
        <div className="h-8 w-24 rounded-md bg-primary" />
        <div className="h-8 w-24 rounded-md border border-border" />
      </motion.div>
    </div>
  </motion.div>
);

const headlineWords = "Turn Questions Into Structured Knowledge Instantly.".split(" ");

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-24">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              NoteLM transforms your prompts into clean, formatted, export-ready notes with metadata tracking and secure storage.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:bg-primary-foreground hover:text-primary border border-primary hover:scale-105"
              >
                Start Free
              </a>
              <a
                href="#productprev"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background text-foreground px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:bg-secondary hover:scale-105"
              >
                View Demo
              </a>
            </motion.div>
          </div>
          {/* Right */}
          <div className="flex justify-center lg:justify-end [perspective:1200px]">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
