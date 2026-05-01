export interface Route {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  creator: {
    type: "admin" | "guide" | "ai";
    label: string;
    name: string;
  };
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  highlights: string[];
  region: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  icon: string;
}

export const routes: Route[] = [
  {
    id: "phiang-ther",
    name: "Phiang Ther Trail",
    tagline: "Follow iconic series locations across Bangkok and Hua Hin.",
    badge: "Soft Power Route",
    badgeColor: "#D6447A",           // lotus pink — ชมพูบัว · drama/festival
    creator: {
      type: "ai",
      label: "AI Gen",
      name: "ATP Route Builder",
    },
    duration: "3 Days / 2 Nights",
    difficulty: "Moderate",
    highlights: [
      "Iconic filming locations",
      "Boutique beach hotels",
      "Night market food scene",
      "Behind-the-scenes guide",
    ],
    region: "Bangkok · Hua Hin",
    gradientFrom: "#8C2C50",         // deep lotus rose
    gradientTo:   "#1A2E16",         // forest dark
    accentColor:  "#D6447A",
    icon: "Star",
  },
  {
    id: "i-told-sunset-about-you",
    name: "I Told Sunset About You Phuket Trail",
    tagline: "Follow Tae and Oh-aew through Phuket Old Town, Saphan Hin, Karon, and Cape Panwa.",
    badge: "Series Location Route",
    badgeColor: "#D6447A",
    creator: {
      type: "guide",
      label: "Guide",
      name: "Phuket Film Location Guide",
    },
    duration: "3 Days / 2 Nights",
    difficulty: "Easy",
    highlights: [
      "Soi Romanee & Thalang Road",
      "Satree Phuket School",
      "Kantary Cafe at Cape Panwa",
      "Promthep Cape sunset",
    ],
    region: "Phuket",
    gradientFrom: "#8C2C50",
    gradientTo:   "#1A2E16",
    accentColor:  "#D6447A",
    icon: "Star",
  },
  {
    id: "king-naresuan",
    name: "King Naresuan Legacy Route",
    tagline: "A cited historical journey through Ayutthaya, Suphan Buri, and Phitsanulok.",
    badge: "Reviewed by Historian",
    badgeColor: "#C9922A",           // antique gold — ทองโบราณ
    creator: {
      type: "guide",
      label: "Guide",
      name: "Historian Curator",
    },
    duration: "2 Days / 1 Night",
    difficulty: "Easy",
    highlights: [
      "Wat Phra Si Sanphet",
      "Elephant Kraal",
      "Nong Sarai Battlefield",
      "Certified historian guide",
    ],
    region: "Ayutthaya · Suphan Buri",
    gradientFrom: "#8A6018",         // aged gold
    gradientTo:   "#2D5A3D",         // deep jungle
    accentColor:  "#C9922A",
    icon: "Sword",
  },
  {
    id: "national-park-passport",
    name: "National Park Passport Route",
    tagline: "Collect verified digital stamps across Thailand's national parks.",
    badge: "Verified by DNP",
    badgeColor: "#4A8C5C",           // forest canopy green
    creator: {
      type: "admin",
      label: "Admin",
      name: "TAT + DNP Team",
    },
    duration: "7 Days / 6 Nights",
    difficulty: "Hard",
    highlights: [
      "Khao Yai UNESCO site",
      "Erawan emerald pools",
      "Wild elephant sightings",
      "Digital stamp collection",
    ],
    region: "Central & Western Thailand",
    gradientFrom: "#2D5A3D",         // deep jungle
    gradientTo:   "#0F1A0D",         // forest dark
    accentColor:  "#4A8C5C",
    icon: "Stamp",
  },
];
