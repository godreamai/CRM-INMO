import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { SITE } from "@/content/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `Piedra & Zafa — Inmobiliaria en ${SITE.city}`,
    template: `%s — Piedra & Zafa`,
  },
  description: `Propiedades en ${SITE.city} con selección local, visitas coordinadas y acompañamiento claro. Sin avisos vencidos ni procesos opacos.`,
  metadataBase: new URL("https://piedrayzafa.com.ar"),
  openGraph: {
    title: `Piedra & Zafa — Inmobiliaria en ${SITE.city}`,
    description: `Propiedades en ${SITE.city} con selección, visitas coordinadas y acompañamiento claro.`,
    locale: "es_AR",
    type: "website",
    siteName: "Piedra & Zafa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  url: "https://piedrayzafa.com.ar",
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Belgrano 245",
    addressLocality: SITE.city,
    addressRegion: SITE.province,
    addressCountry: "AR",
  },
  areaServed: {
    "@type": "City",
    name: SITE.city,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="font-[var(--font-body)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
