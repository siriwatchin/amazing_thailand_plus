import Image from "next/image";
import { trustTiers } from "@/data/trust";
import TrustCard from "./TrustCard";
import { IMAGES } from "@/data/images";

export default function TrustLayer() {
  return (
    <section id="trust" className="py-24 px-4 bg-page-raised"
      style={{ background: "linear-gradient(180deg, #F5EDD6 0%, #EDD9B0 50%, #F5EDD6 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-gold font-mono text-xs tracking-widest uppercase">
            The Product Moat
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Built on Four Layers of Trust
        </h2>
        <p className="text-ink/50 text-center mb-12 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Every fact, every route, every price is traceable to its source. Not just AI —
          human expertise and official authority, layered on top.
        </p>

        {/* Tier indicator bar */}
        <div className="flex justify-center mb-10">
          <div className="flex items-end gap-2">
            {trustTiers.map((tier) => (
              <div key={tier.id} className="flex flex-col items-center gap-1">
                <div
                  className="rounded-sm opacity-80"
                  style={{
                    width:      `${20 + tier.tier * 14}px`,
                    height:     `${tier.tier * 3 + 3}px`,
                    background: tier.accentColor,
                  }}
                />
                <span className="text-[10px] text-ink/35">{tier.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustTiers.map((tier) => (
            <TrustCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="text-center text-ink/30 text-xs mt-10 max-w-lg mx-auto">
          No information is published without passing through all four trust layers. AI only assembles — humans verify.
        </p>

        {/* Editorial moment — humans behind the trust */}
        <div className="mt-14 grid md:grid-cols-2 gap-6 items-center max-w-5xl mx-auto">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-gold/20 shadow-card">
            <Image
              src={IMAGES.trust.monkTraveler}
              alt="A monk and a traveler share a quiet moment of blessing inside a Thai temple"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(15,26,13,0.45) 100%)",
              }}
            />
            <span className="absolute bottom-3 left-3 text-[10px] text-surface/85 font-mono tracking-widest uppercase">
              Tier 2 · Expert &amp; Cultural
            </span>
          </div>
          <div>
            <span className="text-jade font-mono text-xs tracking-widest uppercase">
              Humans first
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mt-2 leading-snug">
              Behind every citation, a person who&apos;s been there.
            </h3>
            <p className="text-ink/55 text-base mt-4 leading-relaxed">
              Monks, historians, licensed guides, Tourist Police, park rangers,
              and the travelers who walked the route before you — every fact in
              Amazing Thailand Plus traces back to a name and a face. AI is the
              assistant. Trust is the product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
