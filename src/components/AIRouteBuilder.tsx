"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProvider } from "@/lib/ai/provider";
import type { GeneratedRoute } from "@/lib/ai/types";
import { IMAGES } from "@/data/images";

const interests = ["Culture", "History", "Nature", "Food", "Adventure", "Film & Series", "Wellness"];
const durations = [1, 3, 7];

const EXAMPLE_PROMPTS = [
  "Follow the Phiang Ther series for 3 days",
  "King Naresuan history trail",
  "Nature & wildlife in Khao Yai",
  "Beaches and islands in the south",
];

export default function AIRouteBuilder() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string[]>(["Film & Series"]);
  const [days, setDays] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [route, setRoute] = useState<GeneratedRoute | null>(null);

  const toggleInterest = (i: string) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    const composedPrompt =
      prompt.trim() ||
      `${selected.join(", ")} journey across Thailand for ${days} days`;
    setRoute(null);
    setIsGenerating(true);
    try {
      const result = await getProvider().generateRoute({
        prompt: composedPrompt,
        durationDays: days,
        interests: selected,
      });
      setRoute(result);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="ai-builder" className="relative py-24 px-4 bg-page overflow-hidden">
      {/* Soft food-market atmosphere — Yaowarat at sunset */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={IMAGES.food.yaowarat}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #F5EDD6 0%, rgba(245,237,214,0.78) 25%, rgba(245,237,214,0.78) 75%, #F5EDD6 100%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-gold font-mono text-xs tracking-widest uppercase">
            Powered by AI · Grounded in Truth
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Build Your Route with AI
        </h2>
        <p className="text-ink/55 text-center mb-12 text-base md:text-lg max-w-xl mx-auto">
          Tell us your story idea, pick your pace, and our AI assembles a
          government-verified, expert-curated route — in seconds.
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT — Input panel */}
          <div className="rounded-2xl border border-gold/20 bg-surface p-6 flex flex-col gap-5 shadow-card">
            <p className="text-gold/60 font-mono text-xs opacity-80">
              // Configure your journey
            </p>

            {/* Free-form prompt */}
            <div>
              <p className="text-ink/50 text-xs uppercase tracking-widest mb-2 font-medium">
                What kind of trip?
              </p>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="e.g. Follow the Phiang Ther series across Bangkok and Hua Hin"
                className="w-full bg-page border border-gold/22 rounded-xl px-3.5 py-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/12 resize-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {EXAMPLE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="text-[11px] text-ink/45 hover:text-ink border border-ink/10 hover:border-gold/40 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="text-ink/50 text-xs uppercase tracking-widest mb-3 font-medium">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                      selected.includes(i)
                        ? "bg-earth text-surface border-earth"
                        : "border-gold/25 text-ink/50 hover:border-earth/50 hover:text-ink/70"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <p className="text-ink/50 text-xs uppercase tracking-widest mb-3 font-medium">
                Duration
              </p>
              <div className="flex gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      days === d
                        ? "bg-gold text-surface border-gold"
                        : "border-gold/25 text-ink/50 hover:border-gold/50"
                    }`}
                  >
                    {d} {d === 1 ? "Day" : "Days"}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <motion.button
              onClick={handleGenerate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-auto w-full bg-gold text-surface font-bold py-3.5 rounded-xl text-base flex items-center justify-center gap-2 hover:bg-gold-dark transition-colors shadow-card-glow"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Route…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate My Route
                </>
              )}
            </motion.button>
          </div>

          {/* RIGHT — Output panel */}
          <div className="rounded-2xl border border-gold/20 bg-surface p-6 flex flex-col min-h-[440px] relative overflow-hidden shadow-card">
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(#C9922A, transparent)" }}
            />

            <AnimatePresence mode="wait">
              {!route && !isGenerating && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center flex-1 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-earth/10 border border-earth/20 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-earth" />
                  </div>
                  <p className="text-ink/40 text-sm max-w-xs">
                    Tell us your story idea and press{" "}
                    <span className="text-gold font-medium">&ldquo;Generate My Route&rdquo;</span>{" "}
                    to assemble a verified itinerary.
                  </p>
                </motion.div>
              )}

              {isGenerating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center flex-1 gap-4"
                >
                  <div className="relative w-16 h-16">
                    <div
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{ border: "2px solid transparent", borderTopColor: "#C9922A" }}
                    />
                    <Sparkles className="absolute inset-0 m-auto w-7 h-7 text-gold opacity-70" />
                  </div>
                  <p className="text-ink/50 text-sm animate-pulse">
                    Consulting trust layers…
                  </p>
                </motion.div>
              )}

              {route && !isGenerating && (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col flex-1 gap-4"
                >
                  {/* Top badges */}
                  <div className="flex flex-wrap gap-2">
                    {route.badges.map((b) => (
                      <span
                        key={b.label}
                        className="text-[10px] px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"
                        style={{ background: `${b.color}1F`, color: b.color }}
                      >
                        <ShieldCheck className="w-3 h-3" /> {b.label}
                      </span>
                    ))}
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-gold/15 text-gold-dark">
                      Trust {route.trustScore}%
                    </span>
                  </div>

                  {/* Title + summary */}
                  <div>
                    <h3 className="font-serif text-xl text-ink leading-snug">
                      {route.title}
                    </h3>
                    <p className="text-ink/55 text-xs mt-1">
                      {route.durationDays} days · {route.region}
                    </p>
                    <p className="text-ink/65 text-sm mt-2 leading-relaxed">
                      {route.summary}
                    </p>
                  </div>

                  {/* Stops list */}
                  <div className="flex-1 overflow-y-auto max-h-72 pr-1 space-y-2">
                    {route.stops.map((s, i) => (
                      <div
                        key={s.id}
                        className="rounded-xl border border-gold/15 bg-page px-3 py-2.5"
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-surface flex-shrink-0 mt-0.5"
                            style={{ background: route.accentColor }}
                          >
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-ink">{s.name}</p>
                              <span className="text-[10px] text-ink/40 font-mono">
                                Day {s.day} · {s.region}
                              </span>
                            </div>
                            <p className="text-xs text-ink/60 leading-relaxed mt-0.5">
                              {s.story}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {s.fairPriceTHB !== undefined && s.fairPriceTHB > 0 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-canopy/12 text-canopy font-semibold">
                                  Fair ฿{s.fairPriceTHB}
                                </span>
                              )}
                              {s.safetyNote && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-earth/12 text-earth font-semibold">
                                  Safety note
                                </span>
                              )}
                              {s.citations.slice(0, 1).map((c) => (
                                <span
                                  key={c.source}
                                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                                  style={{
                                    background: `${c.trustColor}1A`,
                                    color: c.trustColor,
                                  }}
                                >
                                  ✓ {c.trustLabel}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <Link
                    href="/app"
                    className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-dark border border-gold/30 hover:border-gold/60 rounded-full px-4 py-2 transition-colors"
                  >
                    Open in app <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
