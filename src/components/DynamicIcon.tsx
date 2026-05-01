"use client";

import {
  Mountain,
  Sword,
  Stamp,
  ShieldCheck,
  BookOpen,
  Users,
  Sparkles,
  BadgeDollarSign,
  AlertTriangle,
  Clock,
  Phone,
  HeartPulse,
  Check,
  Lock,
  MapPin,
  Star,
  Loader2,
  Mic,
  Play,
  Award,
  PhoneCall,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Mountain,
  Sword,
  Stamp,
  ShieldCheck,
  BookOpen,
  Users,
  Sparkles,
  BadgeDollarSign,
  AlertTriangle,
  Clock,
  Phone,
  HeartPulse,
  Check,
  Lock,
  MapPin,
  Star,
  Loader2,
  Mic,
  Play,
  Award,
  PhoneCall,
};

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
