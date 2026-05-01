"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Story Routes",  href: "#routes" },
  { label: "AI Builder",    href: "#ai-builder" },
  { label: "AI Guide",      href: "#ai-guide" },
  { label: "Trust Layer",   href: "#trust" },
  { label: "Passport",      href: "#passport" },
  { label: "Safety",        href: "#safety" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/94 backdrop-blur-md shadow-sm border-b border-gold/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-gradient-gold">
            Amazing Thailand+
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-ink/60 hover:text-gold transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="/login"
          className="hidden lg:inline-flex items-center gap-2 bg-earth text-surface font-bold px-5 py-2 rounded-full text-sm hover:bg-earth-light transition-colors"
        >
          Sign In
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden text-ink/70 p-2 rounded-lg hover:bg-ink/8 transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-surface/97 backdrop-blur-md border-t border-gold/15"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-3 text-ink/70 hover:text-gold hover:bg-gold/8 rounded-lg transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-earth text-surface font-bold py-3 rounded-full hover:bg-earth-light transition-colors"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
