export default function CtaBand() {
  return (
    <section
      id="contact"
      className="relative z-10 border-t border-hairline bg-ink px-6 py-24 md:px-12 md:py-32"
    >
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <h2 className="max-w-xl font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          Tell us what's stuck, and we'll tell you what it takes to ship it.
        </h2>

        <a
          href="mailto:hello@coil.studio"
          className="shrink-0 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
        >
          hello@coil.studio
        </a>
      </div>
    </section>
  );
}
