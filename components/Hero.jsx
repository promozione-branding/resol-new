export default function Hero() {
  return (
    <section
      id="top"
      className="relative mt-10 flex min-h-[calc(100vh-2.5rem)] items-center justify-center overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/Hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center md:px-12">
        <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
          CALCIUM CARBONATE
        </h1>
<p className="mb-6 max-w-full text-lg text-muted pt-4">
          At Resol Industries, we are committed to providing reliable industrial materials through quality-focused sourcing, consistent product standards, dependable service and strong business relationships.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#contact"
            className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
          >
            Book a call
          </a>
          <a
            href="#capabilities"
            className="text-sm text-muted transition-colors hover:text-paper"
          >
            See what we do
          </a>
        </div>
      </div>
    </section>
  );
}