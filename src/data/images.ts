// Centralized photography registry. All paths are relative to /public.
// One place to update if filenames change.

export const IMAGES = {
  hero: {
    ayutthayaGoldenHour:
      "/images/hero/ayutthaya_at_golden_hour_emotional_opener.png",
    bangkokSkylineBlueHour:
      "/images/hero/bangkok_rooftop_temple_skyline_at_blue_hour.png",
  },
  story: {
    seriesFilmLocation:
      "/images/story_soft_power_route/drama_tourism_mood_series_filming_location.png",
    samyanNight:
      "/images/story_soft_power_route/bangkok_samyan_filming_district_at_night.png",
  },
  nature: {
    khaoYaiElephants:
      "/images/nature_and_national_parks/khao_yai_dawn_with_wild_elephants.png",
    erawanFalls:
      "/images/nature_and_national_parks/erawan_falls_emerald_pool.png",
  },
  food: {
    yaowarat: "/images/food_and_markets/yaowarat_street_food_after_sunset.png",
  },
  coast: {
    phiPhiSunrise: "/images/coastal_islands/phi_phi_limestone_karst_at_sunrise.png",
  },
  phuket: {
    banner: "/images/phuket/phuket_banner.avif",
  },
  trust: {
    monkTraveler:
      "/images/cultural_trust_authority/monk_traveler_quiet_moment.png",
    touristPolice:
      "/images/cultural_trust_authority/tourist_police_partnership.png",
  },
} as const;

// Per-route hero images (matched by Route.id).
export const ROUTE_HERO_IMAGES: Record<string, string> = {
  "phiang-ther":            IMAGES.story.seriesFilmLocation,
  "i-told-sunset-about-you": IMAGES.phuket.banner,
  "king-naresuan":          IMAGES.hero.ayutthayaGoldenHour,
  "national-park-passport": IMAGES.nature.khaoYaiElephants,
};

// Per-route secondary / detail-page background image.
export const ROUTE_DETAIL_IMAGES: Record<string, string> = {
  "phiang-ther":            IMAGES.story.samyanNight,
  "i-told-sunset-about-you": IMAGES.phuket.banner,
  "king-naresuan":          IMAGES.hero.bangkokSkylineBlueHour,
  "national-park-passport": IMAGES.nature.erawanFalls,
};
