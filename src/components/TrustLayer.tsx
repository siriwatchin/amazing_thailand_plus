import { trustTiers } from "@/data/trust";
import TrustCard from "./TrustCard";

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
      </div>
    </section>
  );
}
