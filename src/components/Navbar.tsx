import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl bg-background/60 backdrop-blur-xl border border-border/50 text-foreground rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between"
      >
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg font-bold tracking-tight"
        >
          NoteLM Ai
        </motion.span>
        {/*<div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {["Features", "How It Works", "FAQ"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "")}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              className="hover:text-foreground transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>*/}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.a
            href="#faq"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
          >
            Why Us?
          </motion.a>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
