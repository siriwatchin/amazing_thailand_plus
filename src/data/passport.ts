export interface PassportStamp {
  id: string;
  name: string;
  region: string;
  emoji: string;
  collected: boolean;
  dateCollected?: string;
  color: string;
}

export const passportStamps: PassportStamp[] = [
  { id: "doi-suthep",   name: "Doi Suthep",      region: "Chiang Mai",        emoji: "⛩️",  collected: true,  dateCollected: "Mar 14", color: "#C9922A" }, // antique gold — temple
  { id: "grand-palace", name: "Grand Palace",     region: "Bangkok",           emoji: "👑",  collected: true,  dateCollected: "Jan 3",  color: "#C9922A" }, // antique gold — palace
  { id: "erawan",       name: "Erawan Falls",     region: "Kanchanaburi",      emoji: "💧",  collected: true,  dateCollected: "Feb 20", color: "#4A8C5C" }, // forest green — nature
  { id: "phi-phi",      name: "Phi Phi Islands",  region: "Krabi",             emoji: "🏝️", collected: true,  dateCollected: "Apr 1",  color: "#1A8A7A" }, // river teal — sea
  { id: "night-bazaar", name: "Night Bazaar",     region: "Chiang Rai",        emoji: "🌙",  collected: true,  dateCollected: "Mar 28", color: "#C4742A" }, // terracotta — market/fire
  { id: "ayutthaya",    name: "Ayutthaya Ruins",  region: "Ayutthaya",         emoji: "🏛️", collected: true,  dateCollected: "Jan 15", color: "#C9922A" }, // antique gold — history
  { id: "khao-yai",     name: "Khao Yai Park",    region: "Nakhon Ratchasima", emoji: "🦜",  collected: true,  dateCollected: "Apr 10", color: "#4A8C5C" }, // forest green — wildlife
  { id: "floating-mkt", name: "Floating Market",  region: "Damnoen Saduak",    emoji: "🛶",  collected: false, color: "#C4742A" }, // terracotta — culture
  { id: "phuket-old",   name: "Phuket Old Town",  region: "Phuket",            emoji: "🎨",  collected: false, color: "#C4742A" }, // terracotta — heritage
  { id: "pai-canyon",   name: "Pai Canyon",        region: "Mae Hong Son",      emoji: "🌄",  collected: false, color: "#8A6018" }, // deep amber — earth canyon
  { id: "sukhothai",    name: "Sukhothai Park",    region: "Sukhothai",         emoji: "🗿",  collected: false, color: "#C9922A" }, // antique gold — ancient kingdom
  { id: "koh-samui",    name: "Koh Samui Sunset", region: "Surat Thani",       emoji: "🌅",  collected: false, color: "#1A8A7A" }, // teal — sea
];

export const passportMeta = {
  totalStamps: 12,
  collectedStamps: 7,
  level: "Gold Explorer",
  nextLevel: "Platinum Wanderer",
  stampsToNextLevel: 2,
};
