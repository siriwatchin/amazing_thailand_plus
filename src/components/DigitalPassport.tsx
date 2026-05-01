"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { passportStamps, passportMeta } from "@/data/passport";
import { useLocalStorage } from "@/lib/useLocalStorage";
import PassportStamp from "./PassportStamp";
import { KanokCorner, LotusBloom } from "./ThaiOrnament";

const PASSPORT_STORAGE_KEY = "atp_collected_stamps";

export default function DigitalPassport() {
  const [collectedIds, setCollectedIds] = useLocalStorage<string[]>(
    PASSPORT_STORAGE_KEY,
    passportStamps.filter((s) => s.collected).map((s) => s.id),
  );
  const collectedSet = new Set(collectedIds);

  const collectedCount = collectedSet.size;
  const collectedPct = (collectedCount / passportMeta.totalStamps) * 100;
  const stampsToNext = passportMeta.totalStamps - collectedCount;

  const handleCollect = (id: string) => {
    if (collectedSet.has(id)) return;
    setCollectedIds([...collectedIds, id]);
  };

  return (
    <section id="passport" className="py-24 px-4 bg-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-gold font-mono text-xs tracking-widest uppercase">
            Gamified · Premium · Collect verified stamps
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Your Digital Passport
        </h2>
        <p className="text-ink/55 text-center mb-12 text-base md:text-lg max-w-xl mx-auto">
          Collect verified stamps at every destination. Build your Thailand story,
          earn status, and unlock exclusive experiences.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden border border-gold/20 shadow-gold-glow"
        >
          {/* Passport header strip */}
          <div
            className="relative px-6 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2D5A3D 0%, #1A2E16 100%)" }}
          >
            {/* Kanok corners on the dark passport header */}
            <KanokCorner className="absolute top-1.5 left-1.5 w-12 text-gold/35" />
            <KanokCorner className="absolute top-1.5 right-1.5 w-12 text-gold/35" flip />
            <div>
              <p className="font-mono text-[10px] text-surface/40 tracking-[0.2em] uppercase">
                Kingdom of Thailand
              </p>
              <p className="font-serif text-2xl md:text-3xl text-gold mt-1">
                Digital Travel Passport
              </p>
              <p className="text-surface/50 text-xs mt-1 font-mono">ATP-2025-EXPLORER</p>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex sm:justify-end items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-gold font-bold text-sm">{passportMeta.level}</span>
              </div>
              <p className="font-bold text-3xl text-gradient-gold">
                {collectedCount}
                <span className="text-surface/40 text-lg font-normal">/{passportMeta.totalStamps}</span>
              </p>
              <p className="text-xs text-surface/40">stamps collected</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-6 md:px-8 py-4 bg-surface border-b border-gold/15">
            <div className="flex justify-between text-xs text-ink/40 mb-2">
              <span>Progress to {passportMeta.nextLevel}</span>
              <span>{stampsToNext} stamps to go</span>
            </div>
            <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #C9922A, #C4742A)" }}
                animate={{ width: `${collectedPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stamps grid */}
          <div className="relative p-6 md:p-8 bg-surface overflow-hidden">
            {/* Watermark lotus — large, behind the stamps */}
            <LotusBloom className="absolute -bottom-8 -right-8 w-48 h-48 text-gold opacity-[0.06] pointer-events-none" />
            <p className="text-xs text-ink/40 mb-4 text-center">
              Tap a locked stamp to collect it · {passportMeta.totalStamps - collectedCount} remaining
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 md:gap-6">
              {passportStamps.map((stamp, i) => (
                <PassportStamp
                  key={stamp.id}
                  stamp={stamp}
                  index={i}
                  isCollected={collectedSet.has(stamp.id)}
                  onCollect={() => handleCollect(stamp.id)}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-4 bg-surface border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-ink/35 text-xs">
              Stamps verified at TAT checkpoint network
            </p>
            <button className="text-xs text-gold hover:opacity-80 transition-opacity font-semibold border border-gold/30 px-4 py-1.5 rounded-full">
              Share Passport →
            </button>
          </div>
        </motion.div>

        <p className="text-center mt-6 text-ink/35 text-sm">
          {stampsToNext} more stamps unlock{" "}
          <span className="text-gold">{passportMeta.nextLevel}</span> status
        </p>
      </div>
    </section>
  );
}
