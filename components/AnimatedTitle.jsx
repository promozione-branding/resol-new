"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";


function RevealWords({
  text,
  color,
  className = "",
  startDelay,
  stagger,
  duration,
  inView,
}) {
  const words = (text || "").split(" ").filter(Boolean);

  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className="inline-block overflow-hidden align-bottom pb-[0.18em] mb-[-0.18em]"
            style={{ perspective: "900px" }}
          >
            <motion.span
              className={`inline-block will-change-transform ${className}`}
              style={color ? { color } : undefined}
              initial={{ y: "120%", rotateX: -70, opacity: 0 }}
              animate={
                inView
                  ? { y: "0%", rotateX: 0, opacity: 1 }
                  : { y: "120%", rotateX: -70, opacity: 0 }
              }
              transition={{
                duration,
                delay: startDelay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function AnimatedTitle({
  text,
  highlight = "",
  lines,
  as: Tag = "div",
  className = "",
  highlightClassName = "",
  color = "#FFFFFF",
  highlightColor,
  delay = 0.1,
  duration = 0.8,
  wordDelay = 0.08,
  once = true,
  amount = 0.4,
  breakBeforeHighlight = false,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  if (lines && lines.length) {
    let wordOffset = 0;
    return (
      <Tag ref={ref} className={className} {...rest}>
        {lines.map((line, li) => {
          const lineWords = (line.text || "").split(" ").filter(Boolean);
          const startDelay = delay + wordOffset * wordDelay;
          wordOffset += lineWords.length;
          return (
            <span key={li}>
              <RevealWords
                text={line.text}
                color={line.color || color}
                className={line.className}
                startDelay={startDelay}
                stagger={wordDelay}
                duration={duration}
                inView={inView}
              />
              {li < lines.length - 1 ? <br /> : null}
            </span>
          );
        })}
      </Tag>
    );
  }

  const words = (text || "").split(" ").filter(Boolean);

  return (
    <Tag ref={ref} className={className} {...rest}>
      <RevealWords
        text={text}
        color={color}
        startDelay={delay}
        stagger={wordDelay}
        duration={duration}
        inView={inView}
      />
      {highlight ? (
        <>
          {breakBeforeHighlight ? <br /> : " "}
          <RevealWords
            text={highlight}
            color={highlightColor || color}
            className={highlightClassName}
            startDelay={delay + words.length * wordDelay}
            stagger={wordDelay}
            duration={duration}
            inView={inView}
          />
        </>
      ) : null}
    </Tag>
  );
}