"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-10 z-30 flex items-center justify-between px-6 transition-colors duration-300 md:px-12 md:py-2 ${
        scrolled
          ? "bg-paper text-ink shadow-sm"
          : "bg-transparent text-paper"
      }`}
    >
      <a href="#top" className="flex items-center gap-2">
        <img
          src="https://resol-tan.vercel.app/_next/image?url=%2FNew-Project-6-e1775111050628.webp&w=640&q=75"
          alt="logo"
          width={60}
          height={40}
        />
      </a>

      <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
        <a href="#capabilities" className="transition-colors hover:opacity-70">
          Home
        </a>
        <a href="#process" className="transition-colors hover:opacity-70">
          About
        </a>
        <a href="#contact" className="transition-colors hover:opacity-70">
          Contact
        </a>
      </nav>
      <a
        href="#contact"
        className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-colors ${
          scrolled
            ? "border-ink/20 hover:border-ink"
            : "border-paper/40 hover:border-paper"
        }`}
      >
        Get in touch
      </a>
    </header>
  );
}