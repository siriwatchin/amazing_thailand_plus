import { routes } from "@/data/routes";
import RouteCard from "./RouteCard";

export default function RouteDemo() {
  return (
    <section id="routes" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-gold font-mono text-xs tracking-widest uppercase">
            Curated by Experts · Verified by Government
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Choose Your Story Route
        </h2>
        <p className="text-ink/50 text-center mb-14 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Every route is a verified, story-first journey with historical context,
          cultural guidance, and trust badges at every stop.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {routes.map((route, i) => (
            <RouteCard key={route.id} route={route} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="text-ink/40 hover:text-gold transition-colors text-sm font-medium border border-ink/15 hover:border-gold/40 px-6 py-2.5 rounded-full">
            Browse All Routes →
          </button>
        </div>
      </div>
    </section>
  );
}
