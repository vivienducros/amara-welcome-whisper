import { motion } from "framer-motion";
import logoBlack from "@/assets/logo-black.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.img
        src={logoBlack}
        alt="Amara"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-10 h-8 md:h-10"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-2xl text-3xl leading-snug font-light tracking-tight md:text-5xl md:leading-tight"
      >
        Wake Up to Nature, Work With Purpose, Live Among Visionaries
        <span className="mt-2 block text-primary">
          — Discover Your New Life in Portugal
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        Morning light through forest. Creative work that flows. Neighbors building the future.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="mt-12 rounded-full bg-primary px-10 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Discover Your Place
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
