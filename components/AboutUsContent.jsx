"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Sparkles, Star, Zap, Rocket, Gamepad2, Heart, ArrowRight } from "lucide-react";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const reasons = [
  {
    title: "Established Industry Experience",
    desc: "Founded in 2005, we bring extensive experience in importing and distributing industrial materials for customers across India.",
    color: "bg-pink-500",
    top: "22%"
  },
  {
    title: "Customer-Focused Approach",
    desc: "We focus on understanding customer requirements and building long-term relationships through responsive service, reliability, and transparent business practices.",
    color: "bg-cyan-500",
    top: "42%"
  },
  {
    title: "Diverse Product Portfolio",
    desc: "From PVC Resin and Calcium Carbonate to EVA Resin, PET Resin, Plasticizers, Rubber, Fillers, Activators, and Colourants, our product portfolio caters to varied industrial requirements.",
    color: "bg-amber-500",
    top: "62%"
  },
  {
    title: "Pan-India Market Reach",
    desc: "Our operations and distribution network enable us to serve customers across different regions and industries throughout India.",
    color: "bg-emerald-500",
    top: "82%"
  },
];

const pillars = [
  { title: "Quality-Focused Sourcing", dept: "Global Sourcing", label1: "Trusted", label2: "Sources", color: "from-cyan-400 to-blue-500" },
  { title: "Consistent Product Standards", dept: "Quality Control", label1: "Consistent", label2: "Quality", color: "from-pink-400 to-rose-500" },
  { title: "Customer-Centric Approach", dept: "Client Focus", label1: "Customer", label2: "Focus", color: "from-amber-400 to-orange-500" },
  { title: "Long-Term Relationships", dept: "Business Trust", label1: "Lasting", label2: "Trust", color: "from-emerald-400 to-teal-500" },
];

export default function AboutUsContent() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroTextRef = useRef(null);
  const pathRef = useRef(null);
  const toyRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0, 0);

    const ctx = gsap.context(() => {

      // 1. HERO PARALLAX
      gsap.to(heroBgRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Hero text fades up and slides out
      gsap.to(heroTextRef.current, {
        y: "-25%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        }
      });

      // 2. BOARD GAME PATH REVEAL
      const pathLength = pathRef.current?.getTotalLength?.() || 2000;
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".board-game-section",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      if (pathRef.current && toyRef.current) {
        gsap.to(toyRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          scrollTrigger: {
            trigger: ".board-game-section",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // 3. POP-UP PERKS
      gsap.utils.toArray(".perk-station").forEach((station) => {
        gsap.from(station, {
          scale: 0,
          rotation: -20,
          opacity: 0,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: station,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // 4. SECTION REVEALS
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

    }, mainRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="bg-[#082f49] text-white font-quicksand selection:bg-pink-500 selection:text-white relative lg:mt-20 relative overflow-x-hidden"
    >

      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform"
        >
          <Image
            src="/Brightly_lit_empty_playroom_toys_202608081652.jpeg"
            alt="Resol Industries Ltd."
            fill
            className="object-cover saturate-150 brightness-[0.35]"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#082f49]/60 via-transparent to-[#082f49]" />

        <div
          ref={heroTextRef}
          className="relative z-10 text-center px-6 will-change-transform max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#00C4B5] px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-8 lg:mt-8">
            <Sparkles className="w-4 h-4 text-[#FFE66D]" /> ESTABLISHED SINCE 2005
          </div>
          <h1 className="text-[2vw] md:text-[3vw] font-black leading-[0.85] uppercase tracking-tighter text-white drop-shadow-2xl mb-6">
            About Resol Industries Ltd.
            
          </h1>
             <h1 className="text-[4vw] md:text-[6vw] font-black leading-[0.85] uppercase tracking-tighter text-white drop-shadow-2xl mb-6">
           
            <span className="text-cyan-300">Your Trusted PVC Resin Importer.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cyan-150 font-medium max-w-6xl mx-auto leading-relaxed text-white/90 font-semibold">
            Resol Industries Ltd. (RIL) is an established PVC Resin importer founded in 2005, with its head office in New Delhi, India. We specialize in importing and distributing a diverse range of industrial materials, including PVC Resin, Calcium Carbonate, EVA Resin, LLDPE, LDPE, PET Resin, Plasticizers, Natural &amp; Synthetic Rubber, Fillers, Activators and Colorants.
          </p>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs font-bold tracking-widest uppercase">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
          Scroll
        </div> */}
      </section>

      <section className="board-game-section relative w-full min-h-[220vh] bg-[#0ea5e9] overflow-hidden rounded-t-[4rem] border-t-8 border-cyan-300 shadow-[0_-20px_60px_rgba(14,165,233,0.5)]">

        <div className="absolute top-20 inset-x-0 text-center z-20 reveal-up px-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-lg">
            What Sets Us Apart
          </h2>
          <p className="text-cyan-150 font-semibold text-lg mt-4 text-white/90">
            With more than two decades of experience in the industry, we&apos;ve built our business around reliable importing, diverse product offerings, and strong customer relationships.
          </p>
        </div>

        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 2000"
          >
            <path
              ref={pathRef}
              d="M 500,0 C 700,350 200,650 500,1000 C 800,1350 300,1650 500,2000"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="30 18"
            />
          </svg>
        </div>

        <div
          ref={toyRef}
          className="absolute top-0 left-0 w-16 h-16 z-30 pointer-events-none -ml-8 -mt-8"
        >
          <div className="w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center text-pink-500 rotate-90 border-2 border-pink-300">
            <Rocket className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {reasons.map((reason, i) => {
          const isRight = i % 2 === 1;
          const positionStyles = isRight
            ? { top: reason.top, right: "8%" }
            : { top: reason.top, left: "8%" };

          return (
            <div
              key={i}
              className="perk-station absolute z-20"
              style={positionStyles}
            >
              <div className="group relative">
                <div
                  className={`w-80 sm:w-[26rem] p-6 sm:p-8 rounded-[2.2rem] ${reason.color} border-4 border-white shadow-2xl flex flex-col gap-3 items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  <span className="font-black text-white text-2xl sm:text-3xl leading-none uppercase tracking-wider text-center select-none">
                    {reason.title}
                  </span>
                  <p className="text-white/90 text-sm sm:text-base font-semibold leading-relaxed text-center select-none">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="relative py-32 px-6 md:px-12 bg-[#082f49] z-10" style={{ perspective: "1000px" }}>
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight inline-block mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">
              Our Commitment to Quality
            </span>
          </h2>
          <p className="text-xl text-cyan-200 font-medium max-w-2xl mx-auto">
            Hover each box to see what drives our commitment to quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto reveal-up">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="toy-box preserve-3d relative w-full aspect-square cursor-pointer"
              style={{ perspective: "800px" }}
            >
              <div className="absolute inset-0 bg-white rounded-3xl p-6 shadow-xl border-8 border-cyan-100 flex flex-col items-center justify-center overflow-hidden">
                <div className="jack-in-box flex flex-col items-center text-center">
                  <Star className="w-12 h-12 text-amber-400 fill-amber-300 mb-4" />
                  <span className="text-[#0ea5e9] font-bold text-xs uppercase tracking-widest mb-2">{pillar.dept}</span>
                  <h3 className="text-2xl font-black text-[#082f49] leading-tight mb-6">{pillar.title}</h3>
                  <a href="/products" className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-pink-600 transition-colors flex items-center gap-2 text-sm">
                    Explore Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div
                className={`toy-box-lid absolute inset-0 bg-gradient-to-br ${pillar.color} rounded-3xl p-8 shadow-2xl flex flex-col justify-between border-4 border-white/20 overflow-hidden z-10`}
              >
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <span className="text-white/70 font-black tracking-widest uppercase text-xs">
                  Pillar #{idx + 1}
                </span>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white leading-none">{pillar.label1}<br />{pillar.label2}</h3>
                </div>
                <p className="text-center text-white/50 font-bold uppercase text-xs tracking-widest">
                  Hover to Open ↑
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-12 bg-[#082f49] z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 flex flex-col gap-6 text-left reveal-up">
            <span className="text-[#00C4B5] font-black uppercase tracking-widest text-sm">
              OUR BUSINESS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Built Around Reliable Sourcing. <br />
              <span className="bg-gradient-to-r from-[#00C4B5] via-[#38BDF8] to-[#FFE66D] bg-clip-text text-transparent">Driven by Long-Term Relationships.</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-semibold">
              Our business is built around international sourcing and the import of industrial materials for the Indian market. We work with established global sources to maintain a diverse product portfolio and dependable availability. Our products are marketed under the Resol Industries brand, allowing us to build a consistent presence in the Indian market while maintaining our focus on product quality and customer requirements.
            </p>
            <p className="text-[#00C4B5] text-lg sm:text-xl font-black tracking-wide">
              Reliable sourcing. Consistent quality. Nationwide reach.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center reveal-up w-full">
            <div className="relative w-full h-[240px] sm:h-[340px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="/about-us-4.webp"
                alt="Resol Industries Quality-Checked Industrial Materials"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      <section className="py-28 px-6 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] text-center relative overflow-hidden rounded-t-[3rem]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto reveal-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            LET’S DISCUSS YOUR REQUIREMENTS
          </h2>
          <p className="text-cyan-50 text-lg sm:text-xl font-semibold mb-10 max-w-2xl mx-auto text-white/95">
            Looking for PVC Resin, Calcium Carbonate, or other imported industrial materials? Get in touch with Resol Industries to discuss your requirements and find the right products for your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-block bg-white text-[#0284c7] px-8 py-4 rounded-full font-black text-base sm:text-lg shadow-[0_5px_0_rgb(2,132,199)] hover:translate-y-0.5 hover:shadow-[0_2px_0_rgb(2,132,199)] transition-all duration-200 uppercase tracking-wide">
              Contact Us Today
            </Link>
            <Link href="/products" className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-black text-base sm:text-lg hover:bg-white/10 transition-colors uppercase tracking-wide">
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}