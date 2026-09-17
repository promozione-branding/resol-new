"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("top");
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();

      setScrolled(rect.bottom <= window.innerHeight / 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
  className={`fixed inset-x-0 top-10 z-30 flex items-center justify-between px-6 transition-all duration-300 md:px-12 md:py-2 ${
    scrolled
      ? "bg-white text-ink border border-black/10 shadow-md"
      : "bg-white/10 text-paper backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
  }`}
>
      {!scrolled && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-inherit">
          <div className="absolute -top-1/2 left-0 h-full w-full bg-gradient-to-b from-white/25 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      )}

   <a href="#top" className="relative z-10 flex flex-col items-center gap-1">
  <img
    src="/logo.png"
    alt="logo"
    width={60}
    height={40}
  />
  <span className="relative overflow-hidden text-xs font-semibold tracking-wide text-white">
    Resol Industries Ltd.
  </span>
</a>

      <nav className="relative z-10 hidden items-center gap-8 text-sm font-bold md:flex">
        <a href="#capabilities" className="transition-colors hover:opacity-70">
          Home
        </a>
        <a href="#process" className="transition-colors hover:opacity-70">
          About
        </a>
        <a href="#contact" className="transition-colors hover:opacity-70">
          Contact
        </a>
                <a href="#articles" className="transition-colors hover:opacity-70">
          Articles
        </a>
                <a href="#industry" className="transition-colors hover:opacity-70">
          Industry
        </a>
      </nav>

      <a
        href="#contact"
        className={`relative z-10 rounded-full border px-5 py-2.5 text-sm font-bold transition-colors ${
          scrolled
            ? "border-ink/20 hover:border-ink"
            : "border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50"
        }`}
      >
        Get in touch
      </a>
    </header>
  );
}