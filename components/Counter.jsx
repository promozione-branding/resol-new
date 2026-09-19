"use client";

import {
  FaIndustry,
  FaUsers,
  FaBusinessTime,
  FaLayerGroup
} from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import AnimatedTitle from "@/components/AnimatedTitle";

/* ============================================================
   COUNTER DATA
============================================================ */

const counters = [
  {
    number: 10,
    suffix: "+",
    title: "Industries Served",
    icon: FaIndustry,
  },
  {
    number: 30,
    suffix: "+",
    title: "Resource Strength",
    icon: FaLayerGroup,
  },
  {
    number: 25,
    suffix: "+",
    title: "Years in Business",
    icon: FaBusinessTime,
  },
  {
    number: 1500,
    suffix: "+",
    title: "Customer Base",
    icon: FaUsers,
  },
];

/* ============================================================
   COUNT UP
============================================================ */

function CountUp({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 1800;
    const incrementTime = 25;
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

/* ============================================================
   SINGLE STAT
============================================================ */

function StatItem({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group
        relative
        min-h-[290px]
        overflow-hidden
        border-b
        border-white/10
        px-5
        py-8
        sm:px-7
        lg:min-h-[330px]
        lg:border-b-0
        lg:border-r
        lg:px-8
        xl:px-10
      "
    >

      {/* ======================================================
          GIANT BACKGROUND NUMBER
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          delay: 0.3 + index * 0.1,
        }}
        className="
          pointer-events-none
          absolute
          -right-3
          -top-8
          select-none
          text-[130px]
          font-black
          leading-none
          tracking-[-10px]
          text-white/[0.035]
          transition-all
          duration-700
          group-hover:text-[#D4A017]/[0.09]
          group-hover:scale-105
        "
      >
        0{index + 1}
      </motion.div>


      {/* ======================================================
          TOP META
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-3">

          <motion.span
            variants={{
              rest: {
                width: 22,
              },
              hover: {
                width: 42,
              },
            }}
            initial="rest"
            whileHover="hover"
            className="
              h-[1px]
              bg-[#D4A017]
            "
          />

          <span
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[3px]
              text-white/35
            "
          >
            0{index + 1}
          </span>

        </div>


        {/* ICON */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.12,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            border
            border-[#D4A017]/30
            text-[#D4A017]
            transition-colors
            duration-500
            group-hover:border-[#D4A017]
            group-hover:bg-[#D4A017]
            group-hover:text-black
          "
        >
          <Icon className="text-base" />
        </motion.div>

      </div>



      <div className="relative z-10 mt-12">

        <motion.div
          whileHover={{
            x: 6,
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            text-[40px]
            font-black
            leading-none
            tracking-[-4px]
            text-[#D4A017]
            sm:text-[45px]
            lg:text-[50px]
            xl:text-[55px]
          "
        >
          <CountUp
            end={item.number}
            suffix={item.suffix}
          />
        </motion.div>


        {/* GOLD UNDERLINE */}

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: 55,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mt-5
            h-[2px]
            bg-[#D4A017]
          "
        />

      </div>



      <div className="relative z-10 mt-7">

        <h3
          className="
            text-[15px]
            font-bold
            uppercase
            tracking-[1px]
            text-white
            sm:text-base
          "
        >
          {item.title}
        </h3>


      </div>



      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.45 + index * 0.1,
        }}
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-full
          origin-left
          bg-[#D4A017]
          lg:hidden
        "
      />

    </motion.div>
  );
}

/* ============================================================
   MAIN COUNTER
============================================================ */

export default function Counter() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#0A0A0A]
        py-20
        text-white
        md:py-12
        lg:py-15
      "
    >

      {/* ======================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.5) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />


      {/* ======================================================
          GOLDEN GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          top-[-180px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#D4A017]/[0.06]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-[200px]
          left-[-150px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#D4A017]/[0.04]
          blur-[120px]
        "
      />



      <div
        className="
          relative
          mx-auto
          max-w-[1380px]
          px-5
          sm:px-8
          lg:px-12
        "
      >


        <div
          className="
            grid
            grid-cols-1
            gap-10
            border-b
            border-white/10
            pb-8
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
            lg:pb-7
          "
        >

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <div className="flex items-center gap-4">

              <span
                className="
                  h-[2px]
                  w-12
                  bg-[#D4A017]
                "
              />

              <span
                className="
                  text-[15px]
                  font-bold
                  uppercase
                  tracking-[4px]
                  text-[#D4A017]
                "
              >
                Our Strength
              </span>

            </div>


            <p
              className="
                mt-7
                max-w-[320px]
                text-[11px]
                uppercase
                leading-6
                tracking-[1px]
                text-white/50
              "
            >
              Built through experience.
              <br />
              Strengthened through relationships.
            </p>

          </motion.div>


          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            {/* REUSABLE TITLE */}

            <AnimatedTitle
              text="Numbers That"
              highlight="Speak for Us"
              delay={0.15}
              duration={0.8}
              letterDelay={0.035}
              color="#FFFFFF"
              highlightColor="#D4A017"
              className="
                text-[35px]
                font-black
                leading-[0.88]
                tracking-[-3px]
                sm:text-[45px]
                md:text-[50px]
                lg:text-[55px]
              "
            />

          </motion.div>

        </div>



        <div
          className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            lg:mt-14
          "
        >

          {counters.map((item, index) => (
            <StatItem
              key={item.title}
              item={item}
              index={index}
            />
          ))}

        </div>

      </div>

    </section>
  );
}
