import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { countryCodes } from "@/data/quizData";

interface ContactScreenProps {
  totalQuestions: number;
  onSubmit: (data: { firstName: string; email: string; phone: string }) => void;
  onBack: () => void;
}

const ContactScreen = ({ totalQuestions, onSubmit, onBack }: ContactScreenProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+351");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = ((totalQuestions + 1) / (totalQuestions + 1)) * 100;

  // Auto-detect country
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzToCountry: Record<string, string> = {
        "Europe/Lisbon": "+351",
        "Europe/Paris": "+33",
        "Europe/London": "+44",
        "America/New_York": "+1",
        "America/Chicago": "+1",
        "America/Los_Angeles": "+1",
        "Europe/Berlin": "+49",
        "Europe/Madrid": "+34",
        "Europe/Rome": "+39",
        "Europe/Amsterdam": "+31",
        "Europe/Brussels": "+32",
        "Europe/Zurich": "+41",
        "Europe/Stockholm": "+46",
        "Europe/Oslo": "+47",
        "Europe/Copenhagen": "+45",
        "America/Sao_Paulo": "+55",
        "Australia/Sydney": "+61",
        "Asia/Tokyo": "+81",
        "Asia/Singapore": "+65",
      };
      if (tzToCountry[tz]) setCountryCode(tzToCountry[tz]);
    } catch {}
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Please enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 6)
      e.phone = "Please enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ firstName, email, phone: `${countryCode} ${phone}` });
    }
  };

  const selectedCountry = countryCodes.find((c) => c.code === countryCode);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[100dvh] flex-col px-6 py-8"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-xs tracking-widest text-muted-foreground">
          Almost there
        </span>
      </div>

      <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: `${((totalQuestions) / (totalQuestions + 1)) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-2 text-center text-2xl font-light md:text-3xl"
        >
          Let's stay in touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 text-center text-sm text-muted-foreground"
        >
          We'll share what's next for Amara — no spam, ever.
        </motion.p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border-b-2 border-border bg-transparent pb-2 text-base outline-none transition-colors focus:border-primary"
              placeholder="Your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-border bg-transparent pb-2 text-base outline-none transition-colors focus:border-primary"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
              Phone
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border-b-2 border-border bg-transparent pb-2 text-base outline-none transition-colors focus:border-primary"
              >
                {countryCodes.map((c) => (
                  <option key={c.code + c.country} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border-b-2 border-border bg-transparent pb-2 text-base outline-none transition-colors focus:border-primary"
                placeholder="Your phone number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-6 w-full rounded-full bg-primary py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reserve My Spot
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactScreen;
