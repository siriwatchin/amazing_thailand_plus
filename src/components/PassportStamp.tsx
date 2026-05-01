"use client";

import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import type { PassportStamp as StampType } from "@/data/passport";

interface PassportStampProps {
  stamp: StampType;
  index: number;
  isCollected: boolean;
  onCollect?: () => void;
}

export default function PassportStamp({ stamp, index, isCollected, onCollect }: PassportStampProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="flex flex-col items-center gap-1.5"
    >
      {/* Hexagonal stamp */}
      <motion.button
        onClick={!isCollected ? onCollect : undefined}
        whileTap={!isCollected ? { scale: 0.88 } : undefined}
        whileHover={!isCollected ? { scale: 1.1 } : undefined}
        className={`relative focus:outline-none ${!isCollected ? "cursor-pointer" : "cursor-default"}`}
        aria-label={isCollected ? stamp.name : `Collect ${stamp.name}`}
      >
        <motion.div
          key={isCollected ? "collected" : "locked"}
          initial={isCollected ? { scale: 0.6, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="w-14 h-14 flex items-center justify-center text-2xl"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: isCollected
              ? `radial-gradient(circle at center, ${stamp.color}30, #FBF6EE)`
              : "rgba(26,46,22,0.06)",
          }}
        >
          {isCollected ? (
            <span role="img" aria-label={stamp.name} className="text-xl leading-none">
              {stamp.emoji}
            </span>
          ) : (
            <Lock className="w-4 h-4 text-ink/20" />
          )}
        </motion.div>

        {/* Collected checkmark badge */}
        {isCollected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: "#22C55E" }}
          >
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </motion.button>

      {/* Name */}
      <p
        className="text-xs text-center font-medium leading-tight max-w-[60px]"
        style={{ color: isCollected ? "#1A2E16" : "rgba(26,46,22,0.3)" }}
      >
        {stamp.name}
      </p>

      {/* Date collected */}
      {isCollected && stamp.dateCollected && (
        <p className="text-[10px] text-ink/30">{stamp.dateCollected}</p>
      )}
    </motion.div>
  );
}
