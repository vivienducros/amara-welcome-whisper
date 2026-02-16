import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { countryCodes } from "@/data/quizData";

interface ContactScreenProps {
  totalQuestions: number;
  onSubmit: (data: { firstName: string; email: string; phone: string }) => void;
  onBack: () => void;
}

const ContactScreen = ({ totalQuestions, onSubmit, onBack }: ContactScreenProps) => {
  const [step, setStep] = useState(0); // 0=name, 1=email, 2=phone
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+351");
  const [error, setError] = useState("");

  const totalSteps = totalQuestions + 3; // quiz questions + 3 contact steps
  const currentStep = totalQuestions + step + 1;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzToCountry: Record<string, string> = {
        "Europe/Lisbon": "+351", "Europe/Paris": "+33", "Europe/London": "+44",
        "America/New_York": "+1", "America/Chicago": "+1", "America/Los_Angeles": "+1",
        "Europe/Berlin": "+49", "Europe/Madrid": "+34", "Europe/Rome": "+39",
        "Europe/Amsterdam": "+31", "Europe/Brussels": "+32", "Europe/Zurich": "+41",
        "Europe/Stockholm": "+46", "Europe/Oslo": "+47", "Europe/Copenhagen": "+45",
        "America/Sao_Paulo": "+55", "Australia/Sydney": "+61", "Asia/Tokyo": "+81",
        "Asia/Singapore": "+65",
      };
      if (tzToCountry[tz]) setCountryCode(tzToCountry[tz]);
    } catch {}
  }, []);

  const handleBack = () => {
    setError("");
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleNext = () => {
    setError("");
    if (step === 0) {
      if (!firstName.trim()) { setError("Please enter your name"); return; }
      setStep(1);
    } else if (step === 1) {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email"); return;
      }
      setStep(2);
    } else {
      if (!phone.trim() || phone.replace(/\D/g, "").length < 6) {
        setError("Please enter a valid phone number"); return;
      }
      onSubmit({ firstName: firstName.trim(), email: email.trim(), phone: `${countryCode} ${phone.trim()}` });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); handleNext(); }
  };

  const stepLabels = ["What's your first name?", "What's your email?", "What's your phone number?"];
  const stepSubtitles = [
    "So we know who we're talking to.",
    "We'll send you what's next for Amara.",
    "For a personal welcome — no calls unless you ask.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[100dvh] flex-col px-6 py-8"
    >
      <div className="flex items-center justify-between">
        <button onClick={handleBack} className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-xs tracking-widest text-muted-foreground">Almost there</span>
      </div>

      <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="flex w-full max-w-sm flex-col items-center"
          >
            <h2 className="mb-2 text-center text-2xl font-light md:text-3xl">
              {stepLabels[step]}
            </h2>
            <p className="mb-10 text-center text-sm text-muted-foreground">
              {stepSubtitles[step]}
            </p>

            {step === 0 && (
              <input
                autoFocus
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-b-2 border-border bg-transparent pb-3 text-center text-xl outline-none transition-colors focus:border-primary"
                placeholder="Your first name"
                maxLength={100}
              />
            )}

            {step === 1 && (
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-b-2 border-border bg-transparent pb-3 text-center text-xl outline-none transition-colors focus:border-primary"
                placeholder="your@email.com"
                maxLength={255}
              />
            )}

            {step === 2 && (
              <div className="flex w-full gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border-b-2 border-border bg-transparent pb-3 text-base outline-none transition-colors focus:border-primary"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code + c.country} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  autoFocus
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border-b-2 border-border bg-transparent pb-3 text-center text-xl outline-none transition-colors focus:border-primary"
                  placeholder="912 345 678"
                  maxLength={20}
                />
              </div>
            )}

            {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="mt-10 w-full rounded-full bg-primary py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {step < 2 ? "Continue" : "Reserve My Spot"}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactScreen;
