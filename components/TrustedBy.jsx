const logos = [
  { name: "Northwind", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/astrallogo.png" },
  { name: "Vertex Labs", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/prince-pipes-fittings.png" },
  { name: "Solace", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/finolex-industries.png" },
  { name: "Ferro", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/nilkamal-ltd.png" },
  { name: "Ondine", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/uflex-ltd.png" },
  { name: "Cairn", src: "https://www.resolindustries.com/wp-content/uploads/2026/02/cosmo-films.png" },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-hairline bg-ink py-16">
      <p className="mb-10 text-center text-sm text-muted">
        Trusted by teams at
      </p>

      <div className="group relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex w-max animate-marquee items-center gap-20 group-hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex h-16 shrink-0 items-center md:h-20"
              aria-hidden={i >= logos.length ? "true" : undefined}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-auto max-w-[9rem] object-contain transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0 md:max-w-[10rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}