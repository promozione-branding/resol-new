"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

const capabilities = [
  {
    number: "01",
    title: "20+ Years of Industry Experience",
    description:
      "Established in 2005, Resol Industries brings extensive experience in importing and distributing industrial materials across India.",
    image: "/industry3.webp",
    tag: "EXPERIENCE",
  },
  {
    number: "02",
    title: "Trusted Importing Network",
    description:
      "We work with an established network of international sources to bring high-quality industrial materials to businesses across the Indian market.",
    image: "/Polystyrene.webp",
    tag: "GLOBAL SOURCING",
  },
  {
    number: "03",
    title: "Wide Product Applications",
    description:
      "Our materials serve diverse industries including PVC pipes and fittings, footwear, flooring, packaging, plastics, adhesives, textiles and coatings.",
    image: "/industry3.webp",
    tag: "APPLICATIONS",
  },
  {
    number: "04",
    title: "Reliable Supply Solutions",
    description:
      "We focus on consistent product quality, dependable supply and transparent business practices while building long-term customer relationships.",
    image: "/Polystyrene.webp",
    tag: "RELIABILITY",
  },
];

export default function Scroll() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth);
      }

      setViewportWidth(window.innerWidth);
    };

    updateWidths();

    const resizeObserver = new ResizeObserver(updateWidths);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateWidths);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidths);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scrollDistance = Math.max(
    containerWidth - viewportWidth,
    0
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollDistance]
  );

  return (
    <section
      ref={targetRef}
      className="relative bg-[#F4F2EC] font-['Manrope']"
      style={{
        height: `${
          containerWidth
            ? Math.max(scrollDistance / 5 + 100, 200)
            : 500
        }vh`,
      }}
    >

      <div className="sticky top-0 flex h-screen items-center overflow-hidden">


        <div className="absolute left-0 top-0 z-50 h-[3px] w-full bg-black/10">
          <motion.div
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
            className="h-full bg-[#D4A017]"
          />
        </div>


        <div className="absolute left-6 top-7 z-40 flex items-center gap-4 lg:left-12">
          <span className="h-[1px] w-10 bg-black/30" />

          <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-[4px] text-black/50">
            Resol Industries / About
          </span>
        </div>


        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex h-full w-max items-center gap-0"
        >



          <div className="relative flex h-screen w-[90vw] shrink-0 items-center bg-[#111111] px-8 md:w-[720px] md:px-16 lg:w-[800px] lg:px-20">


            <div className="absolute left-0 top-0 h-full w-[4px] bg-[#D4A017]" />


            <div className="pointer-events-none absolute bottom-[-25px] right-[-20px] font-['Manrope'] text-[260px] font-extrabold leading-none tracking-[-25px] text-white/[0.025]">
              02
            </div>

            <div className="relative z-10">

              <div className="flex items-center gap-4">
                <span className="h-[2px] w-10 bg-[#D4A017]" />

                <span className="text-[10px] font-bold uppercase tracking-[4px] text-[#D4A017]">
                  Our Difference
                </span>
              </div>
<AnimatedTitle
          as="h1"
          text="Why Resol?"
          color="#ffffff"
          delay={0.8}
          duration={0.8}
          wordDelay={0.08}
          amount={0.2}
          className="mt-8 font-['Manrope'] text-[54px] font-extrabold leading-[0.98] tracking-[-3px] text-white md:text-[70px]"
        />
              

              <p className="mt-9 max-w-[520px] text-[14px] leading-[2] text-white/55 md:text-[16px]">
                We combine industry experience, trusted international
                sourcing, quality-focused products and reliable supply
                solutions to support businesses across diverse manufacturing
                applications.
              </p>

              <div className="mt-12 flex items-center gap-5">

                <span className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[3px] text-white/35">
                  Scroll to explore
                </span>

                <span className="h-[1px] w-20 bg-[#D4A017]" />

              </div>

            </div>
          </div>


          {capabilities.map((item, index) => (
            <div
              key={item.number}
              className="relative flex h-screen w-[88vw] shrink-0 items-center px-6 md:w-[650px] lg:w-[700px] lg:px-12"
            >


              <div className="pointer-events-none absolute bottom-[-25px] left-0 z-0 font-['Manrope'] text-[270px] font-extrabold leading-none tracking-[-25px] text-black/[0.045] md:text-[360px]">
                {item.number}
              </div>


              <div className="relative z-10 h-[70vh] w-full overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-1000 hover:scale-105"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />


                <div className="absolute left-0 top-0 flex items-center gap-3 bg-[#D4A017] px-5 py-3">

                  <span className="font-['Manrope'] text-[11px] font-extrabold text-black">
                    {item.number}
                  </span>

                  <span className="h-3 w-[1px] bg-black/30" />

                  <span className="text-[9px] font-bold uppercase tracking-[2px] text-black">
                    {item.tag}
                  </span>

                </div>


                <div className="absolute bottom-0 left-0 w-full p-7 md:p-10">

                  <div className="mb-5 h-[2px] w-14 bg-[#D4A017]" />

                  <h3 className="max-w-[550px] font-['Manrope'] text-[34px] font-extrabold leading-[1.05] tracking-[-1.5px] text-white md:text-[35px]">

                    {item.title}

                  </h3>

                  <p className="mt-5 max-w-[500px] text-[13px] leading-[1.9] text-white/65 md:text-[15px]">
                    {item.description}
                  </p>

                </div>

              </div>
            </div>
          ))}


          <div className="relative flex h-screen w-[90vw] shrink-0 items-center bg-[#D4A017] px-8 md:w-[720px] md:px-16 lg:w-[850px] lg:px-20">


            <div className="pointer-events-none absolute bottom-[-20px] right-[-20px] font-['Manrope'] text-[300px] font-extrabold leading-none tracking-[-30px] text-black/[0.06]">
              06
            </div>

            <div className="relative z-10">

              <div className="flex items-center gap-4">

                <span className="h-[2px] w-12 bg-black/50" />

                <span className="text-[10px] font-bold uppercase tracking-[4px] text-black/55">
                  Resol Industries Ltd.
                </span>

              </div>

              <h2 className="mt-8 max-w-[700px] font-['Manrope'] text-[50px] font-extrabold leading-[0.96] tracking-[-3px] text-black md:text-[55px]">

                Quality

                <br />

                Materials.

                <br />

                <span className="text-white">
                  Reliable
                </span>

                <br />

                Partnerships.

              </h2>

              <p className="mt-8 max-w-[520px] text-[14px] leading-[1.9] text-black/60 md:text-[16px]">
                Building long-term relationships through dependable supply,
                consistent quality and transparent business practices.
              </p>

              <a
                href="/contact"
                className="mt-10 inline-flex items-center gap-5 bg-black px-8 py-4 font-['Manrope'] text-[13px] font-bold uppercase tracking-[2px] text-[#D4A017] transition duration-300 hover:bg-[#222222]"
              >
                Contact Us

                <span className="text-lg">
                  →
                </span>
              </a>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

