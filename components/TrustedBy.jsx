const logos = [
  { name: "Astral Pipes", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/astrallogo.png" },
  { name: "Prince Pipes", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/prince-pipes-fittings.png" },
  { name: "Finolex Industries", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/finolex-industries.png" },
  { name: "Nilkamal", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/nilkamal-ltd.png" },
  { name: "Uflex", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/uflex-ltd.png" },
  { name: "Cosmo Films", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/cosmo-films.png" },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-200 bg-[#00c4b5] py-16">
      <p className="mb-10 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#fff]">
        Trusted by teams at
      </p>

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-8 group-hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 shadow-sm transition-all duration-300 ease-out hover:shadow-md md:h-28 md:w-52"
              aria-hidden={i >= logos.length ? "true" : undefined}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full max-h-14 w-auto max-w-[9rem] object-contain md:max-h-16 md:max-w-[10rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}