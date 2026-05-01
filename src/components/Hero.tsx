"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import FloatingParticles from "./FloatingParticles";
import { KanokCorner, LotusBloom } from "./ThaiOrnament";
import { IMAGES } from "@/data/images";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EDD9B0 0%, #F5EDD6 55%, #F5EDD6 100%)" }}
    >
      {/* Photographic backdrop — Ayutthaya golden hour */}
      <Image
        src={IMAGES.hero.ayutthayaGoldenHour}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Vertical parchment veil — stronger in the middle band where text sits */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,237,214,0.15) 0%, rgba(245,237,214,0.55) 28%, rgba(245,237,214,0.65) 60%, rgba(245,237,214,0.85) 88%, #F5EDD6 100%)",
        }}
      />
      {/* Centred radial spotlight — parchment haze right behind the headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(245,237,214,0.35) 0%, transparent 75%)",
        }}
      />

      {/* Soft warm glow accents — sit above the image, blend with it */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none mix-blend-screen"
        style={{ background: "radial-gradient(ellipse, #C9922A 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/4 right-0 w-[360px] h-[360px] rounded-full opacity-15 blur-3xl pointer-events-none mix-blend-screen"
        style={{ background: "radial-gradient(ellipse, #C4742A 0%, transparent 70%)" }}
      />

      {/* Kanok corner flourishes — top corners */}
      <KanokCorner className="absolute top-20 left-4 sm:left-8 w-16 sm:w-24 text-gold/45 z-10" />
      <KanokCorner
        className="absolute top-20 right-4 sm:right-8 w-16 sm:w-24 text-gold/45 z-10"
        flip
      />

      {/* Soft golden particles — like fireflies or floating ash */}
      <FloatingParticles />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 pb-32">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Lotus + badge — Thai festival accent above the headline */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-6 gap-3">
            <LotusBloom className="w-9 h-9 text-lotus opacity-80" />
            <span className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full text-sm font-medium text-gold border-gold/30">
              <span className="w-2 h-2 rounded-full bg-lotus animate-pulse" />
              AI-Powered Digital Travel Passport for Thailand
            </span>
          </motion.div>

          {/* Title — dark ink on parchment, gold accent */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-bold leading-[0.93] mb-6 [text-shadow:0_2px_18px_rgba(245,237,214,0.9)]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="text-ink block">Amazing</span>
            <span className="text-gradient-gold block">Thailand</span>
            <span className="text-ink block">Plus</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-ink/85 text-xl md:text-2xl font-serif italic mb-4 [text-shadow:0_1px_8px_rgba(245,237,214,0.85)]"
          >
            Story-led journeys you can trust.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-ink/75 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:0_1px_6px_rgba(245,237,214,0.85)]"
          >
            An AI-powered Digital Travel Passport that transforms Thailand into
            personalized, verified, and multilingual story routes — every stop
            backed by government data, expert curators, and a community of real travelers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#routes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-earth text-surface font-bold px-8 py-4 rounded-full text-lg hover:bg-earth-light transition-all hover:scale-105 active:scale-95 shadow-card-glow"
            >
              Explore Routes
            </a>
            <a
              href="#passport"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gold/60 text-gold font-semibold px-8 py-4 rounded-full text-lg hover:bg-gold/10 transition-all"
            >
              View Passport
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mt-14"
          >
            {[
              { value: "340+", label: "Verified Routes" },
              { value: "77",   label: "Provinces Covered" },
              { value: "4.9★", label: "Traveler Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-ink/45 text-xs tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-page to-transparent pointer-events-none z-10" />
    </section>
  );
}
