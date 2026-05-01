"use client";

import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/DynamicIcon";
import type { TrustTier } from "@/data/trust";

interface TrustCardProps {
  tier: TrustTier;
}

export default function TrustCard({ tier }: TrustCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: (tier.tier - 1) * 0.12 }}
      whileHover={{
        y: -4,
        boxShadow: `0 12px 32px ${tier.glowColor}, 0 2px 8px rgba(26,46,22,0.06)`,
        transition: { duration: 0.2 },
      }}
      className="rounded-2xl border border-gold/15 bg-surface p-6 flex flex-col transition-all group cursor-default"
      style={{ boxShadow: "0 2px 12px rgba(26,46,22,0.06)" }}
    >
      {/* Icon + Tier label */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-2.5 rounded-xl"
          style={{ background: `${tier.accentColor}15` }}
        >
          <DynamicIcon
            name={tier.icon}
            className="w-6 h-6"
            style={{ color: tier.accentColor }}
          />
        </div>
        <span className={`text-xs font-mono px-3 py-1 rounded-full ${tier.pillBg} ${tier.pillText2}`}>
          {tier.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-ink mb-2 group-hover:text-gradient-gold transition-all">
        {tier.title}
      </h3>

      {/* Pill */}
      <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3 ${tier.pillBg} ${tier.pillText2}`}>
        {tier.pillText}
      </span>

      {/* Description */}
      <p className="text-ink/55 text-sm leading-relaxed flex-1 mb-4">
        {tier.description}
      </p>

      {/* Stats */}
      <div className="pt-4 border-t border-ink/8 grid grid-cols-2 gap-3">
        {tier.stats.map((s) => (
          <div key={s.label}>
            <p className="font-bold text-lg" style={{ color: tier.accentColor }}>
              {s.value}
            </p>
            <p className="text-xs text-ink/40">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
