"use client";

import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/DynamicIcon";
import type { SafetyFeature } from "@/data/safety";

interface SafetyCardProps {
  feature: SafetyFeature;
  index: number;
}

export default function SafetyCard({ feature, index }: SafetyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
      className="rounded-2xl border border-gold/15 p-5 bg-surface hover:shadow-card-hover transition-all"
      style={{ boxShadow: "0 2px 12px rgba(26,46,22,0.06)", background: feature.bgColor }}
    >
      <div className="flex items-start gap-4">
        <div
          className="rounded-xl p-2.5 flex-shrink-0"
          style={{ background: `${feature.color}18` }}
        >
          <DynamicIcon
            name={feature.icon}
            className="w-5 h-5"
            style={{ color: feature.color }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-ink text-sm">{feature.title}</h3>
            {feature.badge && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                style={{
                  background: `${feature.color}15`,
                  color:      feature.color,
                }}
              >
                {feature.badge}
              </span>
            )}
          </div>
          <p className="text-ink/55 text-xs leading-relaxed">{feature.description}</p>
          {feature.actionLabel && (
            <a
              href={feature.actionUrl}
              className="inline-flex items-center gap-1 text-xs font-bold mt-2.5 hover:opacity-80 transition-opacity"
              style={{ color: feature.color }}
            >
              {feature.actionLabel} →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
