export interface SafetyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  badge?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export const safetyFeatures: SafetyFeature[] = [
  {
    id: "fair-price",
    title: "Fair Price Guarantee",
    description:
      "Every vendor and experience is price-verified by local experts. No tourist markups, no hidden fees. See the fair price range before you go.",
    icon: "BadgeDollarSign",
    color: "#4A8C5C",                          // forest green — prosperity/growth
    bgColor: "rgba(74,140,92,0.07)",
    badge: "Verified Pricing",
  },
  {
    id: "scam-alerts",
    title: "Scam Pattern Library",
    description:
      "Community-curated scam patterns reviewed by Tourist Police. Tuk-tuk traps, gem shop detours, overpriced taxis — we flag the patterns so you won't fall for them.",
    icon: "AlertTriangle",
    color: "#C4652A",                          // terracotta — warning / fire
    bgColor: "rgba(196,101,42,0.07)",
    badge: "Community Powered",
  },
  {
    id: "operating-hours",
    title: "Verified Opening Hours",
    description:
      "AI-curated hours for temples, markets, and attractions. We account for Buddhist holidays, seasonal closures, and special events.",
    icon: "Clock",
    color: "#1A8A7A",                          // river teal — information/water
    bgColor: "rgba(26,138,122,0.07)",
  },
  {
    id: "tourist-police",
    title: "Tourist Police — 1155",
    description:
      "Direct line to Thailand's Tourist Police available 24/7. English, Chinese, Japanese, and Thai support. Embedded in every itinerary view.",
    icon: "Phone",
    color: "#C9922A",                          // antique gold — authority/important
    bgColor: "rgba(201,146,42,0.07)",
    badge: "24/7 Support",
    actionLabel: "Call 1155",
    actionUrl: "tel:1155",
  },
  {
    id: "emergency",
    title: "Emergency Protocols",
    description:
      "Pre-loaded hospital locations, pharmacy maps, and emergency contacts for every province. Your journey summary exports with all emergency info.",
    icon: "HeartPulse",
    color: "#8B4A2A",                          // deep earth red — emergency
    bgColor: "rgba(139,74,42,0.07)",
    badge: "77 Provinces",
  },
];
