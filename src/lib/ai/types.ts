// Shared types for the AI provider layer.
// Components consume these — never the concrete provider.

export type TrustTierId = "government" | "expert" | "community" | "ai";

export interface Citation {
  source: string;
  tier: TrustTierId;
  trustLabel: string;
  trustColor: string;
}

export interface RouteRequest {
  prompt: string;
  durationDays?: number;
  interests?: string[];
  budget?: "low" | "mid" | "high";
}

export interface GeneratedStop {
  id: string;
  day: number;
  name: string;
  region: string;
  story: string;
  fairPriceTHB?: number;
  touristPriceTHB?: number;
  safetyNote?: string;
  stampId?: string;
  citations: Citation[];
}

export interface GeneratedRoute {
  id: string;
  title: string;
  summary: string;
  creator: {
    type: "admin" | "guide" | "ai";
    label: string;
    name: string;
  };
  durationDays: number;
  region: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  trustScore: number;
  stops: GeneratedStop[];
  badges: { label: string; color: string }[];
}

export interface GuideAnswer {
  question: string;
  answer: string;
  confidence: "high" | "medium" | "low";
  citations: Citation[];
  primaryTrust: Citation;
}

export interface AIProvider {
  generateRoute(req: RouteRequest): Promise<GeneratedRoute>;
  askGuide(question: string): Promise<GuideAnswer>;
}
