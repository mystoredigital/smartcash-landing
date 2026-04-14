export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcash.com';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SmartCash",
    "description": "Servicio de factoring en Ecuador. Convertimos tus cheques en efectivo inmediato con comisiones transparentes y seguimiento digital.",
    "url": siteUrl,
    "logo": `${siteUrl}/logo-smartcash.png`,
    "areaServed": {
      "@type": "Country",
      "name": "Ecuador"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
      "contactType": "Customer Service",
      "availableLanguage": ["Spanish"]
    },
    "service": [
      {
        "@type": "Service",
        "name": "Descuento de Cheques",
        "description": "Convertimos tus cheques por cobrar en efectivo inmediato"
      },
      {
        "@type": "Service",
        "name": "Factoring de Facturas",
        "description": "Liquidez inmediata a cambio de tus facturas por cobrar"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmartCash - Efectivo Inmediato por tus Cheques",
    "url": siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  );
}
