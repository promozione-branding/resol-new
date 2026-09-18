import { Jost } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jost",
  display: "swap",
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
    <html lang="en" className={cn(jost.variable)}>
      <body className="bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
