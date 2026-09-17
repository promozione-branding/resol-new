export default function Hero() {
  return (
    <section
      id="top"
      className="relative mt-10 flex min-h-[calc(100vh-2.5rem)] items-center justify-center overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hd_hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center md:px-12">
        <h1 className="entry-title text-8xl sm:text-10xl lg:text-15xl font-semibold tracking-tight leading-tighter uppercase lg:leading-none text-[#ffffff]">
          CALCIUM CARBONATE
        </h1>
        <p className="mb-6 max-w-full text-lg text-white pt-4">
          At Resol Industries, we are committed to providing reliable industrial materials through quality-focused sourcing, consistent product standards, dependable service and strong business relationships.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#contact"
            className="bg-[#ffffff] px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85 font-semibold"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}