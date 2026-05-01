"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DynamicIcon } from "@/components/DynamicIcon";
import type { Route } from "@/data/routes";

interface RouteCardProps {
  route: Route;
  index: number;
}

const difficultyColor: Record<string, string> = {
  Easy:     "#4A8C5C",
  Moderate: "#C9922A",
  Hard:     "#C4652A",
};

const difficultyBg: Record<string, string> = {
  Easy:     "rgba(74,140,92,0.12)",
  Moderate: "rgba(201,146,42,0.12)",
  Hard:     "rgba(196,101,42,0.12)",
};

export default function RouteCard({ route, index }: RouteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      whileHover={{
        y: -6,
        boxShadow: `0 16px 40px rgba(26,46,22,0.12), 0 4px 12px ${route.accentColor}20`,
        transition: { type: "spring", stiffness: 300, damping: 22 },
      }}
      className="relative rounded-2xl overflow-hidden bg-surface border border-gold/15 group flex flex-col"
      style={{ boxShadow: "0 2px 16px rgba(26,46,22,0.07)" }}
    >
      <Link
        href={`/app/route/${route.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Open ${route.name}`}
      />
      {/* Gradient accent bar */}
      <div
        className="h-1.5 w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${route.gradientFrom}, ${route.gradientTo})` }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-xl"
              style={{ background: `${route.accentColor}18` }}
            >
              <DynamicIcon
                name={route.icon}
                className="w-4 h-4"
                style={{ color: route.accentColor }}
              />
            </div>
            <span className="text-xs font-medium text-ink/40 uppercase tracking-widest">
              {route.region}
            </span>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border flex-shrink-0"
            style={{
              color:        route.badgeColor,
              borderColor:  `${route.badgeColor}35`,
              background:   `${route.badgeColor}10`,
            }}
          >
            {route.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl text-ink mb-2 group-hover:text-gradient-gold transition-all leading-snug">
          {route.name}
        </h3>
        <p className="text-ink/50 text-sm italic mb-5 leading-relaxed">{route.tagline}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5 text-xs text-ink/40">
          <span>{route.duration}</span>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span
            className="font-semibold px-2 py-0.5 rounded-full"
            style={{
              color:      difficultyColor[route.difficulty],
              background: difficultyBg[route.difficulty],
            }}
          >
            {route.difficulty}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 flex-1">
          {route.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-ink/60">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: route.accentColor }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          className="mt-6 w-full py-2.5 rounded-xl border font-semibold text-sm text-center transition-all group-hover:opacity-80"
          style={{
            borderColor: `${route.accentColor}45`,
            color:       route.accentColor,
            background:  `${route.accentColor}08`,
          }}
        >
          View Route →
        </div>
      </div>
    </motion.div>
  );
}
