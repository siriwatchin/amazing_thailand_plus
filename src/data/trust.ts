export interface TrustTier {
  id: string;
  tier: 1 | 2 | 3 | 4;
  label: string;
  title: string;
  description: string;
  pillText: string;
  pillBg: string;
  pillText2: string;
  glowColor: string;
  accentColor: string;
  icon: string;
  stats: { label: string; value: string }[];
}

export const trustTiers: TrustTier[] = [
  {
    id: "government",
    tier: 1,
    label: "Tier 1",
    title: "Government & Authority",
    description:
      "Every route is vetted by the Tourism Authority of Thailand (TAT) and Department of National Parks (DNP). Official permits, safety codes, and accessibility data embedded in every itinerary.",
    pillText: "TAT · DNP · Tourist Police",
    pillBg: "bg-emerald-100",
    pillText2: "text-emerald-800",
    glowColor: "rgba(74,140,92,0.25)",
    accentColor: "#2D5A3D",
    icon: "ShieldCheck",
    stats: [
      { label: "Routes verified", value: "340+" },
      { label: "Provinces covered", value: "77" },
    ],
  },
  {
    id: "expert",
    tier: 2,
    label: "Tier 2",
    title: "Expert & Curator",
    description:
      "Certified guides, cultural historians, and local naturalists review every route for accuracy, cultural sensitivity, and environmental impact. No route goes live without an expert sign-off.",
    pillText: "Historians · Licensed Guides",
    pillBg: "bg-amber-100",
    pillText2: "text-amber-800",
    glowColor: "rgba(201,146,42,0.25)",
    accentColor: "#C9922A",
    icon: "BookOpen",
    stats: [
      { label: "Certified experts", value: "1,200+" },
      { label: "Cultural sites documented", value: "850+" },
    ],
  },
  {
    id: "community",
    tier: 3,
    label: "Tier 3",
    title: "Community & Verified Travelers",
    description:
      "Real travelers share real experiences. Our community rating system surfaces hidden gems, flags outdated info, and celebrates local businesses that deliver authentic Thai hospitality.",
    pillText: "Verified Traveler Reviews",
    pillBg: "bg-orange-100",
    pillText2: "text-orange-800",
    glowColor: "rgba(196,101,42,0.25)",
    accentColor: "#C4652A",
    icon: "Users",
    stats: [
      { label: "Community reviews", value: "48,000+" },
      { label: "Active travelers", value: "12,000+" },
    ],
  },
  {
    id: "ai",
    tier: 4,
    label: "Tier 4",
    title: "AI Aggregation & Moderation",
    description:
      "Our route intelligence engine synthesizes all three layers above to build a journey that matches your pace, interests, budget, and travel style — updated in real time as conditions change.",
    pillText: "AI · Cited · Fact-Checked",
    pillBg: "bg-teal-100",
    pillText2: "text-teal-800",
    glowColor: "rgba(26,138,122,0.25)",
    accentColor: "#1A8A7A",
    icon: "Sparkles",
    stats: [
      { label: "Routes generated/day", value: "3,400+" },
      { label: "Avg satisfaction score", value: "4.9/5" },
    ],
  },
];
