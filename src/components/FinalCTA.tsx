"use client";

import { motion, type Variants } from "framer-motion";
import TempleSceneSVG from "./TempleSceneSVG";
import FloatingParticles from "./FloatingParticles";
import { LotusBloom, ThaiSectionDivider } from "./ThaiOrnament";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function FinalCTA() {
  return (
    <section className="relative py-32 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5EDD6 0%, #EDD9B0 40%, #F5EDD6 100%)" }}
    >
      {/* Warm gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,146,42,0.12) 0%, transparent 70%)" }}
      />
      <TempleSceneSVG className="opacity-80" />
      <FloatingParticles />

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-page to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-page to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <LotusBloom className="w-12 h-12 text-lotus opacity-85" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gold font-mono text-xs tracking-[0.25em] uppercase mb-5"
          >
            Your journey awaits
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="font-serif font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            <span className="text-ink">Turn every trip into</span>
            <br />
            <span className="text-gradient-gold">a trusted story.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-ink/55 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Join thousands of travelers who explore Thailand with verified routes,
            expert guides, and an AI companion that knows when not to guess.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/login" className="w-full sm:w-auto bg-earth text-surface font-bold px-10 py-4 rounded-full text-lg hover:bg-earth-light transition-all hover:scale-105 active:scale-95 shadow-card-glow text-center">
              Start My Journey
            </a>
            <button className="w-full sm:w-auto border-2 border-gold/50 text-gold font-semibold px-10 py-4 rounded-full text-lg hover:bg-gold/10 transition-all">
              Partner with Us
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {["TAT Certified", "DNP Verified", "Tourist Police Partner", "UNESCO Route Listed"].map((b) => (
              <span
                key={b}
                className="text-xs text-ink/40 border border-ink/12 bg-surface/60 px-4 py-1.5 rounded-full"
              >
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-14">
            <ThaiSectionDivider />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
