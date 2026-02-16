import { motion } from "framer-motion";
import { Video } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import lpBg from "@/assets/lp-bg.jpg";
import vivienImg from "@/assets/vivien.png";
import michaelImg from "@/assets/michael.jpg";

function getNextThursday8pmLisbon(): Date {
  const now = new Date();
  // Create a date in Lisbon timezone
  const lisbonNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Lisbon" }));
  const dayOfWeek = lisbonNow.getDay(); // 0=Sun, 4=Thu
  let daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  
  // If it's Thursday, check if 8PM has passed in Lisbon
  if (daysUntilThursday === 0) {
    const lisbonHour = lisbonNow.getHours();
    if (lisbonHour >= 20) {
      daysUntilThursday = 7;
    }
  }
  
  // Build the target date at 20:00 Lisbon time
  const target = new Date(lisbonNow);
  target.setDate(lisbonNow.getDate() + daysUntilThursday);
  target.setHours(20, 0, 0, 0);
  
  // Convert back: find the UTC equivalent of 20:00 Lisbon
  const lisbonStr = target.toLocaleDateString("en-CA", { timeZone: "Europe/Lisbon" }); // YYYY-MM-DD
  const utcTarget = new Date(`${lisbonStr}T20:00:00`);
  // Adjust for Lisbon offset
  const lisbonOffset = new Date(utcTarget.toLocaleString("en-US", { timeZone: "Europe/Lisbon" })).getTime() - utcTarget.getTime();
  
  return new Date(utcTarget.getTime() - lisbonOffset);
}

function formatEventDate(date: Date): string {
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const city = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop()?.replace(/_/g, " ") || "local time";
  return `${dateStr} at ${timeStr} (${city})`;
}

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex min-h-[100dvh] flex-col px-6 text-center"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${lpBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Top bar: logo left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative z-10 flex items-center pt-6"
      >
        <img src={logoWhite} alt="Amara" className="h-5 md:h-6" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl text-3xl leading-snug font-light tracking-tight text-white drop-shadow-lg md:text-5xl md:leading-tight"
        >
          Wake Up to Nature, Work With Purpose, Live Among Visionaries
          <span className="mt-2 block text-white/90">
            — Discover Your New Life in Portugal
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md">
            <Video className="h-4 w-4" />
            <span>Live Online Event</span>
          </div>
          <p className="text-sm text-white/80">{formatEventDate(getNextThursday8pmLisbon())}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            <img src={michaelImg} alt="Michael" className="h-10 w-10 rounded-full border-2 border-white/30 object-cover" />
            <img src={vivienImg} alt="Vivien" className="h-10 w-10 rounded-full border-2 border-white/30 object-cover" />
          </div>
          <p className="text-sm text-white/80 text-left">
            Hosted by <span className="font-medium text-white">Vivien & Michael</span>
            <br />
            <span className="text-white/60">Co-founders of Amara</span>
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="mt-12 rounded-full bg-primary px-10 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Reserve My Free Spot

        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-5 flex flex-col items-center gap-2"
        >
          <p className="text-xs text-white/50">Limited spots available</p>
          <p className="text-xs text-white/40">Join 200+ families already exploring Amara</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
