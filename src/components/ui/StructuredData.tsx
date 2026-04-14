export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcash.com';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SmartCash",
    "description": "Sistema de gestion de factoring digital para Ecuador. Convierte facturas en efectivo al instante con control financiero total.",
    "url": siteUrl,
    "logo": `${siteUrl}/logo-smartcash.png`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Demo gratuita disponible"
    },
    "provider": {
      "@type": "Organization",
      "name": "SmartCash",
      "url": siteUrl,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
        "contactType": "Customer Service",
        "availableLanguage": ["Spanish"]
      }
    },
    "featureList": [
      "Dashboard de factoring en tiempo real",
      "Gestion integral de clientes con validacion RUC",
      "Seguimiento de movimientos financieros",
      "Pagares digitales con firma electronica",
      "Reportes y analitica avanzada",
      "App movil para operaciones en campo",
      "Portal de clientes autoservicio"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SmartCash - Factoring Digital Ecuador",
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
