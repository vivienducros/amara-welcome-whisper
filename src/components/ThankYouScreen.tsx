import { motion } from "framer-motion";

interface ThankYouScreenProps {
  firstName: string;
}

const ThankYouScreen = ({ firstName }: ThankYouScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 text-5xl"
      >
        ✦
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-md text-3xl font-light leading-snug md:text-4xl"
      >
        {firstName}, your journey has already begun.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        Something beautiful is taking shape in Portugal — and now you're part of it. We'll be in touch soon with everything you need to know.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-10 text-xs uppercase tracking-[0.3em] text-primary"
      >
        Amara · Coming to life
      </motion.p>
    </motion.div>
  );
};

export default ThankYouScreen;
