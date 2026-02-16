export interface QuizOption {
  label: string;
  icon: string; // Lucide icon name
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What matters most to you right now?",
    options: [
      { label: "A deeper connection to nature", icon: "TreePine" },
      { label: "A community of like-minded people", icon: "Users" },
      { label: "A healthier environment for my family", icon: "Heart" },
      { label: "A place that fuels my creativity & work", icon: "Sparkles" },
    ],
  },
  {
    question: "What best describes you?",
    options: [
      { label: "Entrepreneur / Founder", icon: "Rocket" },
      { label: "Artist / Creative", icon: "Palette" },
      { label: "Family looking for a new chapter", icon: "Home" },
      { label: "Professional seeking more meaning", icon: "Compass" },
    ],
  },
  {
    question: "What's your vision for Amara?",
    options: [
      { label: "I want to live there full-time or part of the year", icon: "Sun" },
      { label: "I want a home for my family to grow into", icon: "Trees" },
      { label: "I want to create and work from an inspiring place", icon: "Lightbulb" },
      { label: "I'm mainly looking for a real estate investment", icon: "TrendingUp" },
    ],
  },
  {
    question: "What stage of life are you in?",
    options: [
      { label: "I'm in my 20s-30s, building my path", icon: "Footprints" },
      { label: "I'm in my 30s-40s, ready for a meaningful shift", icon: "ArrowUpRight" },
      { label: "I'm in my 40s-50s, designing my next chapter", icon: "PenTool" },
      { label: "I'm 60+, looking for a peaceful place to enjoy life", icon: "Leaf" },
    ],
  },
  {
    question: "Are you in a position to invest in a home within the next 12 months?",
    options: [
      { label: "Yes, I have savings or assets ready (50K€+)", icon: "CircleCheck" },
      { label: "I'm working toward it and could be ready soon", icon: "Clock" },
      { label: "Not yet, but I'm exploring for the future", icon: "Search" },
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
