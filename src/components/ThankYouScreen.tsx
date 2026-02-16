import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, CalendarPlus, Instagram, Check, ChevronRight } from "lucide-react";
import logoBlack from "@/assets/logo-black.png";

function getNextThursday8pmLisbon(): Date {
  const now = new Date();
  const lisbonNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Lisbon" }));
  const dayOfWeek = lisbonNow.getDay();
  let daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  if (daysUntilThursday === 0 && lisbonNow.getHours() >= 20) {
    daysUntilThursday = 7;
  }
  const target = new Date(lisbonNow);
  target.setDate(lisbonNow.getDate() + daysUntilThursday);
  target.setHours(20, 0, 0, 0);
  const lisbonStr = target.toLocaleDateString("en-CA", { timeZone: "Europe/Lisbon" });
  const utcTarget = new Date(`${lisbonStr}T20:00:00`);
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

interface ThankYouScreenProps {
  firstName: string;
}

const steps = [
  {
    icon: MessageCircle,
    title: "Join the WhatsApp Community",
    description: "Connect with other attendees and get live updates",
    cta: "Join WhatsApp",
    href: "https://amaravillage.co/whatsapp",
  },
  {
    icon: CalendarPlus,
    title: "Set a Reminder",
    description: "Add the event to your calendar so you don't miss it",
    cta: "Add to Calendar",
    isCalendar: true,
  },
  {
    icon: Instagram,
    title: "Follow Us on Instagram",
    description: "See the latest from Amara and get inspired",
    cta: "Follow on Instagram",
    href: "https://www.instagram.com/amara_nexusvillage/",
  },
];

const ThankYouScreen = ({ firstName }: ThankYouScreenProps) => {
  const [completed, setCompleted] = useState<boolean[]>([false, false, false]);
  const eventDate = getNextThursday8pmLisbon();

  useEffect(() => {
    // Re-initialize addevent widget after render
    if (typeof window !== "undefined" && (window as any).addeventatc) {
      setTimeout(() => (window as any).addeventatc.refresh(), 500);
    }
  }, []);

  const markDone = (index: number) => {
    setCompleted((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[100dvh] flex-col px-6 py-8"
    >
      {/* Header */}
      <div className="flex justify-center">
        <img src={logoBlack} alt="Amara" className="h-3.5" />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="max-w-md text-center text-2xl font-light leading-snug md:text-3xl"
        >
          {firstName}, you're in!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 max-w-sm text-center text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Your event is on <span className="font-medium text-foreground">{formatEventDate(eventDate)}</span>. Complete the steps below to confirm your access.
        </motion.p>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 w-full max-w-md space-y-4"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isDone = completed[i];

            if (step.isCalendar) {
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
                    isDone ? "border-primary/30 bg-primary/5" : "border-border bg-background"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isDone ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium md:text-base">
                      Step {i + 1}: {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  <div
                    onClick={() => markDone(i)}
                    title="Add to Calendar"
                    className="addeventatc flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
                    data-styling="none"
                    data-id="wH26263841"
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    {step.cta}
                    <ChevronRight className="h-4 w-4" />
                    <span className="addeventatc_icon" style={{ display: "none" }} />
                  </div>
                </div>
              );
            }

            return (
              <a
                key={i}
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => markDone(i)}
                className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all ${
                  isDone ? "border-primary/30 bg-primary/5" : "border-border bg-background hover:border-primary hover:bg-primary/5"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isDone ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium md:text-base">
                    Step {i + 1}: {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-primary" />
              </a>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          {completed.filter(Boolean).length}/3 steps completed
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ThankYouScreen;
