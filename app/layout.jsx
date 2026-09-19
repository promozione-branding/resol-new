import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <link rel="icon" href="https://resol-tan.vercel.app/_next/image?url=%2FNew-Project-6-e1775111050628.webp&w=640&q=75" />
      <title>Resol</title>
      <body className={jost.className}>
        {children}
<script dangerouslySetInnerHTML={{ __html: `
  (function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-visible');
          void entry.target.offsetWidth;
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
          entry.target.classList.add('is-hidden');
        }
      });
    }, { threshold: 0.15 });

    function observe() {
      document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observe);
    } else {
      observe();
    }
  })();
`}} />

      </body>
    </html>
  );
}