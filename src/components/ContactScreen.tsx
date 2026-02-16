import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { countryCodes as defaultCountryCodes } from "@/data/quizData";

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
  const [detectedCode, setDetectedCode] = useState<{ code: string; country: string; flag: string } | null>(null);
  const [error, setError] = useState("");

  const totalSteps = totalQuestions + 3;
  const currentStep = totalQuestions + step + 1;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzToCountry: Record<string, { code: string; country: string; flag: string }> = {
        "Europe/Lisbon": { code: "+351", country: "PT", flag: "🇵🇹" },
        "Europe/Paris": { code: "+33", country: "FR", flag: "🇫🇷" },
        "Europe/London": { code: "+44", country: "GB", flag: "🇬🇧" },
        "America/New_York": { code: "+1", country: "US", flag: "🇺🇸" },
        "America/Chicago": { code: "+1", country: "US", flag: "🇺🇸" },
        "America/Los_Angeles": { code: "+1", country: "US", flag: "🇺🇸" },
        "America/Denver": { code: "+1", country: "US", flag: "🇺🇸" },
        "Europe/Berlin": { code: "+49", country: "DE", flag: "🇩🇪" },
        "Europe/Madrid": { code: "+34", country: "ES", flag: "🇪🇸" },
        "Europe/Rome": { code: "+39", country: "IT", flag: "🇮🇹" },
        "Europe/Amsterdam": { code: "+31", country: "NL", flag: "🇳🇱" },
        "Europe/Brussels": { code: "+32", country: "BE", flag: "🇧🇪" },
        "Europe/Zurich": { code: "+41", country: "CH", flag: "🇨🇭" },
        "Europe/Stockholm": { code: "+46", country: "SE", flag: "🇸🇪" },
        "Europe/Oslo": { code: "+47", country: "NO", flag: "🇳🇴" },
        "Europe/Copenhagen": { code: "+45", country: "DK", flag: "🇩🇰" },
        "Europe/Vienna": { code: "+43", country: "AT", flag: "🇦🇹" },
        "Europe/Warsaw": { code: "+48", country: "PL", flag: "🇵🇱" },
        "America/Sao_Paulo": { code: "+55", country: "BR", flag: "🇧🇷" },
        "America/Argentina/Buenos_Aires": { code: "+54", country: "AR", flag: "🇦🇷" },
        "America/Mexico_City": { code: "+52", country: "MX", flag: "🇲🇽" },
        "America/Bogota": { code: "+57", country: "CO", flag: "🇨🇴" },
        "America/Santiago": { code: "+56", country: "CL", flag: "🇨🇱" },
        "Australia/Sydney": { code: "+61", country: "AU", flag: "🇦🇺" },
        "Asia/Tokyo": { code: "+81", country: "JP", flag: "🇯🇵" },
        "Asia/Singapore": { code: "+65", country: "SG", flag: "🇸🇬" },
        "Asia/Shanghai": { code: "+86", country: "CN", flag: "🇨🇳" },
        "Asia/Kolkata": { code: "+91", country: "IN", flag: "🇮🇳" },
        "Asia/Dubai": { code: "+971", country: "AE", flag: "🇦🇪" },
        "Asia/Jerusalem": { code: "+972", country: "IL", flag: "🇮🇱" },
        "Africa/Johannesburg": { code: "+27", country: "ZA", flag: "🇿🇦" },
        "Pacific/Auckland": { code: "+64", country: "NZ", flag: "🇳🇿" },
        "America/Toronto": { code: "+1", country: "CA", flag: "🇨🇦" },
        "America/Vancouver": { code: "+1", country: "CA", flag: "🇨🇦" },
        "Europe/Dublin": { code: "+353", country: "IE", flag: "🇮🇪" },
        "Europe/Helsinki": { code: "+358", country: "FI", flag: "🇫🇮" },
        "Europe/Athens": { code: "+30", country: "GR", flag: "🇬🇷" },
        "Europe/Bucharest": { code: "+40", country: "RO", flag: "🇷🇴" },
        "Europe/Prague": { code: "+420", country: "CZ", flag: "🇨🇿" },
        "Europe/Budapest": { code: "+36", country: "HU", flag: "🇭🇺" },
        "Asia/Seoul": { code: "+82", country: "KR", flag: "🇰🇷" },
        "Asia/Bangkok": { code: "+66", country: "TH", flag: "🇹🇭" },
      };
      const match = tzToCountry[tz];
      if (match) {
        setCountryCode(match.code);
        // If this country isn't in the default list, store it to add
        const exists = defaultCountryCodes.some(c => c.code === match.code && c.country === match.country);
        if (!exists) {
          setDetectedCode(match);
        }
      }
    } catch {}
  }, []);

  const countryCodes = useMemo(() => {
    if (detectedCode && !defaultCountryCodes.some(c => c.code === detectedCode.code && c.country === detectedCode.country)) {
      return [detectedCode, ...defaultCountryCodes];
    }
    return defaultCountryCodes;
  }, [detectedCode]);

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
    "We'll send you the event link and details.",
    "We'll text you a reminder before the event. No sales calls.",
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

            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Your info stays private. No spam, ever.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactScreen;
