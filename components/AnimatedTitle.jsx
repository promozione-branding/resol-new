"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({
  text,
  highlight = "",
  className = "",
  highlightClassName = "",
  color = "#FFFFFF",
  highlightColor = "#D4A017",
  delay = 0.2,
  duration = 0.85,
  letterDelay = 0.045,
}) {
  const animateWord = (word, wordDelay, wordClass, wordColor) => {
    return (
      <span
        className={`relative block overflow-hidden whitespace-nowrap ${wordClass}`}
        style={{
          perspective: "1000px",
          color: wordColor,
        }}
      >
        <span className="inline-flex">
          {word.split("").map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={{
                y: "120%",
                rotateX: -75,
                opacity: 0,
              }}
              animate={{
                y: "0%",
                rotateX: 0,
                opacity: 1,
              }}
              transition={{
                duration,
                delay: wordDelay + index * letterDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "inline-block",
                transformOrigin: "bottom",
                transformStyle: "preserve-3d",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </span>
      </span>
    );
  };

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      {text &&
        animateWord(
          text,
          delay,
          "",
          color
        )}

      {highlight &&
        animateWord(
          highlight,
          delay + 0.23,
          highlightClassName,
          highlightColor
        )}
    </div>
  );
}