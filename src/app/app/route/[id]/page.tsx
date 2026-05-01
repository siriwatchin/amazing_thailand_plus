"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  ShieldCheck,
  ShieldAlert,
  Stamp as StampIcon,
  Phone,
  Check,
  X,
} from "lucide-react";
import { routes, type Route } from "@/data/routes";
import { passportStamps } from "@/data/passport";
import { getProvider } from "@/lib/ai/provider";
import type { GeneratedRoute, GeneratedStop } from "@/lib/ai/types";
import { useLocalStorage } from "@/lib/useLocalStorage";

const PASSPORT_STORAGE_KEY = "atp_collected_stamps";

function ROUTE_PROMPTS(r: Route): string {
  switch (r.id) {
    case "phiang-ther":
      return "Follow the Phiang Ther series across Bangkok and Hua Hin for 3 days";
    case "king-naresuan":
      return "King Naresuan history trail from Ayutthaya to Suphan Buri for 2 days";
    case "national-park-passport":
      return "National park nature loop across Khao Yai and Erawan for 7 days";
    default:
      return `${r.name} · ${r.region} · ${r.duration}`;
  }
}

export default function RouteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const baseRoute = useMemo(
    () => routes.find((r) => r.id === params.id),
    [params.id],
  );

  const [generated, setGenerated] = useState<GeneratedRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [audioStop, setAudioStop] = useState<GeneratedStop | null>(null);
  const [collectedIds, setCollectedIds] = useLocalStorage<string[]>(
    PASSPORT_STORAGE_KEY,
    passportStamps.filter((s) => s.collected).map((s) => s.id),
  );
  const [justCollectedId, setJustCollectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!baseRoute) return;
    let cancelled = false;
    setLoading(true);
    getProvider()
      .generateRoute({
        prompt: ROUTE_PROMPTS(baseRoute),
        durationDays: parseInt(baseRoute.duration, 10) || 3,
      })
      .then((r) => {
        if (cancelled) return;
        setGenerated(r);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [baseRoute]);

  if (!baseRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink mb-2">Route not found</p>
          <button
            onClick={() => router.push("/app")}
            className="text-sm text-gold hover:text-gold-dark"
          >
            ← Back to app
          </button>
        </div>
      </div>
    );
  }

  const collectedSet = new Set(collectedIds);
  const collectableStops = generated?.stops.filter((s) => s.stampId) ?? [];
  const stopsCollectedCount = collectableStops.filter((s) =>
    collectedSet.has(s.stampId!),
  ).length;

  const collectStamp = (id: string) => {
    if (collectedSet.has(id)) return;
    setCollectedIds([...collectedIds, id]);
    setJustCollectedId(id);
    setTimeout(() => setJustCollectedId(null), 1800);
  };

  return (
    <div className="min-h-screen bg-page pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-gold/15">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/app"
            className="p-2 -ml-2 rounded-lg hover:bg-ink/5 text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <p className="font-serif text-base text-ink truncate">
            {baseRoute.name}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6">
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden border border-gold/20 shadow-card mb-6"
        >
          <div
            className="px-6 py-7 md:px-8 md:py-9 relative"
            style={{
              background: `linear-gradient(135deg, ${baseRoute.gradientFrom}, ${baseRoute.gradientTo})`,
            }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `${baseRoute.accentColor}28`,
                  color: baseRoute.accentColor,
                }}
              >
                {baseRoute.badge}
              </span>
              {generated && (
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-surface/15 text-surface">
                  Trust {generated.trustScore}%
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-surface leading-tight">
              {baseRoute.name}
            </h1>
            <p className="text-surface/70 text-sm md:text-base mt-2 max-w-2xl">
              {baseRoute.tagline}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-surface/60 text-xs font-mono">
              <span>{baseRoute.duration}</span>
              <span>·</span>
              <span>{baseRoute.region}</span>
              <span>·</span>
              <span>{baseRoute.difficulty}</span>
            </div>
          </div>

          {/* Progress strip */}
          <div className="bg-surface px-6 md:px-8 py-4 border-t border-gold/15">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink/45">
                  Stamps available on this route
                </p>
                <p className="font-serif text-lg text-ink mt-0.5">
                  {stopsCollectedCount} of {collectableStops.length} collected
                </p>
              </div>
              <Link
                href="/app"
                className="text-xs font-semibold text-gold hover:text-gold-dark border border-gold/30 hover:border-gold/60 rounded-full px-3.5 py-1.5 transition-colors"
              >
                View passport
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="relative w-12 h-12">
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{ border: "2px solid transparent", borderTopColor: "#C9922A" }}
              />
            </div>
            <p className="text-ink/45 text-sm animate-pulse">
              Assembling itinerary from verified sources…
            </p>
          </div>
        )}

        {/* Stops */}
        {generated && !loading && (
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-widest text-ink/45 mt-2 mb-1">
              Itinerary · {generated.stops.length} stops
            </p>
            {generated.stops.map((stop, i) => {
              const stamp = stop.stampId
                ? passportStamps.find((s) => s.id === stop.stampId)
                : null;
              const isCollected = stamp ? collectedSet.has(stamp.id) : false;
              return (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-gold/15 bg-surface shadow-card overflow-hidden"
                >
                  <div className="flex">
                    {/* Day rail */}
                    <div
                      className="w-14 flex-shrink-0 flex flex-col items-center justify-start py-5 text-surface"
                      style={{
                        background: `linear-gradient(180deg, ${baseRoute.gradientFrom}, ${baseRoute.gradientTo})`,
                      }}
                    >
                      <p className="text-[9px] uppercase tracking-widest opacity-60">Day</p>
                      <p className="font-serif text-2xl font-bold leading-none mt-0.5">
                        {stop.day}
                      </p>
                      <div className="mt-3 w-7 h-7 rounded-full bg-surface/15 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-ink/45">
                            {stop.region}
                          </p>
                          <h3 className="font-serif text-xl text-ink leading-snug mt-0.5">
                            {stop.name}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stop.citations.slice(0, 1).map((c) => (
                            <span
                              key={c.source}
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                              style={{
                                background: `${c.trustColor}1A`,
                                color: c.trustColor,
                              }}
                            >
                              <ShieldCheck className="w-3 h-3" /> {c.trustLabel}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-ink/70 text-sm leading-relaxed mt-2">
                        {stop.story}
                      </p>

                      {/* Per-stop pills row */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {stop.fairPriceTHB !== undefined && stop.fairPriceTHB > 0 && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-canopy/12 text-canopy font-semibold">
                            Fair ฿{stop.fairPriceTHB}
                            {stop.touristPriceTHB
                              ? ` · tourist ฿${stop.touristPriceTHB}`
                              : ""}
                          </span>
                        )}
                        {stop.safetyNote && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-earth/12 text-earth font-semibold flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" /> Safety note
                          </span>
                        )}
                      </div>

                      {stop.safetyNote && (
                        <div className="mt-3 rounded-xl border border-earth/20 bg-earth/6 px-3 py-2">
                          <p className="text-xs text-ink/75 leading-relaxed">
                            <span className="font-semibold text-earth">Heads up: </span>
                            {stop.safetyNote}
                          </p>
                        </div>
                      )}

                      {/* Action row */}
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <button
                          onClick={() => setAudioStop(stop)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-gold text-surface hover:bg-gold-dark transition-colors shadow-card-glow"
                        >
                          <Play className="w-3 h-3" />
                          Play audio guide
                        </button>

                        {stamp && (
                          <button
                            onClick={() => collectStamp(stamp.id)}
                            disabled={isCollected}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all ${
                              isCollected
                                ? "bg-canopy/12 text-canopy border-canopy/30 cursor-default"
                                : "bg-surface text-ink border-gold/30 hover:border-gold hover:text-gold-dark"
                            }`}
                          >
                            {isCollected ? (
                              <>
                                <Check className="w-3 h-3" /> Stamp collected
                              </>
                            ) : (
                              <>
                                <StampIcon className="w-3 h-3" /> Collect stamp
                              </>
                            )}
                          </button>
                        )}

                        {stop.safetyNote && (
                          <a
                            href="tel:1155"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-earth/10 text-earth border border-earth/20 hover:bg-earth/20 transition-colors"
                          >
                            <Phone className="w-3 h-3" /> 1155
                          </a>
                        )}
                      </div>

                      {/* Citation list (small) */}
                      <p className="text-[10px] text-ink/35 mt-3 leading-relaxed">
                        {stop.citations.map((c) => c.source).join(" · ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Audio modal — mock */}
      <AnimatePresence>
        {audioStop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-ink/40 backdrop-blur-sm"
            onClick={() => setAudioStop(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full md:max-w-md bg-surface rounded-t-3xl md:rounded-3xl border border-gold/20 shadow-card-hover p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-ink/45">
                    Audio guide · mock
                  </p>
                  <h3 className="font-serif text-lg text-ink mt-0.5 leading-snug">
                    {audioStop.name}
                  </h3>
                </div>
                <button
                  onClick={() => setAudioStop(null)}
                  className="p-1 rounded-full hover:bg-ink/5 text-ink/40 hover:text-ink"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="rounded-2xl border border-gold/15 bg-page p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-surface shadow-card-glow">
                    <Pause className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1 bg-ink/8 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gold rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "55%" }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-ink/40 mt-1 font-mono">
                      <span>1:32</span>
                      <span>2:48</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink/55 leading-relaxed">
                In production this stream would be generated by ElevenLabs in
                the user&apos;s preferred language. The narration script is
                drawn from the same verified sources cited on this stop.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collect celebration toast */}
      <AnimatePresence>
        {justCollectedId && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface border border-canopy/40 shadow-card-hover rounded-full px-4 py-2 flex items-center gap-2"
          >
            <span className="w-6 h-6 rounded-full bg-canopy flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-surface" strokeWidth={3} />
            </span>
            <p className="text-sm font-semibold text-ink">
              Stamp added to your passport
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
