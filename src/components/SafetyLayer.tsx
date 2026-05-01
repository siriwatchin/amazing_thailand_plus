import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { safetyFeatures } from "@/data/safety";
import { IMAGES } from "@/data/images";
import SafetyCard from "./SafetyCard";

export default function SafetyLayer() {
  return (
    <section id="safety" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-terracotta font-mono text-xs tracking-widest uppercase">
            Trust-First Travel Support
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Travel Safe, Travel Smart
        </h2>
        <p className="text-ink/50 text-center mb-14 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Every journey is backed by verified safety information — from fair pricing
          to emergency protocols — so you can explore Thailand with full confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {safetyFeatures.map((feature, i) => (
            <SafetyCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        {/* Tourist Police banner with editorial photograph */}
        <div className="rounded-2xl overflow-hidden border border-gold/25 shadow-card grid md:grid-cols-5 items-stretch">
          {/* Photo column */}
          <div className="relative md:col-span-2 h-48 md:h-auto">
            <Image
              src={IMAGES.trust.touristPolice}
              alt="A Tourist Police officer helping travelers in Bangkok"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
            <div
              className="absolute inset-0 md:bg-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(15,26,13,0.45) 100%)",
              }}
            />
          </div>
          {/* Content column */}
          <div
            className="md:col-span-3 p-5 md:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: "rgba(201,146,42,0.07)" }}
          >
            <div
              className="p-3 rounded-2xl flex-shrink-0"
              style={{ background: "rgba(201,146,42,0.15)" }}
            >
              <PhoneCall className="w-8 h-8 text-gold" />
            </div>
            <div className="flex-1">
              <p className="font-serif text-xl md:text-2xl text-ink">
                Tourist Police Hotline
              </p>
              <p className="text-ink/55 text-sm mt-1 leading-relaxed">
                Available 24/7 in English, Chinese, Japanese &amp; Thai.
                One tap to call or message — embedded in every itinerary view.
              </p>
            </div>
            <a
              href="tel:1155"
              className="flex-shrink-0 bg-gold text-surface font-bold px-7 py-3 rounded-full text-xl hover:bg-gold-dark transition-colors shadow-gold-glow"
            >
              1155
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
