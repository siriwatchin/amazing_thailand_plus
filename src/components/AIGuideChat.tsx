"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { getProvider } from "@/lib/ai/provider";
import type { GuideAnswer } from "@/lib/ai/types";

const QUICK_QUESTIONS = [
  "Tuk-tuk fair price from Suvarnabhumi?",
  "Is Ayutthaya safe at night?",
  "Who was King Naresuan?",
  "Temple etiquette basics?",
];

export default function AIGuideChat() {
  const [input, setInput] = useState("");
  const [pendingQ, setPendingQ] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [answer, setAnswer] = useState<GuideAnswer | null>(null);

  const ask = async (q: string) => {
    if (isAsking || !q.trim()) return;
    setPendingQ(q);
    setAnswer(null);
    setIsAsking(true);
    try {
      const result = await getProvider().askGuide(q);
      setAnswer(result);
    } finally {
      setIsAsking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q);
  };

  const confidenceColor =
    answer?.confidence === "high"
      ? "#4A8C5C"
      : answer?.confidence === "medium"
      ? "#C9922A"
      : "#C4652A";

  return (
    <section id="ai-guide" className="py-24 px-4 bg-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-gold font-mono text-xs tracking-widest uppercase">
            AI Travel Guide · Ask Anything
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-ink mb-4">
          Your Expert AI Companion
        </h2>
        <p className="text-ink/55 text-center mb-12 text-base md:text-lg max-w-xl mx-auto">
          Every answer is sourced from verified authorities — TAT, Tourist Police,
          historians, and cultural experts. Not guesswork.
        </p>

        <div className="grid md:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* LEFT — Quick questions + input */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="text-ink/40 text-xs uppercase tracking-widest font-medium mb-1">
              Ask a question
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-surface border border-gold/22 rounded-xl px-3 py-2.5 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/12"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type any question…"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isAsking}
                className="text-gold disabled:text-ink/20 hover:text-gold-dark transition-colors"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-ink/35 text-[11px] uppercase tracking-widest mt-1">
              Or try a popular one
            </p>
            {QUICK_QUESTIONS.map((q) => (
              <motion.button
                key={q}
                onClick={() => ask(q)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left px-4 py-3 rounded-2xl border text-sm transition-all ${
                  pendingQ === q
                    ? "border-earth bg-earth/8 text-ink font-medium"
                    : "border-gold/20 bg-surface text-ink/70 hover:border-earth/40 hover:text-ink"
                }`}
              >
                <span className="text-gold mr-2">→</span>
                {q}
              </motion.button>
            ))}
            <p className="text-ink/30 text-xs mt-2 leading-relaxed">
              All answers cite their primary source and trust layer.
            </p>
          </div>

          {/* RIGHT — Chat bubble */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-gold/15 bg-surface shadow-card min-h-[320px] p-6 flex flex-col relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{ background: "radial-gradient(#C9922A, transparent)" }}
              />

              <AnimatePresence mode="wait">
                {!pendingQ && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center flex-1 gap-4 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Bot className="w-7 h-7 text-gold" />
                    </div>
                    <p className="text-ink/40 text-sm max-w-xs">
                      Type a question or pick one on the left to get a verified, sourced answer.
                    </p>
                  </motion.div>
                )}

                {isAsking && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 flex-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-gold"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                    <p className="text-ink/40 text-xs">Consulting verified sources…</p>
                  </motion.div>
                )}

                {answer && !isAsking && (
                  <motion.div
                    key={pendingQ ?? "ans"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 flex-1"
                  >
                    <div className="self-end bg-earth/10 border border-earth/20 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
                      <p className="text-ink text-sm font-medium">{answer.question}</p>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-page border border-gold/15 rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="text-ink/80 text-sm leading-relaxed whitespace-pre-wrap">
                            <TypewriterText text={answer.answer} speed={16} />
                          </p>
                        </div>
                        {/* Citations + confidence */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 ml-1">
                          {answer.citations.map((c) => (
                            <span
                              key={c.source}
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                              style={{
                                background: `${c.trustColor}18`,
                                color: c.trustColor,
                              }}
                            >
                              ✓ {c.trustLabel}
                            </span>
                          ))}
                          <span
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              background: `${confidenceColor}18`,
                              color: confidenceColor,
                            }}
                          >
                            Confidence: {answer.confidence}
                          </span>
                        </div>
                        <p className="text-[10px] text-ink/35 mt-1.5 ml-1">
                          {answer.citations.map((c) => c.source).join(" · ")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
