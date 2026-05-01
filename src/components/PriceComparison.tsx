"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type RouteData = { route: string; tourist: number; fair: number };
type TransportKey = keyof typeof TRANSPORT;

const TRANSPORT = {
  "Tuk-Tuk": [
    { route: "Airport → Khao San Rd", tourist: 800, fair: 400 },
    { route: "Grand Palace → Chatuchak", tourist: 350, fair: 160 },
    { route: "Silom → Wat Pho", tourist: 200, fair: 80 },
  ],
  Taxi: [
    { route: "Airport → Sukhumvit", tourist: 600, fair: 320 },
    { route: "MBK → Victory Monument", tourist: 150, fair: 75 },
    { route: "Hua Lamphong → Asok", tourist: 120, fair: 60 },
  ],
  "Longtail Boat": [
    { route: "Pier 9 → Wat Arun", tourist: 500, fair: 50 },
    { route: "Chao Phraya Express (full)", tourist: 300, fair: 15 },
    { route: "Floating Market charter", tourist: 1200, fair: 600 },
  ],
} as const;

const TABS = Object.keys(TRANSPORT) as TransportKey[];

const TAB_ICONS: Record<TransportKey, string> = {
  "Tuk-Tuk": "🛺",
  Taxi: "🚕",
  "Longtail Boat": "⛵",
};

function PriceBar({ label, amount, max, color }: { label: string; amount: number; max: number; color: string }) {
  const pct = Math.max(4, (amount / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-ink/50 w-28 flex-shrink-0 text-right">{label}</p>
      <div className="flex-1 h-7 bg-ink/6 rounded-lg overflow-hidden relative">
        <motion.div
          className="h-full rounded-lg flex items-center justify-end pr-3"
          style={{ background: color }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="text-xs font-bold text-surface whitespace-nowrap">฿ {amount.toLocaleString()}</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function PriceComparison() {
  const [activeTab, setActiveTab] = useState<TransportKey>("Tuk-Tuk");
  const [activeRoute, setActiveRoute] = useState(0);

  const routes = TRANSPORT[activeTab] as readonly RouteData[];
  const current = routes[activeRoute];
  const maxPrice = Math.max(...routes.map((r) => r.tourist));
  const savings = current.tourist - current.fair;
  const savingsPct = Math.round((savings / current.tourist) * 100);

  const handleTabChange = (tab: TransportKey) => {
    setActiveTab(tab);
    setActiveRoute(0);
  };

  return (
    <section
      id="prices"
      className="py-24 px-4"
      style={{ background: "linear-gradient(180deg, #F5EDD6 0%, #EDD9B0 50%, #F5EDD6 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-earth font-mono text-xs tracking-widest uppercase">
            Fair Pricing Intelligence
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Know Before You Pay
        </h2>
        <p className="text-ink/55 text-center mb-12 text-base md:text-lg max-w-xl mx-auto">
          See the difference between tourist trap prices and the verified fair rate —
          powered by 50,000+ real transactions.
        </p>

        {/* Transport tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-earth text-surface border-earth shadow-card-glow"
                  : "bg-surface border-gold/25 text-ink/60 hover:border-earth/40 hover:text-ink"
              }`}
            >
              {TAB_ICONS[tab]} {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* LEFT — Route list */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <p className="text-ink/40 text-xs uppercase tracking-widest font-medium mb-1">
              Select route
            </p>
            {routes.map((r, i) => (
              <button
                key={r.route}
                onClick={() => setActiveRoute(i)}
                className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  activeRoute === i
                    ? "border-earth bg-earth/8 text-ink font-medium"
                    : "border-gold/20 bg-surface text-ink/60 hover:border-earth/30 hover:text-ink"
                }`}
              >
                <span className="text-gold/60 mr-2 text-xs">#{i + 1}</span>
                {r.route}
              </button>
            ))}
          </div>

          {/* RIGHT — Bar chart */}
          <div className="md:col-span-3 bg-surface rounded-2xl border border-gold/15 shadow-card p-6">
            <p className="font-semibold text-ink text-sm mb-1">{current.route}</p>
            <p className="text-ink/40 text-xs mb-6">{activeTab} · Bangkok area</p>

            <div className="flex flex-col gap-4">
              <PriceBar
                label="Tourist Price"
                amount={current.tourist}
                max={maxPrice}
                color="#C4742A"
              />
              <PriceBar
                label="Verified Fair"
                amount={current.fair}
                max={maxPrice}
                color="#2D5A3D"
              />
            </div>

            {/* Savings callout */}
            <motion.div
              key={`${activeTab}-${activeRoute}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-6 rounded-xl border border-gold/25 px-5 py-4 flex items-center justify-between"
              style={{ background: "rgba(201,146,42,0.07)" }}
            >
              <div>
                <p className="text-xs text-ink/50 mb-0.5">You save</p>
                <p className="font-serif text-2xl font-bold text-gold">
                  ฿ {savings.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink/50 mb-0.5">Overcharge rate</p>
                <p className="font-bold text-lg text-earth">{savingsPct}% markup</p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-surface flex-shrink-0"
                style={{ background: "#2D5A3D" }}
              >
                ✓
              </div>
            </motion.div>

            <p className="text-xs text-ink/30 mt-4 text-center">
              Prices sourced from TAT database · 50,000+ verified transactions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
