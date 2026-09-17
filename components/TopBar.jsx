export default function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-between border-b border-hairline bg-ink px-6 text-xs text-paper md:px-12">
      <span>+91-11-41417725</span>
      <span>info@resolvinyls.com</span>
      <a href="#contact" className="transition-colors hover:opacity-80">
        hello@yourstudio.com
      </a>
    </div>
  );
}