"use client";

import { useRef, useEffect } from "react";

const SVG_MASK = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1100 200' preserveAspectRatio='xMidYMid meet'><text x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Arial,sans-serif' font-weight='900' font-size='100' fill='black'>RESOL INDUSTRIES</text></svg>")`;

const initialMaskSize = 0.8;

/* RESOL INDUSTRIES ko chota kiya */
const targetMaskSize = 27;

const easing = 0.15;

export default function Cta() {
  const container = useRef(null);
  const stickyMask = useRef(null);
  const innerMedia = useRef(null);
  const headerText = useRef(null);

  useEffect(() => {
    let easedScrollProgress = 0;
    let rafId = 0;

    const animate = () => {
      if (
        stickyMask.current &&
        container.current &&
        innerMedia.current
      ) {
        const containerRect =
          container.current.getBoundingClientRect();

        const totalScrollHeight =
          containerRect.height - window.innerHeight;

        const scrollProgress =
          totalScrollHeight > 0
            ? Math.max(
                0,
                -containerRect.top / totalScrollHeight
              )
            : 0;

        const delta =
          scrollProgress - easedScrollProgress;

        easedScrollProgress += delta * easing;

        const progress = Math.max(
          0,
          Math.min(1, easedScrollProgress)
        );

        const isMobile = window.innerWidth < 640;

        /* =========================
           HEADER
        ========================= */

        if (headerText.current) {
          headerText.current.style.opacity = `${Math.max(
            0,
            1 - scrollProgress * 8
          )}`;
        }

        /* =========================
           PHASE 1 — MASK ZOOM
        ========================= */

        const zoomProgress = Math.min(
          1,
          progress / 0.6
        );

        /* Mobile par bhi text chota */
        const mobileTargetSize = 22;

        const currentTargetSize = isMobile
          ? mobileTargetSize
          : targetMaskSize;

        const maskSize =
          (initialMaskSize +
            currentTargetSize *
              Math.pow(zoomProgress, 3)) *
          100;

        if (zoomProgress > 0.99) {
          stickyMask.current.style.maskImage = "none";
          stickyMask.current.style.webkitMaskImage =
            "none";
        } else {
          stickyMask.current.style.maskImage =
            SVG_MASK;

          stickyMask.current.style.webkitMaskImage =
            SVG_MASK;

          stickyMask.current.style.maskSize =
            `${maskSize}%`;

          stickyMask.current.style.webkitMaskSize =
            `${maskSize}%`;
        }

        /* =========================
           PHASE 2 — IMAGE SHRINK
        ========================= */

        const shrinkProgress = Math.max(
          0,
          (progress - 0.6) / 0.4
        );

        /*
         * Video ko bahut zyada shrink nahi karenge.
         */

        const scale = isMobile
          ? 1 - shrinkProgress * 0.035
          : 1 - shrinkProgress * 0.055;

        /*
         * Video screen ke andar hi move karega.
         */

        const translateY = isMobile
          ? shrinkProgress * 10
          : shrinkProgress * 18;

        /*
         * Corner radius kam rakha.
         */

        const borderRadius = isMobile
          ? shrinkProgress * 14
          : shrinkProgress * 20;

        innerMedia.current.style.transform =
          `scale(${scale}) translateY(${translateY}px)`;

        innerMedia.current.style.borderRadius =
          `${borderRadius}px`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="relative bg-[#0f0f11]">

      {/* =========================
          SCROLL CONTAINER
      ========================= */}

      <div
        ref={container}
        className="relative h-[220vh] sm:h-[250vh]"
      >

        {/* =========================
            STICKY SCREEN
        ========================= */}

        <div
          className="
            sticky
            top-0
            flex
            h-[100svh]
            min-h-[600px]
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-black
          "
        >

          {/* =========================
              HEADER
          ========================= */}

          <div
            ref={headerText}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[27%]
              z-20
              w-full
              -translate-x-1/2
              px-5
              text-center
              sm:top-[30%]
            "
          >

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                leading-relaxed
                tracking-[0.18em]
                text-white/80
                sm:text-sm
                sm:tracking-[0.3em]
              "
            >
              INDUSTRIAL MATERIAL SOLUTIONS
            </p>

          </div>


          {/* =========================
              RESOL INDUSTRIES MASK
          ========================= */}

          <div
            ref={stickyMask}
            className="
              absolute
              inset-0
              flex
              h-full
              w-full
              items-center
              justify-center
              overflow-hidden
            "
            style={{
              maskImage: SVG_MASK,
              WebkitMaskImage: SVG_MASK,

              /*
               * Text ko thoda upar rakha
               */

              maskPosition: "50% 53%",
              WebkitMaskPosition: "50% 53%",

              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",

              /*
               * Initial text size smaller
               */

              maskSize: "65%",
              WebkitMaskSize: "65%",
            }}
          >

            {/* =========================
                VIDEO
            ========================= */}

            <div
              ref={innerMedia}
              className="
                relative
                h-full
                w-full
                origin-center
                transform-gpu
                overflow-hidden
                will-change-transform
              "
            >

              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              >
                <source
                  src="/13753874_1280_720_25fps.mp4"
                  type="video/mp4"
                />
              </video>


            </div>

          </div>

        </div>

      </div>

    </main>
  );
}