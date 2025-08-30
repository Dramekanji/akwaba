import "../styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Load ALL weights + italics for Poppins
const poppins = Poppins({
  subsets: ["latin"], // French is fully covered by latin
  style: ["normal", "italic"], // both styles
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // all weights
  variable: "--font-poppins", // expose as CSS var for Tailwind
  display: "swap", // avoid FOIT
  preload: true,
});

export const metadata: Metadata = {
  title: "Akwaba Construction",
  description: "Ponts & Routes en Côte d’Ivoire et en Guinée",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {/* `font-sans` maps to Poppins in tailwind.config.ts */}
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
