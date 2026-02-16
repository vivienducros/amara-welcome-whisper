export interface QuizQuestion {
  question: string;
  options: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What matters most to you right now?",
    options: [
      "A deeper connection to nature",
      "A community of like-minded people",
      "A healthier environment for my family",
      "A place that fuels my creativity & work",
    ],
  },
  {
    question: "What best describes you?",
    options: [
      "Entrepreneur / Founder",
      "Artist / Creative",
      "Family looking for a new chapter",
      "Professional seeking more meaning",
    ],
  },
  {
    question: "What's your vision for Amara?",
    options: [
      "I want to live there full-time or part of the year",
      "I want a home for my family to grow into",
      "I want to create and work from an inspiring place",
      "I'm mainly looking for a real estate investment",
    ],
  },
  {
    question: "What stage of life are you in?",
    options: [
      "I'm in my 20s-30s, building my path",
      "I'm in my 30s-40s, ready for a meaningful shift",
      "I'm in my 40s-50s, designing my next chapter",
      "I'm 60+, looking for a peaceful place to enjoy life",
    ],
  },
  {
    question: "Are you in a position to invest in a home within the next 12 months?",
    options: [
      "Yes, I have savings or assets ready (50K€+)",
      "I'm working toward it and could be ready soon",
      "Not yet, but I'm exploring for the future",
    ],
  },
];

export const countryCodes = [
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+972", country: "IL", flag: "🇮🇱" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
];
