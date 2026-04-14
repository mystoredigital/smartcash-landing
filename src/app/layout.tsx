import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { StructuredData } from "@/components/ui/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcash.com';

export const metadata: Metadata = {
  title: "SmartCash - Convierte tus Cheques en Efectivo Hoy | Ecuador",
  description: "Necesitas liquidez? SmartCash te da efectivo inmediato por tus cheques. Sin tramites bancarios, comisiones transparentes. Servicio de factoring confiable en Ecuador.",
  keywords: [
    "cobrar cheques Ecuador",
    "liquidez inmediata Ecuador",
    "factoring Ecuador",
    "efectivo por cheques",
    "descuento de cheques",
    "liquidez empresarial",
    "cambio de cheques Ecuador",
    "smartcash",
    "factoring Quito",
    "factoring Guayaquil",
  ],
  authors: [{ name: "SmartCash" }],
  creator: "SmartCash",
  publisher: "SmartCash",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SmartCash - Convierte tus Cheques en Efectivo Hoy | Ecuador",
    description: "Necesitas liquidez? Te damos efectivo inmediato por tus cheques. Comisiones transparentes, sin tramites bancarios. Servicio de factoring en Ecuador.",
    url: siteUrl,
    siteName: 'SmartCash',
    images: [
      {
        url: '/logo-smartcash.png',
        width: 1200,
        height: 630,
        alt: 'SmartCash - Factoring Digital Ecuador',
      },
    ],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SmartCash - Efectivo Inmediato por tus Cheques",
    description: "Necesitas liquidez? Te damos efectivo hoy por tus cheques. Servicio de factoring en Ecuador.",
    images: ['/logo-smartcash.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const ghlWidgetId = process.env.NEXT_PUBLIC_GHL_WIDGET_ID;

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/isotipo-smartcash.png" type="image/png" />
        <link rel="shortcut icon" href="/isotipo-smartcash.png" type="image/png" />
        <link rel="apple-touch-icon" href="/isotipo-smartcash.png" />
        <StructuredData />
        {fbPixelId && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {fbPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </head>
      <body className="antialiased">
        {children}
        {ghlWidgetId && (
          <Script
            src="https://widgets.leadconnectorhq.com/loader.js"
            data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
            data-widget-id={ghlWidgetId}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
