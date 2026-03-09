export const siteConfig = {
  // Identity
  name: "Gulf Health Science",
  tagline: "Where Research Meets Real-World Impact",
  domain: "https://gulfhealthscience.org",
  language: "en",
  timezone: "Asia/Dubai",

  // Template variant
  variant: "healthline" as const, // "healthline" | "wirecutter"

  // Brand colors
  colors: {
    primary: "#0d9488",
    primaryDark: "#0f766e",
    text: "#1a1a1a",
    textMuted: "#6b7280",
    background: "#ffffff",
    surface: "#f9fafb",
    border: "#e5e7eb",
  },

  // Typography
  fonts: {
    heading: "DM Serif Display",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  // Navigation categories
  categories: [
    {
      name: "Hard Water",
      slug: "hard-water",
      description: "Understanding hard water effects on hair, scalp, and skin in the Gulf region.",
      megaMenuItems: ["Effects on Hair", "Water Quality Testing", "Solutions"],
    },
    {
      name: "Hair Nutrition",
      slug: "hair-nutrition",
      description: "Evidence-based guidance on nutrients, ingredients, and dietary factors for hair health.",
      megaMenuItems: ["Essential Oils", "Vitamins", "Diet & Hair"],
    },
    {
      name: "Hair Growth",
      slug: "hair-growth",
      description: "Research-backed treatments, solutions, and products for hair growth.",
      megaMenuItems: ["Treatments", "Product Reviews", "Before & After"],
    },
    {
      name: "Scalp Health",
      slug: "scalp-health",
      description: "Scalp conditions, treatments, and maintenance for healthy hair foundations.",
      megaMenuItems: ["Dandruff", "Scalp Buildup", "Chelating Treatments"],
    },
  ],

  // Trust signals (Healthline variant)
  trustSignals: [
    { icon: "search", text: "Board-certified reviewers" },
    { icon: "award", text: "Evidence-based content" },
    { icon: "users", text: "Trusted by thousands" },
    { icon: "check", text: "Independently reviewed" },
  ],

  // Social links
  social: {
    facebook: "",
    twitter: "",
    pinterest: "",
    instagram: "",
  },

  // Affiliate disclosure
  disclosureText: "When you buy through our links, we may earn a commission. This does not influence our editorial independence.",

  // Analytics
  analyticsId: "",
};
