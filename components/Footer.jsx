export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline bg-ink px-6 py-10 md:px-12">
      <div className="flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Coil Studio</span>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-paper">
            LinkedIn
          </a>
          <a href="#" className="transition-colors hover:text-paper">
            X
          </a>
          <a href="mailto:hello@coil.studio" className="transition-colors hover:text-paper">
            hello@coil.studio
          </a>
        </div>
      </div>
    </footer>
  );
}
