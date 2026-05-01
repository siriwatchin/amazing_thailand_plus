"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Info, MapPin, ShieldAlert } from "lucide-react";
import type { GeneratedStop } from "@/lib/ai/types";

interface PhuketRouteMapProps {
  stops: GeneratedStop[];
  accentColor: string;
}

interface PinMeta {
  x: number;
  y: number;
  district: "mueang" | "kathu" | "thalang";
  title: string;
  detail: string;
  image?: {
    src: string;
    alt: string;
  };
}

const DISTRICT_LABELS: Record<PinMeta["district"], string> = {
  mueang: "Mueang Phuket District",
  kathu: "Kathu District",
  thalang: "Thalang District",
};

const PHUKET_MAP_IMAGE = "/images/colorful-map-of-phuket-thailand.jpg";

const PHUKET_IMAGES = {
  soiRomanee: "/images/phuket/soi_rommanee.jpeg",
  thalangRoad: "/images/phuket/thalang_road.jpeg",
  kopitiam: "/images/phuket/kopitiam_by_wilai%20.jpeg",
  saengTham: "/images/phuket/saeng_tham_shrine.jpeg",
  thaiHua: "/images/phuket/phuket_thai_hua_museum.jpeg",
  onOnHotel: "/images/phuket/on_on_hotel_phuket.jpeg",
  satree: "/images/phuket/satree_phuket_school.jpeg",
  saphanHin: "/images/phuket/saphan_hin.jpeg",
  kioThianKeng: "/images/phuket/kiu_thian_keng_shrine.jpeg",
  karon: "/images/phuket/hat_karon.jpeg",
  promthep: "/images/phuket/promthep_cape.jpeg",
  sinoColonial: "/images/phuket/sino_colonial.jpeg",
  dibuk: "/images/phuket/dibuk_restaurant.jpeg",
  blueBus: "/images/phuket/blue_local_bus%20.jpeg",
} as const;

const STOP_CONTEXT: { match: RegExp; meta: PinMeta }[] = [
  {
    match: /soi romanee/i,
    meta: {
      x: 48,
      y: 52,
      district: "mueang",
      title: "The old-town lane everyone remembers",
      detail:
        "Soi Romanee is known for pastel Sino-Portuguese shophouses. It is a strong opening stop because the street instantly sets a warm, nostalgic Old Phuket mood.",
      image: {
        src: PHUKET_IMAGES.soiRomanee,
        alt: "Soi Romanee in Phuket Old Town",
      },
    },
  },
  {
    match: /thalang road/i,
    meta: {
      x: 52,
      y: 53,
      district: "mueang",
      title: "The spine of Phuket Old Town",
      detail:
        "Thalang Road gathers old shophouses, family businesses, and everyday local life. In this route it works as a memory walk, not just a photo checkpoint.",
      image: {
        src: PHUKET_IMAGES.thalangRoad,
        alt: "Thalang Road in Phuket Old Town",
      },
    },
  },
  {
    match: /kopitiam/i,
    meta: {
      x: 45,
      y: 56,
      district: "mueang",
      title: "Local flavor inside an old shophouse",
      detail:
        "A local coffee-and-food stop adds texture to the old-town chapter. It turns the route from a filming-location checklist into something you can taste and sit with.",
      image: {
        src: PHUKET_IMAGES.kopitiam,
        alt: "Kopitiam by Wilai in Phuket Old Town",
      },
    },
  },
  {
    match: /saeng tham|shrine/i,
    meta: {
      x: 56,
      y: 55,
      district: "mueang",
      title: "Chinese-Phuket cultural roots",
      detail:
        "A Chinese shrine adds cultural depth to Phuket Old Town, linking the island to trading history and overseas Chinese communities before the route moves toward the sea.",
      image: {
        src: PHUKET_IMAGES.saengTham,
        alt: "Saeng Tham Shrine in Phuket Old Town",
      },
    },
  },
  {
    match: /on on|thai hua/i,
    meta: {
      x: 50,
      y: 58,
      district: "mueang",
      title: "Heritage buildings with lived-in memory",
      detail:
        "The historic hotel and Thai Hua Museum anchor the old-town story. Their atmosphere feels like history still in use, not just a preserved backdrop.",
      image: {
        src: PHUKET_IMAGES.thaiHua,
        alt: "Phuket Thai Hua Museum heritage building",
      },
    },
  },
  {
    match: /satree/i,
    meta: {
      x: 43,
      y: 49,
      district: "mueang",
      title: "The school-life chapter",
      detail:
        "The school stop frames the coming-of-age pressure, closeness, and uncertainty around the characters. Treat it as an exterior-only checkpoint and respect active school space.",
      image: {
        src: PHUKET_IMAGES.satree,
        alt: "Satree Phuket School exterior",
      },
    },
  },
  {
    match: /saphan hin|kio thian keng/i,
    meta: {
      x: 60,
      y: 62,
      district: "mueang",
      title: "Where the town opens to the sea",
      detail:
        "Saphan Hin feels local and open: a place for walks, exercise, festivals, and sea air. It shifts the route from old-town streets into wider emotional space.",
      image: {
        src: PHUKET_IMAGES.saphanHin,
        alt: "Saphan Hin waterfront area",
      },
    },
  },
  {
    match: /karon/i,
    meta: {
      x: 39,
      y: 63,
      district: "mueang",
      title: "A wide beach for late-afternoon light",
      detail:
        "Karon Beach feels open and far from the compact old town. It suits friend-group energy and scenes where the future begins to feel larger than school life.",
      image: {
        src: PHUKET_IMAGES.karon,
        alt: "Karon Beach in Phuket",
      },
    },
  },
  {
    match: /kantary|cape panwa/i,
    meta: {
      x: 63,
      y: 68,
      district: "mueang",
      title: "A seaside cafe on Cape Panwa",
      detail:
        "The Cape Panwa cafe stop gives the route a private-conversation mood, with the sea as a quiet background for romance and coming-of-age tension.",
      image: {
        src: PHUKET_IMAGES.blueBus,
        alt: "A local blue bus in Phuket",
      },
    },
  },
  {
    match: /panwa house/i,
    meta: {
      x: 68,
      y: 57,
      district: "mueang",
      title: "An old seaside house with emotional weight",
      detail:
        "Panwa House and the nearby hotel setting carry a classic, quiet Phuket mood. They work well for scenes that need privacy, memory, and emotional weight.",
      image: {
        src: PHUKET_IMAGES.sinoColonial,
        alt: "Sino-colonial architecture in Phuket",
      },
    },
  },
  {
    match: /promthep/i,
    meta: {
      x: 51,
      y: 75,
      district: "mueang",
      title: "The cape and the sunset ending",
      detail:
        "Promthep Cape is the clearest closing stop. Sunset, sea horizon, and crowd energy summarize the route's feeling: beautiful, painful, and vivid.",
      image: {
        src: PHUKET_IMAGES.promthep,
        alt: "Promthep Cape viewpoint in Phuket",
      },
    },
  },
];

const FALLBACK_PINS: PinMeta[] = [
  {
    x: 50,
    y: 55,
    district: "mueang",
    title: "Old-town atmosphere stop",
    detail:
      "This point is placed as a mood stop for the route, helping the map tell the city's rhythm, memory, and character atmosphere.",
    image: {
      src: PHUKET_IMAGES.dibuk,
      alt: "Dibuk restaurant and old-town atmosphere in Phuket",
    },
  },
  {
    x: 55,
    y: 61,
    district: "mueang",
    title: "A pacing shift in the route",
    detail:
      "This stop gives the traveler space to slow down and absorb Phuket, instead of moving through the route as a strict checklist.",
    image: {
      src: PHUKET_IMAGES.onOnHotel,
      alt: "The On On Hotel in Phuket Old Town",
    },
  },
  {
    x: 46,
    y: 67,
    district: "mueang",
    title: "A seaside emotional beat",
    detail:
      "The seaside atmosphere opens the route emotionally, letting the place and the characters' feelings sit in the same frame.",
    image: {
      src: PHUKET_IMAGES.kioThianKeng,
      alt: "Kio Thian Keng Shrine in Phuket",
    },
  },
];

function getPinMeta(stop: GeneratedStop, index: number): PinMeta {
  const hit = STOP_CONTEXT.find((item) => item.match.test(stop.name));
  return hit?.meta ?? FALLBACK_PINS[index % FALLBACK_PINS.length];
}

export default function PhuketRouteMap({ stops, accentColor }: PhuketRouteMapProps) {
  const pins = useMemo(
    () =>
      stops.map((stop, index) => ({
        stop,
        index,
        meta: getPinMeta(stop, index),
      })),
    [stops],
  );
  const [activeId, setActiveId] = useState(pins[0]?.stop.id ?? "");
  const activePin = pins.find((pin) => pin.stop.id === activeId) ?? pins[0];

  if (!activePin) return null;

  return (
    <section className="rounded-3xl border border-gold/15 bg-surface shadow-card overflow-hidden mb-6">
      <div className="px-5 md:px-6 py-5 border-b border-gold/15 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gold font-mono">
            Phuket district map
          </p>
          <h2 className="font-serif text-2xl text-ink mt-1">
            I Told Sunset About You Route Map
          </h2>
          <p className="text-sm text-ink/50 mt-1">
            An illustrated Phuket map with approximate pins, designed for storytelling rather than exact navigation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(DISTRICT_LABELS).map(([key, label]) => (
            <span
              key={key}
              className="text-[10px] text-ink/45 border border-ink/10 px-2.5 py-1 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-0">
        <div className="lg:col-span-3 p-4 md:p-6">
          <div className="relative aspect-[977/800] rounded-2xl border border-gold/15 bg-page overflow-hidden">
            <Image
              src={PHUKET_MAP_IMAGE}
              alt="Colorful illustrated map of Phuket, Thailand"
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-contain"
              priority={false}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-surface/10 via-transparent to-surface/20" />

            {pins.map((pin) => {
              const isActive = activePin.stop.id === pin.stop.id;
              return (
                <button
                  key={pin.stop.id}
                  type="button"
                  onClick={() => setActiveId(pin.stop.id)}
                  className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center gap-0.5 group focus:outline-none"
                  style={{ left: `${pin.meta.x}%`, top: `${pin.meta.y}%` }}
                  aria-label={`Open ${pin.stop.name}`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 shadow-card transition-transform ${
                      isActive ? "scale-110 text-surface" : "text-ink bg-surface group-hover:scale-105"
                    }`}
                    style={{
                      background: isActive ? accentColor : "#FBF6EE",
                      borderColor: accentColor,
                    }}
                  >
                    {pin.index + 1}
                  </span>
                  <MapPin
                    className="w-5 h-5 drop-shadow-md"
                    style={{ color: isActive ? accentColor : "#8A6018", fill: isActive ? accentColor : "#FBF6EE" }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <aside className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-gold/15 bg-page/50 p-5 md:p-6">
          <div className="rounded-2xl border border-gold/15 bg-surface p-5 shadow-card">
            {activePin.meta.image && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/15 mb-4 bg-page">
                <Image
                  src={activePin.meta.image.src}
                  alt={activePin.meta.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/45 to-transparent" />
              </div>
            )}

            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink/40">
                  Stop {activePin.index + 1} · Day {activePin.stop.day}
                </p>
                <h3 className="font-serif text-xl text-ink leading-snug mt-1">
                  {activePin.stop.name}
                </h3>
              </div>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ color: accentColor, background: `${accentColor}18` }}
              >
                {DISTRICT_LABELS[activePin.meta.district]}
              </span>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-gold/15 bg-page px-3 py-3 mb-3">
              <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-ink">
                  {activePin.meta.title}
                </p>
                <p className="text-xs text-ink/60 leading-relaxed mt-1">
                  {activePin.meta.detail}
                </p>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">
              Route story
            </p>
            <p className="text-sm text-ink/70 leading-relaxed">
              {activePin.stop.story}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {activePin.stop.fairPriceTHB !== undefined && activePin.stop.fairPriceTHB > 0 && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-canopy/12 text-canopy font-semibold">
                  Fair ฿{activePin.stop.fairPriceTHB}
                </span>
              )}
              {activePin.stop.safetyNote && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-earth/12 text-earth font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Safety note
                </span>
              )}
            </div>

            {activePin.stop.safetyNote && (
              <div className="mt-3 rounded-xl border border-earth/20 bg-earth/6 px-3 py-2">
                <p className="text-xs text-ink/70 leading-relaxed">
                  {activePin.stop.safetyNote}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {pins.map((pin) => (
              <button
                key={pin.stop.id}
                type="button"
                onClick={() => setActiveId(pin.stop.id)}
                className={`text-left rounded-xl border px-3 py-2 transition-all ${
                  activePin.stop.id === pin.stop.id
                    ? "bg-surface border-gold/40"
                    : "bg-surface/60 border-gold/12 hover:border-gold/30"
                }`}
              >
                {pin.meta.image && (
                  <div className="relative h-14 rounded-lg overflow-hidden border border-gold/10 mb-2 bg-page">
                    <Image
                      src={pin.meta.image.src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-[10px] text-ink/35 uppercase tracking-widest">
                  Stop {pin.index + 1}
                </p>
                <p className="text-xs font-semibold text-ink truncate">
                  {pin.stop.name}
                </p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
