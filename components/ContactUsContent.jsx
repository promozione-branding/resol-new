"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaLocationDot,
  FaArrowRight,
  FaClock,
  FaPaperPlane,
  FaBuilding,
  FaPlus,
  FaMinus,
} from "react-icons/fa6";


const offices = [
  {
    id: "01",
    title: "Delhi Office",
    type: "Registered Office",
    address:
      "Plot No. 106/47, Khata No. 89, Khasra No. 106/23, Village Khera Kalan, Delhi-110082",
    email: "info@resolvinyls.com",
    phone: "+91-11-41417825",
    map: "https://www.google.com/maps?q=Plot+No.+106/47,+Khata+No.+89,+Khasra+No.+106/23,+Village+Khera+Kalan,+Delhi+110082&output=embed",
  },
  {
    id: "02",
    title: "Gujarat Office",
    type: "Regional Office",
    address:
      "Phase 5 R.S. No. 258/3, Plot No. 2, Ambaji Warehouse Park, Pragpar Mundra, Port Highway, Jarpra, Kachchh, Gujarat - 370405",
    email: "info@resolvinyls.com",
    phone: "+91-9999995255",
    map: "https://www.google.com/maps?q=Phase+5+R.S.+No.+258/3,+Plot+No.+2,+Ambaji+Warehouse+Park,+Pragpar+Mundra,+Kachchh,+Gujarat+370405&output=embed",
  },
  {
    id: "03",
    title: "Maharashtra Office",
    type: "Regional Office",
    address:
      "Ground Floor, House No. 1859 Gala 39 Building No. A14, Prerna Complex, Anjurphata Road, Val Village, Bhiwandi, Thane, Maharashtra - 421302",
    email: "info@resolvinyls.com",
    phone: "+91-9999997765",
    map: "https://www.google.com/maps?q=Ground+Floor,+House+No.+1859+Gala+39+Building+No.+A14,+Prerna+Complex,+Anjurphata+Road,+Val+Village,+Bhiwandi,+Thane,+Maharashtra+421302&output=embed",
  },
  {
    id: "04",
    title: "Chennai Office",
    type: "Regional Office",
    address:
      "Office No. 124, DLF Cybercity, Block 10, Mount Poonamallee High Road, Manapakkam, Chennai, Tamil Nadu - 600089",
    email: "info@resolvinyls.com",
    phone: "+91-9999997765",
    map: "https://www.google.com/maps?q=Office+No.+124,+DLF+Cybercity,+Block+10,+Mount+Poonamallee+High+Road,+Manapakkam,+Chennai,+Tamil+Nadu+600089&output=embed",
  },
  {
    id: "05",
    title: "Haryana Office",
    type: "Regional Office",
    address:
      "Plot No. 20, Street No. 4, Sector 7A, Jhajjar Farrukhnagar Road, Reliance Model Economic Township, Yaqbpur, Jhajjar, Haryana - 124103",
    email: "info@resolvinyls.com",
    phone: "+91-9999997765",
    map: "https://www.google.com/maps?q=Plot+No.+20,+Street+No.+4,+Sector+7A,+Jhajjar+Farrukhnagar+Road,+Reliance+Model+Economic+Township,+Yaqbpur,+Jhajjar,+Haryana+124103&output=embed",
  },
  {
    id: "06",
    title: "Telangana Office",
    type: "Regional Office",
    address:
      "D No. 8-2-293/82/A/75, Plot No. 75, Road Number 9, Jubilee Hills, Hyderabad, Telangana - 500033",
    email: "info@resolvinyls.com",
    phone: "+91-9999995255",
    map: "https://www.google.com/maps?q=D+No.+8-2-293/82/A/75,+Plot+No.+75,+Road+Number+9,+Jubilee+Hills,+Hyderabad,+Telangana+500033&output=embed",
  },
];

const phones = ["+91-11-41417725", "+91-11-41417825"];

const mobiles = [
  "+91-9999995255",
  "+91-9999997765",
  "+91-9810929486",
];

/* ============================================================
   ANIMATION
============================================================ */

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* ============================================================
   MAIN
============================================================ */

export default function ContactUs() {
  const [focused, setFocused] = useState(null);
  const [activeOffice, setActiveOffice] = useState("01");

  const selectedOffice =
    offices.find((office) => office.id === activeOffice) || offices[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F2EA] text-[#17130B]">
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#D4A017]/[0.07] blur-[150px]" />

        <div className="absolute right-[-15%] top-[45%] h-[500px] w-[500px] rounded-full bg-[#D4A017]/[0.05] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(23,19,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,19,11,0.04) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative z-10  px-5 pb-12 pt-28 sm:px-8 md:pt-32 lg:px-12">
        <div className="mx-auto flex  max-w-[1500px] flex-col justify-center">
          <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div
                variants={reveal}
                className="mb-7 flex items-center gap-4"
              >
                <span className="h-px w-14 bg-[#D4A017]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.38em] text-[#9B720A]">
                  Contact Us
                </span>

                <span className="text-[10px] tracking-[0.2em] text-[#8D887D]">
                  / 01
                </span>
              </motion.div>

              <motion.h1
                variants={reveal}
                className="relative max-w-5xl text-[17vw] font-semibold leading-[0.76] tracking-[-0.07em] text-[#17130B] sm:text-[13vw] lg:text-[9.5rem]"
              >
                CONTACT
                <span className="absolute -bottom-2 left-[38%] h-[8px] w-[17%] bg-[#D4A017] lg:h-[10px]" />
              </motion.h1>

              <motion.div
                variants={reveal}
                className="mt-10 grid max-w-4xl gap-7 md:grid-cols-[1fr_auto] md:items-end"
              >
                <p className="max-w-xl text-[15px] leading-7 text-[#6E695F] md:text-base md:leading-8">
                  Have an inquiry about polymers, resins, PET resin, or
                  industrial raw materials? Connect with our team for
                  dependable sourcing and supply solutions across India.
                </p>

                <a
                  href="#contact-form"
                  className="group inline-flex w-fit items-center gap-4 border-b border-[#17130B] pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#17130B]"
                >
                  Start a conversation
                  <FaArrowRight
                    size={11}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT CONTACT PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Decorative number */}
              <div className="absolute -right-2 -top-16 hidden text-[150px] font-bold leading-none tracking-[-0.1em] text-[#17130B]/[0.035] xl:block">
                01
              </div>

              <div className="relative border-l border-[#D4A017] bg-[#17130B] px-7 py-8 text-white md:px-9 md:py-10">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#D4A017]" />

                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A017]">
                      Direct Contact
                    </p>

                    <h2 className="mt-3 text-2xl font-medium tracking-tight">
                      We&apos;re here to help.
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#B8B3A9]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4A017]" />
                    Online
                  </div>
                </div>

                <div className="space-y-7">
                  <DarkContactItem
                    icon={<FaPhone size={12} />}
                    title="Phone"
                  >
                    {phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="block text-sm text-[#D4D0C7] transition-colors hover:text-[#D4A017]"
                      >
                        {phone}
                      </a>
                    ))}
                  </DarkContactItem>

                  <DarkContactItem
                    icon={<FaPhone size={12} />}
                    title="Mobile"
                  >
                    {mobiles.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="block text-sm text-[#D4D0C7] transition-colors hover:text-[#D4A017]"
                      >
                        {phone}
                      </a>
                    ))}
                  </DarkContactItem>

                  <DarkContactItem
                    icon={<FaEnvelope size={12} />}
                    title="Email"
                  >
                    <a
                      href="mailto:info@resolvinyls.com"
                      className="text-sm text-[#D4D0C7] transition-colors hover:text-[#D4A017]"
                    >
                      info@resolvinyls.com
                    </a>
                  </DarkContactItem>
                </div>

                <a
                  href="https://wa.me/919810929486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-9 flex items-center justify-between border-t border-white/10 pt-6"
                >
                  <div className="flex items-center gap-3">
                    <FaWhatsapp
                      size={19}
                      className="text-[#25D366]"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#817D75]">
                        Quick Inquiry
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        Chat on WhatsApp
                      </p>
                    </div>
                  </div>

                  <FaArrowRight
                    size={12}
                    className="text-[#77736C] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#D4A017]"
                  />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ======================================================
          FORM
      ====================================================== */}

      <section
        id="contact-form"
        className="relative z-10 bg-[#17130B] px-5 py-10 text-white sm:px-8 md:py-15 lg:px-12"
      >
        {/* Large background word */}
        <div className="pointer-events-none absolute right-[-3%] top-[-20px] select-none text-[20vw] font-bold leading-none tracking-[-0.08em] text-white/[0.025]">
          TALK
        </div>

        <div className="relative mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-15">
            {/* LEFT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div
                variants={reveal}
                className="flex items-center gap-3"
              >
                <span className="h-px w-10 bg-[#D4A017]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A017]">
                  Send Message
                </span>
              </motion.div>

              <motion.h2
                variants={reveal}
                className="mt-7 text-[40px] font-semibold leading-[0.92] tracking-[-0.045em] md:text-[50px]"
              >
                Tell us
                <span className="block text-[#D4A017]">what you need.</span>
              </motion.h2>

              <motion.p
                variants={reveal}
                className="mt-5 max-w-md text-sm leading-7 text-[#A7A29A]"
              >
                Share your requirements with our team and we will get back to
                you with the right information and supply solution.
              </motion.p>

              <motion.div
                variants={reveal}
                className="mt-10 space-y-5"
              >
                <DarkInfo
                  number="01"
                  icon={<FaPaperPlane size={12} />}
                  title="Quick Response"
                  text="Our team is available to respond to your business inquiries."
                />

                <DarkInfo
                  number="02"
                  icon={<FaLocationDot size={12} />}
                  title="Multiple Locations"
                  text="Connect with our offices across Delhi, Maharashtra, Gujarat, and Chennai."
                />

                <DarkInfo
                  number="03"
                  icon={<FaClock size={12} />}
                  title="Business Support"
                  text="Get assistance regarding products, sourcing, and supply requirements."
                />
              </motion.div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <form className="border border-white/10 bg-white/[0.035] p-6 md:p-9">
                <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[1px] text-[#D4A017]">
                      Inquiry Form
                    </p>

                    <h3 className="mt-2 text-xl font-medium">
                      Start your inquiry
                    </h3>
                  </div>

                  <span className="text-[10px] text-[#6F6B64]">
                    / 01—04
                  </span>
                </div>

                <div className="grid gap-7 md:grid-cols-2">
                  <DarkFormField
                    label="Your Name"
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    focused={focused}
                    setFocused={setFocused}
                  />

                  <DarkFormField
                    label="Email ID"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    focused={focused}
                    setFocused={setFocused}
                  />

                  <DarkFormField
                    label="Mobile Number"
                    type="tel"
                    placeholder="Enter mobile number"
                    name="mobile"
                    focused={focused}
                    setFocused={setFocused}
                  />

                  <DarkFormField
                    label="Place"
                    type="text"
                    placeholder="Enter your place"
                    name="place"
                    focused={focused}
                    setFocused={setFocused}
                  />
                </div>

                <div className="mt-7">
                  <label className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#8D887F]">
                    Message
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirement..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`w-full resize-none border-b bg-transparent px-0 py-3 text-sm text-white outline-none transition-all placeholder:text-[#66625B] ${
                      focused === "message"
                        ? "border-[#D4A017]"
                        : "border-white/15"
                    }`}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[10px] leading-5 text-[#6F6B64]">
                    We respect your privacy. Your information is safe with us.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-5 bg-[#D4A017] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17130B] transition-all duration-300 hover:bg-[#E5B52A]"
                  >
                    Send Inquiry

                    <FaArrowRight
                      size={11}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          OFFICE LOCATIONS
      ====================================================== */}

      <section className="relative z-10 bg-[#F5F2EA] px-5 py-12 sm:px-8 md:py-15 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          {/* HEADER */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mb-14 grid gap-7 lg:grid-cols-[1fr_0.45fr] lg:items-end"
          >
            <motion.div variants={reveal}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4A017]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B720A]">
                  Our Presence
                </span>
              </div>

              <h2 className="mt-6 text-5xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-[50px]">
                Six locations.
                <span className="block text-[#B8860B]">One network.</span>
              </h2>
            </motion.div>

            <motion.p
              variants={reveal}
              className="max-w-md text-sm leading-7 text-[#706A60]"
            >
              Connect with our offices across India for business, sourcing,
              and supply requirements.
            </motion.p>
          </motion.div>

          {/* OFFICE SELECTOR + MAP */}
          <div className="grid gap-0 border-y border-[#D8D2C5] lg:grid-cols-[0.8fr_1.2fr]">
            {/* LEFT LIST */}
            <div className="border-b border-[#D8D2C5] lg:border-b-0 lg:border-r">
              {offices.map((office) => {
                const active = activeOffice === office.id;

                return (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() => setActiveOffice(office.id)}
                    className={`group flex w-full items-center justify-between border-b border-[#D8D2C5] px-3 py-6 text-left transition-all duration-300 last:border-b-0 md:px-5 ${
                      active
                        ? "bg-[#17130B] text-white"
                        : "hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`text-[11px] font-bold tracking-[0.15em] ${
                          active ? "text-[#D4A017]" : "text-[#9A9388]"
                        }`}
                      >
                        {office.id}
                      </span>

                      <div>
                        <h3 className="text-base font-semibold md:text-lg">
                          {office.title}
                        </h3>

                        <p
                          className={`mt-1 text-[9px] font-bold uppercase tracking-[1px] ${
                            active
                              ? "text-[#A8A39B]"
                              : "text-[#9A9388]"
                          }`}
                        >
                          {office.type}
                        </p>
                      </div>
                    </div>

                    <FaArrowRight
                      size={11}
                      className={`transition-all duration-300 ${
                        active
                          ? "translate-x-0 text-[#D4A017]"
                          : "-translate-x-2 text-[#A29B90] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* RIGHT DETAIL */}
            <div className="relative min-h-[500px] bg-[#E9E5DB]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOffice.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="h-full"
                >
                  {/* MAP */}
                  <div className="relative h-[300px] overflow-hidden md:h-[350px]">
                    <iframe
                      src={selectedOffice.map}
                      title={`${selectedOffice.title} Google Map`}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      className="block h-full w-full border-0 grayscale-[30%] contrast-[0.95] transition-all duration-500 hover:grayscale-0"
                    />

                    <div className="pointer-events-none absolute inset-0 border-[12px] border-[#17130B]/[0.05]" />

          
                  </div>

                  {/* DETAIL */}
                  <div className="grid gap-7 p-6 md:grid-cols-[1fr_auto] md:p-8">
                    <div>
                      <div className="flex gap-3">
                        <FaLocationDot
                          size={13}
                          className="mt-1 flex-shrink-0 text-[#B8860B]"
                        />

                        <p className="max-w-xl text-sm leading-6 text-[#615C53]">
                          {selectedOffice.address}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                        <a
                          href={`mailto:${selectedOffice.email}`}
                          className="flex items-center gap-2 text-[14px] font-medium text-[#4F4A42] transition-colors hover:text-[#B8860B]"
                        >
                          <FaEnvelope
                            size={14}
                            className="text-[#B8860B]"
                          />
                          {selectedOffice.email}
                        </a>

                        <a
                          href={`tel:${selectedOffice.phone.replace(
                            /[^0-9+]/g,
                            ""
                          )}`}
                          className="flex items-center gap-2 text-[14px] font-medium text-[#4F4A42] transition-colors hover:text-[#B8860B]"
                        >
                          <FaPhone
                            size={14}
                            className="text-[#B8860B]"
                          />
                          {selectedOffice.phone}
                        </a>
                      </div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedOffice.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-fit items-center gap-4 border-b border-[#17130B] pb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#17130B]"
                    >
                      Open in Maps

                      <FaArrowRight
                        size={10}
                        className="transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative z-10 overflow-hidden bg-[#D4A017] px-5 py-13 sm:px-8 md:py-15 lg:px-12">
        <div className="absolute right-[-5%] top-[-70%] h-[700px] w-[700px] rounded-full border border-[#17130B]/10" />

        <div className="absolute bottom-[-70%] left-[-5%] h-[700px] w-[700px] rounded-full border border-[#17130B]/10" />

        <div className="relative mx-auto flex max-w-[1500px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
           

            <h2 className="mt-5 mb-5 max-w-4xl text-[45px] font-semibold leading-[0.88] tracking-[-0.05em] text-[#17130B] md:text-[50px] lg:text-[55px]">
              Let&apos;s talk
              business.
            </h2>
          </div>

          <a
            href="#contact-form"
            className="group flex w-fit items-center gap-6 border-[#17130B] pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#17130B] "
          >
            Send an Inquiry

            <span className="flex h-9 w-9 items-center justify-center border border-[#17130B] transition-all duration-300 group-hover:translate-x-2 group-hover:bg-[#17130B] group-hover:text-[#D4A017]">
              <FaArrowRight size={11} />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   DARK CONTACT ITEM
============================================================ */

function DarkContactItem({ icon, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-[#D4A017]/30 text-[#D4A017]">
        {icon}
      </div>

      <div>
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#777269]">
          {title}
        </p>

        <div className="space-y-0.5">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   DARK INFO
============================================================ */

function DarkInfo({ number, icon, title, text }) {
  return (
    <div className="group flex gap-4 border-t border-white/10 pt-5">
      <div className="flex w-7 flex-shrink-0 flex-col items-center">
        <span className="text-[9px] font-bold text-[#D4A017]">
          {number}
        </span>

        <span className="mt-3 text-[#D4A017]">{icon}</span>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>

        <p className="mt-1 max-w-sm text-xs leading-6 text-[#858078]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   DARK FORM FIELD
============================================================ */

function DarkFormField({
  label,
  type,
  placeholder,
  name,
  focused,
  setFocused,
}) {
  const isFocused = focused === name;

  return (
    <div>
      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#8D887F]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        className={`w-full border-b bg-transparent px-0 py-3 text-sm text-white outline-none transition-all placeholder:text-[#5F5B55] ${
          isFocused
            ? "border-[#D4A017]"
            : "border-white/15"
        }`}
      />
    </div>
  );
}