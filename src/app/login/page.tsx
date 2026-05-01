"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import TempleSceneSVG from "@/components/TempleSceneSVG";

const TRUST_BADGES = ["TAT Certified", "DNP Verified", "Tourist Police Partner"];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    const displayName = email.includes("@")
      ? email.split("@")[0]
      : email;
    localStorage.setItem("atp_user", displayName.charAt(0).toUpperCase() + displayName.slice(1));
    setTimeout(() => router.push("/app"), 900);
  };

  const handleGuest = () => {
    localStorage.setItem("atp_user", "Traveler");
    router.push("/app");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12"
      style={{ background: "linear-gradient(180deg, #EDD9B0 0%, #F5EDD6 60%, #F5EDD6 100%)" }}
    >
      {/* Temple silhouette bg */}
      <TempleSceneSVG className="opacity-50" />

      {/* Gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #C9922A 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #B5511F 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold text-gradient-gold">
              Amazing Thailand+
            </span>
          </a>
          <p className="text-ink/45 text-sm mt-1.5 font-serif italic">
            Your Digital Travel Passport
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface/92 backdrop-blur-md border border-gold/22 rounded-3xl p-8 shadow-card">
          <h1 className="font-serif text-2xl text-ink font-bold mb-0.5">Welcome back</h1>
          <p className="text-ink/45 text-sm mb-7">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Email */}
            <div>
              <label className="text-[10px] font-semibold text-ink/50 uppercase tracking-[0.18em] block mb-2">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/28" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traveler@example.com"
                  autoComplete="username"
                  className="w-full bg-page border border-gold/22 rounded-xl pl-10 pr-4 py-3 text-ink text-sm placeholder:text-ink/28 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/12 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-semibold text-ink/50 uppercase tracking-[0.18em]">
                  Password
                </label>
                <a href="#" className="text-[11px] text-gold/65 hover:text-gold transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/28" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-page border border-gold/22 rounded-xl pl-10 pr-11 py-3 text-ink text-sm placeholder:text-ink/28 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/28 hover:text-ink/55 transition-colors p-0.5"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-earth font-medium -mt-1">{error}</p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.015 } : undefined}
              whileTap={!loading ? { scale: 0.975 } : undefined}
              className="mt-1 w-full bg-earth text-surface font-bold py-3.5 rounded-xl text-base flex items-center justify-center gap-2 hover:bg-earth-light transition-colors shadow-card-glow disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                  Signing in…
                </>
              ) : "Sign In"}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gold/15" />
              <span className="text-ink/30 text-[11px] font-medium">or</span>
              <div className="flex-1 h-px bg-gold/15" />
            </div>

            {/* Guest */}
            <button
              type="button"
              onClick={handleGuest}
              className="w-full border border-gold/30 text-gold font-semibold py-3 rounded-xl text-sm hover:bg-gold/8 transition-all"
            >
              Continue as Guest
            </button>
          </form>

          <p className="text-center text-ink/35 text-xs mt-6">
            New to Amazing Thailand+?{" "}
            <a href="#" className="text-gold hover:text-gold-dark font-semibold transition-colors">
              Join for free
            </a>
          </p>
        </div>

        {/* Trust row */}
        <div className="flex justify-center gap-2 mt-5 flex-wrap">
          {TRUST_BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 text-[10px] text-ink/30 border border-ink/10 px-3 py-1 rounded-full"
            >
              <ShieldCheck className="w-2.5 h-2.5" />
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
