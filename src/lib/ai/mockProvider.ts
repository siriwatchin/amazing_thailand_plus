import type {
  AIProvider,
  Citation,
  GeneratedRoute,
  GeneratedStop,
  GuideAnswer,
  RouteRequest,
  TrustTierId,
} from "./types";
import { trustTiers } from "@/data/trust";
import { passportStamps } from "@/data/passport";

// ── Citation helpers ─────────────────────────────────────────────────────────

const CITATION_LIBRARY: Record<TrustTierId, { source: string; trustLabel: string }[]> = {
  government: [
    { source: "TAT Price Database · 2025", trustLabel: "TAT Verified" },
    { source: "Tourist Police Division 3", trustLabel: "Police Verified" },
    { source: "Department of National Parks", trustLabel: "DNP Verified" },
    { source: "Ministry of Culture · Thailand", trustLabel: "Gov Verified" },
  ],
  expert: [
    { source: "Fine Arts Department · Royal Institute", trustLabel: "Historian Reviewed" },
    { source: "Buddhist Association of Thailand", trustLabel: "Cultural Expert" },
    { source: "Dr. Kasem Wongsa · Ayutthaya Studies", trustLabel: "Historian Reviewed" },
    { source: "Thai Hotels Association", trustLabel: "Industry Expert" },
  ],
  community: [
    { source: "48,000+ verified traveler reviews", trustLabel: "Community Verified" },
    { source: "Local partner network · 850 sites", trustLabel: "Partner Verified" },
  ],
  ai: [
    { source: "Cross-checked across all tiers", trustLabel: "AI · Cited" },
  ],
};

function tierMeta(id: TrustTierId) {
  const t = trustTiers.find((tier) => tier.id === id);
  if (!t) throw new Error(`Unknown tier: ${id}`);
  return t;
}

function pickCitation(tierId: TrustTierId, seed: number): Citation {
  const tier = tierMeta(tierId);
  const lib = CITATION_LIBRARY[tierId];
  const pick = lib[seed % lib.length];
  return {
    source: pick.source,
    tier: tierId,
    trustLabel: pick.trustLabel,
    trustColor: tier.accentColor,
  };
}

// ── Tiny seeded shuffle so output varies per call but is deterministic ────────

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pseudoShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ── Theme detection from free-form prompt ────────────────────────────────────

type Theme =
  | "drama"
  | "history"
  | "nature"
  | "beach"
  | "food"
  | "culture"
  | "adventure";

const THEME_KEYWORDS: Record<Theme, string[]> = {
  drama:    ["phiang", "series", "drama", "film", "movie", "soap", "k-drama", "show"],
  history:  ["history", "naresuan", "ayutthaya", "sukhothai", "ancient", "kingdom", "ruin", "war", "battle"],
  nature:   ["nature", "park", "mountain", "jungle", "forest", "wildlife", "elephant", "khao yai", "doi", "trek"],
  beach:    ["beach", "phuket", "samui", "krabi", "phi phi", "island", "sea", "snorkel", "dive"],
  food:     ["food", "eat", "street food", "market", "chinatown", "yaowarat", "pad thai", "som tum"],
  culture:  ["temple", "wat", "monk", "buddhist", "culture", "festival", "tradition", "songkran", "loi krathong"],
  adventure:["adventure", "raft", "climb", "zipline", "off-road", "hike", "kayak"],
};

function detectThemes(prompt: string): Theme[] {
  const p = prompt.toLowerCase();
  const matched: Theme[] = [];
  for (const [theme, keys] of Object.entries(THEME_KEYWORDS) as [Theme, string[]][]) {
    if (keys.some((k) => p.includes(k))) matched.push(theme);
  }
  return matched.length ? matched : ["culture"];
}

function detectDuration(prompt: string, fallback?: number): number {
  const m = prompt.match(/(\d+)\s*(day|days|d)\b/i);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= 14) return n;
  }
  return fallback ?? 3;
}

// ── Stop library — drawn loosely from passport stamps + extra spots ──────────

interface StopTemplate {
  name: string;
  region: string;
  themes: Theme[];
  story: string;
  fairPriceTHB?: number;
  touristPriceTHB?: number;
  safetyNote?: string;
  stampId?: string;
}

const STOP_LIBRARY: StopTemplate[] = [
  {
    name: "Grand Palace",
    region: "Bangkok",
    themes: ["culture", "history"],
    story: "The 18th-century royal residence and home of the Emerald Buddha. Dress code strictly enforced — sarongs available at the entrance.",
    fairPriceTHB: 500,
    safetyNote: "Beware of touts at the gate claiming the palace is closed — official entry is from Na Phra Lan Road only.",
    stampId: "grand-palace",
  },
  {
    name: "Wat Pho",
    region: "Bangkok",
    themes: ["culture"],
    story: "Home of the 46-metre reclining Buddha and the spiritual birthplace of traditional Thai massage.",
    fairPriceTHB: 300,
  },
  {
    name: "Yaowarat (Chinatown)",
    region: "Bangkok",
    themes: ["food", "culture"],
    story: "Bangkok's culinary heart since 1782 — best after sunset when the street stalls open. Look for high-turnover stalls.",
    fairPriceTHB: 150,
    touristPriceTHB: 350,
  },
  {
    name: "Samyan Filming District",
    region: "Bangkok",
    themes: ["drama"],
    story: "Used as backdrop in dozens of Thai series. The cafe in Episode 4 of Phiang Ther sits 80 metres from Samyan MRT exit 2.",
    fairPriceTHB: 120,
  },
  {
    name: "Ayutthaya Historical Park",
    region: "Ayutthaya",
    themes: ["history", "culture"],
    story: "UNESCO-listed capital of Siam from 1351 to 1767. Wat Phra Si Sanphet's three chedis hold the ashes of three kings.",
    fairPriceTHB: 220,
    safetyNote: "Park is patrolled by Tourist Police until 21:00. Avoid unlit riverside paths after dark.",
    stampId: "ayutthaya",
  },
  {
    name: "Nong Sarai Battlefield",
    region: "Suphan Buri",
    themes: ["history"],
    story: "Site of the 1593 elephant duel where King Naresuan slew the Burmese Crown Prince Mingyi Swa, securing Siam's independence.",
    fairPriceTHB: 0,
  },
  {
    name: "Hua Hin Railway Station",
    region: "Hua Hin",
    themes: ["drama", "culture"],
    story: "Built in 1911 in Victorian style with the royal waiting pavilion still intact. Featured in numerous Thai film scenes.",
    fairPriceTHB: 0,
  },
  {
    name: "Mrigadayavan Palace",
    region: "Hua Hin",
    themes: ["drama", "history"],
    story: "King Rama VI's seaside palace of love and hope, built entirely of teak in 1923 — auto-booking handles royal permit.",
    fairPriceTHB: 100,
  },
  {
    name: "Doi Suthep",
    region: "Chiang Mai",
    themes: ["culture", "nature"],
    story: "Mountaintop temple with a relic of the Buddha, said to have been chosen by a wandering white elephant in 1383.",
    fairPriceTHB: 50,
    stampId: "doi-suthep",
  },
  {
    name: "Pai Canyon",
    region: "Mae Hong Son",
    themes: ["nature", "adventure"],
    story: "Red-earth ridges carved by erosion — sunset viewpoint draws backpackers; narrow paths require good shoes.",
    fairPriceTHB: 0,
    safetyNote: "Some paths are unfenced — stay on the marked routes especially in low light.",
    stampId: "pai-canyon",
  },
  {
    name: "Khao Yai National Park",
    region: "Nakhon Ratchasima",
    themes: ["nature", "adventure"],
    story: "Thailand's first national park, UNESCO listed. Wild elephants frequently cross the main road at dusk.",
    fairPriceTHB: 400,
    safetyNote: "Do not approach elephants on the road. Stay in the vehicle until rangers signal it is safe.",
    stampId: "khao-yai",
  },
  {
    name: "Erawan Falls",
    region: "Kanchanaburi",
    themes: ["nature"],
    story: "Seven-tiered emerald waterfall named after the three-headed elephant of Hindu mythology.",
    fairPriceTHB: 300,
    stampId: "erawan",
  },
  {
    name: "Phi Phi Islands",
    region: "Krabi",
    themes: ["beach"],
    story: "Limestone karsts and turquoise lagoons. Maya Bay reopened with strict daily visitor caps to allow reef recovery.",
    fairPriceTHB: 1200,
    touristPriceTHB: 2500,
    stampId: "phi-phi",
  },
  {
    name: "Phuket Old Town",
    region: "Phuket",
    themes: ["culture", "food"],
    story: "Sino-Portuguese shophouses lining Thalang Road — Sunday walking street is the best primer to the local heritage.",
    fairPriceTHB: 0,
    stampId: "phuket-old",
  },
  {
    name: "Sukhothai Historical Park",
    region: "Sukhothai",
    themes: ["history", "culture"],
    story: "The 13th-century Siamese capital where the Thai script was born. Cycle the park at dawn for empty grounds.",
    fairPriceTHB: 100,
    stampId: "sukhothai",
  },
  {
    name: "Floating Market · Damnoen Saduak",
    region: "Damnoen Saduak",
    themes: ["culture", "food"],
    story: "Long-tail boats laden with fruits and noodle stalls — best before 09:00 before the tour buses arrive.",
    fairPriceTHB: 150,
    touristPriceTHB: 400,
    stampId: "floating-mkt",
  },
  {
    name: "Koh Samui Sunset Point",
    region: "Surat Thani",
    themes: ["beach"],
    story: "Lad Koh viewpoint over the Gulf of Thailand — the sunset draws photographers from across the island.",
    fairPriceTHB: 0,
    stampId: "koh-samui",
  },
  {
    name: "Chiang Rai Night Bazaar",
    region: "Chiang Rai",
    themes: ["food", "culture"],
    story: "Hill-tribe handicrafts, Northern-style khao soi, and live music every evening on the central stage.",
    fairPriceTHB: 200,
    touristPriceTHB: 500,
    stampId: "night-bazaar",
  },
];

function selectStops(themes: Theme[], days: number, prompt: string): StopTemplate[] {
  const themeSet = new Set(themes);
  const scored = STOP_LIBRARY.map((s) => ({
    stop: s,
    score: s.themes.filter((t) => themeSet.has(t)).length,
  }));
  // Keep matches first; pad with others if needed.
  const matches = scored.filter((x) => x.score > 0);
  const others  = scored.filter((x) => x.score === 0);
  const ordered = [
    ...pseudoShuffle(matches, hashString(prompt)).sort((a, b) => b.score - a.score),
    ...pseudoShuffle(others,  hashString(prompt) + 7),
  ].map((x) => x.stop);

  const stopCount = Math.min(Math.max(days + 1, 4), 7);
  return ordered.slice(0, stopCount);
}

// ── generateRoute ─────────────────────────────────────────────────────────────

function buildRoute(req: RouteRequest): GeneratedRoute {
  const themes = detectThemes(req.prompt);
  const days   = detectDuration(req.prompt, req.durationDays);
  const stops  = selectStops(themes, days, req.prompt);

  const seed = hashString(req.prompt + days);
  const primaryTheme = themes[0];

  const themeAccent: Record<Theme, { from: string; to: string; accent: string; title: string }> = {
    drama:     { from: "#6B3A1A", to: "#0F1A0D", accent: "#C4742A", title: "Series Trail" },
    history:   { from: "#8A6018", to: "#2D5A3D", accent: "#C9922A", title: "Legacy Route" },
    nature:    { from: "#2D5A3D", to: "#0F1A0D", accent: "#4A8C5C", title: "Wilderness Loop" },
    beach:     { from: "#1A8A7A", to: "#0F1A2E", accent: "#1A8A7A", title: "Coastline Drift" },
    food:      { from: "#C4652A", to: "#6B3A1A", accent: "#C4652A", title: "Flavour Path" },
    culture:   { from: "#8A6018", to: "#1A2E16", accent: "#C9922A", title: "Heritage Route" },
    adventure: { from: "#8C3D14", to: "#0F1A0D", accent: "#B5511F", title: "Frontier Run" },
  };
  const palette = themeAccent[primaryTheme];

  const generatedStops: GeneratedStop[] = stops.map((s, i) => {
    const day = Math.min(days, Math.floor(i / Math.ceil(stops.length / days)) + 1);
    const tierMix: TrustTierId[] = ["government", "expert", "community"];
    const cite1 = pickCitation(tierMix[i % tierMix.length], seed + i);
    const cite2 = pickCitation(i % 2 === 0 ? "expert" : "community", seed + i + 1);
    return {
      id: `stop-${i}-${s.name.replace(/\W+/g, "-").toLowerCase()}`,
      day,
      name: s.name,
      region: s.region,
      story: s.story,
      fairPriceTHB: s.fairPriceTHB,
      touristPriceTHB: s.touristPriceTHB,
      safetyNote: s.safetyNote,
      stampId: s.stampId,
      citations: [cite1, cite2],
    };
  });

  const regions = Array.from(new Set(generatedStops.map((s) => s.region)));
  const titlePrompt = req.prompt.trim().split(/\s+/).slice(0, 4).join(" ");
  const title = titlePrompt
    ? `${titlePrompt.replace(/^./, (c) => c.toUpperCase())} · ${palette.title}`
    : `Thailand ${palette.title}`;

  return {
    id: `route-${seed}`,
    title,
    summary: `A ${days}-day ${primaryTheme} journey across ${regions.slice(0, 3).join(" → ")}, hand-assembled from verified sources at every stop.`,
    durationDays: days,
    region: regions.slice(0, 3).join(" · "),
    accentColor: palette.accent,
    gradientFrom: palette.from,
    gradientTo: palette.to,
    trustScore: 95 + (seed % 5),
    stops: generatedStops,
    badges: [
      { label: "TAT Verified",       color: "#4A8C5C" },
      { label: "Historian Reviewed", color: "#C9922A" },
      { label: "AI · Cited",         color: "#1A8A7A" },
    ],
  };
}

// ── askGuide ──────────────────────────────────────────────────────────────────

interface QATemplate {
  match: RegExp;
  tier: TrustTierId;
  answer: string;
  confidence: GuideAnswer["confidence"];
}

const QA_LIBRARY: QATemplate[] = [
  {
    match: /tuk[\s-]?tuk|tuktuk/i,
    tier: "government",
    confidence: "high",
    answer:
      "Fair price: ฿80–120 for short hops in central Bangkok, ฿400–500 from Suvarnabhumi to the city. Always agree the fare before boarding. Metered taxis usually run cheaper.",
  },
  {
    match: /(taxi|grab)/i,
    tier: "government",
    confidence: "high",
    answer:
      "Metered taxis must run the meter — say 'meter, please' (mee-ter, krap/ka). Expect ฿35 flagfall plus ฿6.5/km. Bolt and Grab are reliable digital alternatives.",
  },
  {
    match: /(temple|wat|etiquette|dress code)/i,
    tier: "expert",
    confidence: "high",
    answer:
      "Cover shoulders and knees — sarongs are usually loaned at the entrance. Remove shoes before entering any building. Never point your feet toward a Buddha image. Speak softly and silence your phone.",
  },
  {
    match: /(naresuan|elephant duel|burmese)/i,
    tier: "expert",
    confidence: "high",
    answer:
      "King Naresuan the Great (1555–1605) reclaimed Siamese independence from the Burmese Toungoo dynasty. His 1593 elephant duel against Crown Prince Mingyi Swa at Nong Sarai is commemorated every January 18th as Royal Thai Armed Forces Day.",
  },
  {
    match: /(ayutthaya).*(safe|night|dark)|night.*ayutthaya/i,
    tier: "government",
    confidence: "high",
    answer:
      "Ayutthaya Historical Park is well-lit and patrolled by Tourist Police until 21:00. Stay near the central temple complex. Avoid unlit riverside paths after dark.",
  },
  {
    match: /(scam|tourist trap|gem|tailor)/i,
    tier: "government",
    confidence: "high",
    answer:
      "Common Bangkok scams: 'palace closed today' (it isn't — verify on the official site), gem-shop detours via tuk-tuk, and 'free' tailor consultations. Never let a tuk-tuk reroute you to a shop.",
  },
  {
    match: /(food|eat|street food|pad thai|som tum|yaowarat)/i,
    tier: "community",
    confidence: "high",
    answer:
      "Yaowarat (Chinatown) after sunset is the gold standard. Thip Samai on Mahachai Rd is the legendary pad thai. Look for stalls with high turnover — busy queues mean fresh food.",
  },
  {
    match: /(elephant|sanctuary|riding)/i,
    tier: "expert",
    confidence: "high",
    answer:
      "Avoid riding camps. Ethical sanctuaries observe elephants in semi-wild settings — Elephant Nature Park (Chiang Mai) and BLES (Sukhothai) are widely recognised by welfare experts.",
  },
  {
    match: /(emergency|hospital|police|medical|ambulance)/i,
    tier: "government",
    confidence: "high",
    answer:
      "Tourist Police 1155 (English/Chinese/Japanese/Thai). Medical 1669. All major cities have international-standard hospitals; Bumrungrad and BNH in Bangkok are the highest-rated.",
  },
  {
    match: /(visa|passport|stay|extend)/i,
    tier: "government",
    confidence: "medium",
    answer:
      "Most Western passports get 30 days visa-exempt entry. Extensions are processed at any Immigration Office for ฿1,900 — bring your passport, departure card, and one photo.",
  },
];

const FALLBACK_TEMPLATE = (q: string) =>
  `I don't have a high-confidence answer cached for that question. Based on cross-tier sources I'd suggest: rephrase with a specific place, time, or price you want verified — e.g. "fair tuk-tuk price in Chinatown at night" — and I'll route the query through TAT and community datasets.\n\nIn production, this question would be passed to the retrieval engine and answered with cited sources only — never invented.`;

function buildGuideAnswer(question: string): GuideAnswer {
  const hit = QA_LIBRARY.find((qa) => qa.match.test(question));
  const seed = hashString(question);

  if (hit) {
    const primary = pickCitation(hit.tier, seed);
    const secondary = pickCitation(hit.tier === "expert" ? "community" : "expert", seed + 1);
    return {
      question,
      answer: hit.answer,
      confidence: hit.confidence,
      citations: [primary, secondary],
      primaryTrust: primary,
    };
  }

  const primary = pickCitation("ai", seed);
  return {
    question,
    answer: FALLBACK_TEMPLATE(question),
    confidence: "low",
    citations: [primary],
    primaryTrust: primary,
  };
}

// ── Latency wrapper — keeps the existing typing/loading animations alive ─────

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

// ── Provider implementation ──────────────────────────────────────────────────

export const mockProvider: AIProvider = {
  async generateRoute(req) {
    return delay(buildRoute(req), 900 + (hashString(req.prompt) % 400));
  },
  async askGuide(question) {
    return delay(buildGuideAnswer(question), 700 + (hashString(question) % 400));
  },
};

// Re-export for external use; suppresses unused warning on `passportStamps`.
export const _passportStampIds = passportStamps.map((s) => s.id);
