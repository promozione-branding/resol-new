import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata = {
  title: "Resol",
  description:
    "Coil designs and ships AI-native products for teams who need to move from prototype to production fast.",
  icons: {
    icon: "https://resol-tan.vercel.app/_next/image?url=%2FNew-Project-6-e1775111050628.webp&w=640&q=75", 

  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
