"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Map, Bot, Stamp, ShieldAlert, LogOut, Bell,
  ChevronRight, MapPin, Phone, TrendingDown,
  Check, Lock, Send,
} from "lucide-react";
import { routes } from "@/data/routes";
import { passportStamps, passportMeta } from "@/data/passport";
import { getProvider } from "@/lib/ai/provider";
import type { GuideAnswer } from "@/lib/ai/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { ROUTE_HERO_IMAGES } from "@/data/images";

const PASSPORT_STORAGE_KEY = "atp_collected_stamps";

// ── Progress ring ────────────────────────────────────────────────────────────
function ProgressRing({ pct, color, size = 84 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 7;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(26,46,22,0.08)" strokeWidth="6" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.3, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
}

// ── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: "home",     label: "Home",     Icon: Home      },
  { id: "routes",   label: "Routes",   Icon: Map       },
  { id: "guide",    label: "AI Guide", Icon: Bot       },
  { id: "passport", label: "Passport", Icon: Stamp     },
  { id: "safety",   label: "Safety",   Icon: ShieldAlert },
] as const;
type TabId = typeof TABS[number]["id"];

// ── AI Guide quick-start questions ───────────────────────────────────────────
const QUICK_QS = [
  "Fair tuk-tuk price from Grand Palace?",
  "Temple etiquette essentials",
  "Is Ayutthaya safe at night?",
  "Authentic street food in Bangkok",
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function AppPage() {
  const router  = useRouter();
  const [user, setUser]   = useState("Traveler");
  const [tab,  setTab]    = useState<TabId>("home");
  const [mounted, setMounted] = useState(false);

  // AI Guide state
  const [guideInput, setGuideInput]   = useState("");
  const [guideQ, setGuideQ]           = useState<string | null>(null);
  const [guideTyping, setGuideTyping] = useState(false);
  const [guideAnswer, setGuideAnswer] = useState<GuideAnswer | null>(null);

  // Passport interactive state — persisted across reloads
  const [collectedIds, setCollectedIds] = useLocalStorage<string[]>(
    PASSPORT_STORAGE_KEY,
    passportStamps.filter((s) => s.collected).map((s) => s.id),
  );
  const collectedSet = new Set(collectedIds);

  useEffect(() => {
    const stored = localStorage.getItem("atp_user");
    if (!stored) { router.replace("/login"); return; }
    setUser(stored);
    setMounted(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("atp_user");
    router.push("/login");
  };

  const askGuide = async (q: string) => {
    if (guideTyping || !q.trim()) return;
    setGuideAnswer(null);
    setGuideQ(q);
    setGuideTyping(true);
    try {
      const result = await getProvider().askGuide(q);
      setGuideAnswer(result);
    } finally {
      setGuideTyping(false);
    }
  };

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = guideInput.trim();
    if (!q) return;
    setGuideInput("");
    askGuide(q);
  };

  const collectStamp = (id: string) => {
    if (collectedSet.has(id)) return;
    setCollectedIds([...collectedIds, id]);
  };

  if (!mounted) return null;

  const passportPct = (collectedSet.size / passportMeta.totalStamps) * 100;
  const activeRoute = routes[1]; // King Naresuan

  return (
    <div className="min-h-screen bg-page flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-gold/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="font-serif font-bold text-gradient-gold text-lg flex-shrink-0 mr-2">
            ATP+
          </a>

          {/* Tab nav — desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === id
                    ? "bg-earth/12 text-earth"
                    : "text-ink/50 hover:text-ink hover:bg-ink/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </nav>

          {/* Right: notifications + user */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 text-ink/40 hover:text-ink transition-colors rounded-lg hover:bg-ink/5">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-earth" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gold/20">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-surface text-xs font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #C9922A, #B5511F)" }}
              >
                {user.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-ink leading-none">{user}</p>
                <p className="text-[10px] text-gold leading-none mt-0.5">Gold Explorer</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-ink/30 hover:text-earth transition-colors rounded ml-1"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-24 md:pb-8">
        <AnimatePresence mode="wait">

          {/* ── HOME TAB ─────────────────────────────────────────────── */}
          {tab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Greeting */}
              <div className="mb-6">
                <h1 className="font-serif text-2xl md:text-3xl text-ink">
                  สวัสดีครับ, <span className="text-gradient-gold">{user}</span>! 🙏
                </h1>
                <p className="text-ink/45 text-sm mt-1">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  {" · "}Gold Explorer · {collectedSet.size} stamps collected
                </p>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">

                {/* Active Journey (3/5) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="md:col-span-3 rounded-2xl overflow-hidden border border-gold/15 shadow-card"
                >
                  {/* Card header — photo + dark gradient overlay */}
                  <div
                    className="relative px-5 py-4 flex items-start justify-between min-h-[140px] overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${activeRoute.gradientFrom}, ${activeRoute.gradientTo})` }}
                  >
                    {ROUTE_HERO_IMAGES[activeRoute.id] && (
                      <>
                        <Image
                          src={ROUTE_HERO_IMAGES[activeRoute.id]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover opacity-70"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${activeRoute.gradientFrom}AA 0%, ${activeRoute.gradientTo}55 70%, transparent 100%)`,
                          }}
                        />
                      </>
                    )}
                    <div className="relative">
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md"
                        style={{ background: `${activeRoute.accentColor}D9`, color: "#FBF6EE" }}
                      >
                        {activeRoute.badge}
                      </span>
                      <h2 className="font-serif text-lg text-surface mt-2 leading-snug drop-shadow-md">
                        {activeRoute.name}
                      </h2>
                      <p className="text-surface/70 text-xs mt-0.5 font-mono">
                        {activeRoute.duration} · {activeRoute.region}
                      </p>
                    </div>
                    <div className="relative flex-shrink-0 text-right">
                      <p className="text-[10px] text-surface/60 uppercase tracking-widest">Day</p>
                      <p className="font-serif text-3xl font-bold text-gold leading-none drop-shadow-md">2</p>
                      <p className="text-[10px] text-surface/60">of 2</p>
                    </div>
                  </div>

                  {/* Progress + next stop */}
                  <div className="bg-surface px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-ink/50">Journey progress</p>
                      <p className="text-xs font-semibold text-earth">67%</p>
                    </div>
                    <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden mb-4">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${activeRoute.accentColor}, ${activeRoute.gradientFrom})` }}
                        initial={{ width: 0 }}
                        animate={{ width: "67%" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-ink/40 uppercase tracking-widest">Next Stop</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-earth flex-shrink-0" />
                          <p className="text-sm font-semibold text-ink">Mrigadayavan Palace</p>
                        </div>
                        <p className="text-xs text-ink/40 mt-0.5 ml-5">Royal permit — auto-booked ✓</p>
                      </div>
                      <Link
                        href={`/app/route/${activeRoute.id}`}
                        className="flex-shrink-0 bg-earth text-surface text-xs font-bold px-4 py-2 rounded-full hover:bg-earth-light transition-colors flex items-center gap-1"
                      >
                        Continue <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Highlights */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {activeRoute.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="text-[10px] text-ink/40 border border-ink/10 px-2.5 py-0.5 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Passport Status (2/5) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-2 rounded-2xl border border-gold/15 bg-surface shadow-card p-5 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-ink/40 uppercase tracking-widest font-medium">Your Passport</p>
                      <p className="text-sm font-bold text-ink mt-0.5">{passportMeta.level}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gold/12 text-gold">
                      🏆 Gold
                    </span>
                  </div>

                  {/* Ring */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <ProgressRing pct={passportPct} color="#C9922A" size={80} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="font-bold text-lg text-ink leading-none">{collectedSet.size}</p>
                        <p className="text-[9px] text-ink/40">/{passportMeta.totalStamps}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-ink/50 mb-1">Next: {passportMeta.nextLevel}</p>
                      <div className="h-1 bg-ink/8 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gold"
                          style={{ width: `${passportPct}%`, transition: "width 1s ease" }}
                        />
                      </div>
                      <p className="text-[10px] text-ink/35 mt-1">{passportMeta.totalStamps - collectedSet.size} stamps remaining</p>
                    </div>
                  </div>

                  {/* Recent stamps */}
                  <div>
                    <p className="text-[10px] text-ink/40 uppercase tracking-widest mb-2">Recent Stamps</p>
                    <div className="flex gap-2 flex-wrap">
                      {passportStamps.filter((s) => collectedSet.has(s.id)).slice(0, 5).map((s) => (
                        <div
                          key={s.id}
                          className="w-9 h-9 flex items-center justify-center text-lg rounded-xl"
                          style={{
                            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            background: `radial-gradient(circle, ${s.color}25, #FBF6EE)`,
                          }}
                          title={s.name}
                        >
                          {s.emoji}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setTab("passport")}
                    className="mt-auto pt-4 text-xs text-gold hover:text-gold-dark font-semibold flex items-center gap-1 transition-colors"
                  >
                    View all stamps <ChevronRight className="w-3 h-3" />
                  </button>
                </motion.div>
              </div>

              {/* Row 2 — Quick tools */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

                {/* AI Quick Ask */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl border border-gold/15 bg-surface shadow-card p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gold/12 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <p className="font-semibold text-ink text-sm">AI Travel Guide</p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const q = guideInput.trim();
                      if (!q) return;
                      setGuideInput("");
                      setTab("guide");
                      askGuide(q);
                    }}
                    className="flex items-center gap-2 bg-page border border-gold/20 rounded-xl px-3 py-2.5 mb-3 focus-within:border-gold"
                  >
                    <input
                      type="text"
                      value={guideInput}
                      onChange={(e) => setGuideInput(e.target.value)}
                      placeholder="Ask anything…"
                      className="flex-1 bg-transparent text-xs text-ink placeholder:text-ink/30 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!guideInput.trim()}
                      className="text-gold disabled:text-ink/20"
                      aria-label="Send"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_QS.slice(0, 2).map((q) => (
                      <button
                        key={q}
                        onClick={() => { setTab("guide"); askGuide(q); }}
                        className="text-left text-[11px] text-ink/55 hover:text-ink px-3 py-1.5 rounded-lg bg-page hover:bg-gold/8 border border-transparent hover:border-gold/20 transition-all"
                      >
                        → {q}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Price Guard */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-gold/15 bg-surface shadow-card p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-earth/12 flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-earth" />
                    </div>
                    <p className="font-semibold text-ink text-sm">Price Guard</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] text-ink/40 uppercase tracking-widest">Saved this trip</p>
                    <p className="font-serif text-2xl font-bold text-gradient-gold leading-tight">฿ 2,340</p>
                  </div>
                  {[
                    { label: "Tuk-tuk × 4", saved: 320 },
                    { label: "Longtail boat", saved: 450 },
                    { label: "Hotel rate",   saved: 1570 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] text-ink/45">{item.label}</p>
                      <span className="text-[11px] font-semibold text-canopy">-฿{item.saved}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => { window.location.href = "/#prices"; }}
                    className="mt-2 text-xs text-gold font-semibold hover:text-gold-dark flex items-center gap-1 transition-colors"
                  >
                    Price comparison <ChevronRight className="w-3 h-3" />
                  </button>
                </motion.div>

                {/* Safety Status */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-2xl border border-gold/15 bg-surface shadow-card p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-canopy/12 flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4 text-canopy" />
                    </div>
                    <p className="font-semibold text-ink text-sm">Safety Status</p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-canopy opacity-50" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-canopy" />
                    </span>
                    <p className="text-sm font-semibold text-ink">All Clear</p>
                  </div>
                  <p className="text-[11px] text-ink/45 mb-1">📍 Ayutthaya area · Safe</p>
                  <p className="text-[10px] text-ink/30 mb-4">Updated 2 min ago · Tourist Police patrolling</p>
                  <a
                    href="tel:1155"
                    className="flex items-center justify-center gap-2 w-full bg-earth/12 text-earth font-bold text-sm py-2.5 rounded-xl hover:bg-earth/20 transition-colors border border-earth/20"
                  >
                    <Phone className="w-3.5 h-3.5" /> Tourist Police · 1155
                  </a>
                </motion.div>
              </div>

              {/* Row 3 — More routes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-lg text-ink">More Routes for You</h2>
                  <button
                    onClick={() => setTab("routes")}
                    className="text-xs text-gold font-semibold hover:text-gold-dark transition-colors flex items-center gap-1"
                  >
                    Browse all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {routes.map((route, i) => (
                    <motion.div
                      key={route.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      <Link
                        href={`/app/route/${route.id}`}
                        className="block rounded-2xl overflow-hidden border border-gold/15 shadow-card hover:shadow-card-hover transition-shadow group"
                      >
                        <div
                          className="relative h-24 px-4 py-3 flex items-end overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${route.gradientFrom}, ${route.gradientTo})` }}
                        >
                          {ROUTE_HERO_IMAGES[route.id] && (
                            <>
                              <Image
                                src={ROUTE_HERO_IMAGES[route.id]}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 100vw, 320px"
                                className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                              />
                              <div
                                className="absolute inset-0"
                                style={{
                                  background: `linear-gradient(180deg, transparent 30%, ${route.gradientTo}AA 100%)`,
                                }}
                              />
                            </>
                          )}
                          <span
                            className="relative text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md"
                            style={{ background: `${route.accentColor}D9`, color: "#FBF6EE" }}
                          >
                            {route.badge}
                          </span>
                        </div>
                        <div className="bg-surface p-3.5">
                          <p className="font-semibold text-ink text-sm leading-snug">{route.name}</p>
                          <p className="text-[11px] text-ink/45 mt-0.5">{route.duration} · {route.region}</p>
                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-[10px] text-ink/35 border border-ink/10 px-2 py-0.5 rounded-full">
                              {route.difficulty}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold transition-colors" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── ROUTES TAB ───────────────────────────────────────────── */}
          {tab === "routes" && (
            <motion.div key="routes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6">
                <h1 className="font-serif text-2xl text-ink">Story Routes</h1>
                <p className="text-ink/45 text-sm mt-1">Government-verified · Expert-curated · 340+ routes</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {routes.map((route) => (
                  <div key={route.id} className="rounded-2xl overflow-hidden border border-gold/15 shadow-card bg-surface group">
                    <div
                      className="relative h-36 px-5 py-4 flex flex-col justify-end overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${route.gradientFrom}, ${route.gradientTo})` }}
                    >
                      {ROUTE_HERO_IMAGES[route.id] && (
                        <>
                          <Image
                            src={ROUTE_HERO_IMAGES[route.id]}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                            className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(180deg, transparent 30%, ${route.gradientTo}CC 100%)`,
                            }}
                          />
                        </>
                      )}
                      <span
                        className="relative text-[10px] font-semibold px-2.5 py-0.5 rounded-full w-fit mb-2 backdrop-blur-md"
                        style={{ background: `${route.accentColor}D9`, color: "#FBF6EE" }}
                      >
                        {route.badge}
                      </span>
                      <h3 className="relative font-serif text-surface text-base font-semibold leading-snug drop-shadow-md">{route.name}</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-ink/50 mb-3 leading-relaxed">{route.tagline}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {route.highlights.map((h) => (
                          <span key={h} className="text-[10px] text-ink/45 border border-ink/10 px-2 py-0.5 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-ink">{route.duration}</p>
                          <p className="text-[11px] text-ink/40">{route.region}</p>
                        </div>
                        <Link
                          href={`/app/route/${route.id}`}
                          className="bg-earth text-surface text-xs font-bold px-4 py-2 rounded-full hover:bg-earth-light transition-colors"
                        >
                          Start Route
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── AI GUIDE TAB ─────────────────────────────────────────── */}
          {tab === "guide" && (
            <motion.div key="guide" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6">
                <h1 className="font-serif text-2xl text-ink">AI Travel Guide</h1>
                <p className="text-ink/45 text-sm mt-1">Every answer sourced from TAT, Tourist Police & expert historians</p>
              </div>
              <div className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <form
                    onSubmit={handleGuideSubmit}
                    className="flex items-center gap-2 bg-surface border border-gold/22 rounded-xl px-3 py-2.5 mb-1 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/12"
                  >
                    <input
                      type="text"
                      value={guideInput}
                      onChange={(e) => setGuideInput(e.target.value)}
                      placeholder="Type any question…"
                      className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!guideInput.trim() || guideTyping}
                      className="text-gold disabled:text-ink/20"
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                  <p className="text-[10px] text-ink/40 uppercase tracking-widest font-medium mt-1 mb-1">
                    Or pick a popular one
                  </p>
                  {QUICK_QS.map((q) => (
                    <button
                      key={q}
                      onClick={() => askGuide(q)}
                      className={`text-left px-4 py-3.5 rounded-2xl border text-sm transition-all ${
                        guideQ === q
                          ? "border-earth bg-earth/8 text-ink font-medium"
                          : "border-gold/20 bg-surface text-ink/65 hover:border-earth/40 hover:text-ink"
                      }`}
                    >
                      <span className="text-gold mr-2">→</span>{q}
                    </button>
                  ))}
                </div>
                <div className="md:col-span-3 rounded-2xl border border-gold/15 bg-surface shadow-card min-h-[280px] p-5">
                  {!guideQ && !guideTyping && (
                    <div className="flex flex-col items-center justify-center h-[240px] gap-3 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-gold" />
                      </div>
                      <p className="text-ink/40 text-sm max-w-xs">Type a question or pick one to get a sourced, verified answer.</p>
                    </div>
                  )}
                  {guideTyping && (
                    <div className="flex items-center gap-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-2 h-2 rounded-full bg-gold"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                      <p className="text-ink/40 text-xs ml-1">Consulting verified sources…</p>
                    </div>
                  )}
                  {guideAnswer && !guideTyping && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="self-end bg-earth/10 border border-earth/20 rounded-2xl rounded-br-sm px-4 py-2.5 mb-4 w-fit ml-auto">
                        <p className="text-ink text-sm font-medium">{guideAnswer.question}</p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-gold" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="bg-page border border-gold/15 rounded-2xl rounded-tl-sm px-4 py-3">
                            <p className="text-ink/80 text-sm leading-relaxed whitespace-pre-wrap">{guideAnswer.answer}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {guideAnswer.citations.map((c) => (
                              <span
                                key={c.source}
                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                style={{ background: `${c.trustColor}18`, color: c.trustColor }}
                              >
                                ✓ {c.trustLabel}
                              </span>
                            ))}
                            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-ink/5 text-ink/55">
                              Confidence: {guideAnswer.confidence}
                            </span>
                          </div>
                          <p className="text-[10px] text-ink/35 mt-1.5">
                            {guideAnswer.citations.map((c) => c.source).join(" · ")}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PASSPORT TAB ─────────────────────────────────────────── */}
          {tab === "passport" && (
            <motion.div key="passport" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="font-serif text-2xl text-ink">Digital Passport</h1>
                  <p className="text-ink/45 text-sm mt-1">{collectedSet.size} of {passportMeta.totalStamps} stamps · Tap locked stamps to collect</p>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressRing pct={passportPct} color="#C9922A" size={56} />
                  <div>
                    <p className="font-bold text-ink text-lg leading-none">{collectedSet.size}<span className="text-ink/30 text-sm font-normal">/{passportMeta.totalStamps}</span></p>
                    <p className="text-[10px] text-gold font-semibold">{passportMeta.level}</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-surface rounded-2xl border border-gold/15 shadow-card px-5 py-4 mb-5">
                <div className="flex justify-between text-xs text-ink/40 mb-2">
                  <span>Progress to {passportMeta.nextLevel}</span>
                  <span>{passportMeta.totalStamps - collectedSet.size} stamps to go</span>
                </div>
                <div className="h-2 bg-ink/8 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #C9922A, #B5511F)" }}
                    animate={{ width: `${passportPct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Stamp grid */}
              <div className="bg-surface rounded-2xl border border-gold/15 shadow-card p-6">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-5">
                  {passportStamps.map((stamp) => {
                    const isC = collectedSet.has(stamp.id);
                    return (
                      <motion.button
                        key={stamp.id}
                        onClick={!isC ? () => collectStamp(stamp.id) : undefined}
                        whileTap={!isC ? { scale: 0.88 } : undefined}
                        whileHover={!isC ? { scale: 1.08 } : undefined}
                        className={`flex flex-col items-center gap-1.5 focus:outline-none ${!isC ? "cursor-pointer" : "cursor-default"}`}
                      >
                        <div className="relative">
                          <motion.div
                            key={isC ? "c" : "l"}
                            initial={isC ? { scale: 0.5, opacity: 0 } : false}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className="w-12 h-12 flex items-center justify-center text-xl"
                            style={{
                              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                              background: isC ? `radial-gradient(circle, ${stamp.color}30, #FBF6EE)` : "rgba(26,46,22,0.06)",
                            }}
                          >
                            {isC ? stamp.emoji : <Lock className="w-3.5 h-3.5 text-ink/20" />}
                          </motion.div>
                          {isC && (
                            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-canopy flex items-center justify-center">
                              <Check className="w-2 h-2 text-surface" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] text-center leading-tight max-w-[56px]"
                          style={{ color: isC ? "#1A2E16" : "rgba(26,46,22,0.3)" }}
                        >
                          {stamp.name}
                        </p>
                        {isC && stamp.dateCollected && (
                          <p className="text-[9px] text-ink/25">{stamp.dateCollected}</p>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── SAFETY TAB ───────────────────────────────────────────── */}
          {tab === "safety" && (
            <motion.div key="safety" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6">
                <h1 className="font-serif text-2xl text-ink">Safety Layer</h1>
                <p className="text-ink/45 text-sm mt-1">Verified safety information · Tourist Police 1155</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: "🛡️", title: "Overall Status", value: "All Clear", sub: "Ayutthaya & surrounds", color: "#4A8C5C" },
                  { icon: "🚔", title: "Tourist Police", value: "On Patrol", sub: "Until 21:00 tonight", color: "#C9922A" },
                  { icon: "⛈️", title: "Weather", value: "Clear Skies", sub: "30°C · Low humidity", color: "#1A8A7A" },
                  { icon: "💱", title: "Fair Price Alert", value: "Active", sub: "Tuk-tuk & taxi guarded", color: "#B5511F" },
                  { icon: "🏥", title: "Nearest Hospital", value: "Ayutthaya Hosp.", value2: "2.4 km", sub: "24/7 Emergency", color: "#C9922A" },
                  { icon: "📶", title: "Connectivity", value: "AIS 4G", sub: "Good signal in this area", color: "#4A8C5C" },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gold/15 bg-surface shadow-card p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-[10px] text-ink/40 uppercase tracking-widest font-medium">{item.title}</p>
                        <p className="font-semibold text-ink text-sm mt-0.5">{item.value}</p>
                        <p className="text-[11px] text-ink/45 mt-0.5">{item.sub}</p>
                      </div>
                      <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-2xl border border-gold/25 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                style={{ background: "rgba(201,146,42,0.07)" }}
              >
                <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: "rgba(201,146,42,0.15)" }}>
                  <Phone className="w-7 h-7 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-xl text-ink">Tourist Police Hotline</p>
                  <p className="text-ink/50 text-sm mt-0.5">Available 24/7 in English, Chinese, Japanese & Thai.</p>
                </div>
                <a href="tel:1155" className="flex-shrink-0 bg-gold text-surface font-bold px-6 py-3 rounded-full text-xl hover:bg-gold-dark transition-colors shadow-gold-glow">
                  1155
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── Mobile bottom tab bar ──────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/97 backdrop-blur-md border-t border-gold/15 flex z-50">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
              tab === id ? "text-earth" : "text-ink/35"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
