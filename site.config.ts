export const siteConfig = {
  // Identity
  name: "Dry Climate Beauty",
  tagline: "Evidence-Based Beauty for Life in Dry, Hard Water Climates",
  domain: "https://dryclimatebeauty.com",
  language: "en",
  timezone: "Asia/Dubai",

  // Template variant
  variant: "healthline" as const, // "healthline" | "wirecutter"

  // Brand colors
  colors: {
    primary: "#7B5EA7",
    primaryHover: "#6A4D94",
    primaryDark: "#4E3270",
    accent: "#D4896A",
    accentHover: "#C0744F",
    text: "#2D2D2D",
    textSecondary: "#5A5A5A",
    textMuted: "#909090",
    background: "#FBF9F7",
    surface: "#F4F0EB",
    surfaceHighlight: "#F0EBF5",
    cardBackground: "#FFFFFF",
    border: "#E0D8D0",
    divider: "#EDE8E2",
    shadow: "rgba(123, 94, 167, 0.07)",
  },

  // Typography
  fonts: {
    heading: "DM Serif Display",
    body: "DM Sans",
    mono: "JetBrains Mono",
  },

  // Navigation categories
  categories: [
    {
      name: "Hair & Scalp",
      slug: "hair-scalp",
      description: "Expat hair loss, hard water damage, curly hair care, and scalp health for women living in dry climates.",
    },
    {
      name: "Skin & Body",
      slug: "skin-body",
      description: "Skin barrier repair, moisturiser guidance, sunscreen for extreme heat, and desalinated water effects on skin.",
    },
    {
      name: "Nutrition & Supplements",
      slug: "nutrition-supplements",
      description: "Vitamin D, biotin, omega-3, collagen, and hydration science. What the research actually shows.",
    },
    {
      name: "Expat Wellness",
      slug: "expat-wellness",
      description: "Stress, cortisol, climate adjustment, sleep, and the invisible health effects of relocating to a dry climate.",
    },
    {
      name: "Motherhood",
      slug: "motherhood",
      description: "Postpartum hair loss, baby skincare in hard water, toddler routines, and honest advice for exhausted parents.",
    },
    {
      name: "Ingredient Reviews",
      slug: "ingredient-reviews",
      description: "Chelating shampoos, clean beauty products, ingredient labels, and what actually works in harsh water conditions.",
    },
  ],

  // Trust signals (Healthline variant)
  trustSignals: [
    { icon: "stethoscope", text: "Medically reviewed content" },
    { icon: "award", text: "Evidence-based recommendations" },
    { icon: "users", text: "Written by climate health specialists" },
    { icon: "check", text: "Independently reviewed by Dr. Layla Hassan" },
  ],

  // Social links
  social: {
    facebook: "",
    twitter: "",
    pinterest: "",
    instagram: "",
  },

  // Affiliate disclosure
  disclosureText: "When you buy through our links, we may earn a commission. This does not influence our editorial independence or medical review process.",

  // Analytics
  analyticsId: "",
};
