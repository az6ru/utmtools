import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://utmtools.ru'),
  title: {
    default: "UTM Конструктор для Яндекс Директ | Бесплатный генератор UTM-меток",
    template: "%s | UTM Tools"
  },
  description: "Бесплатный UTM конструктор для создания UTM-меток для рекламных кампаний Яндекс Директ. Автоматическая генерация основных и быстрых ссылок с динамическими параметрами. Поддержка всех UTM-тегов: utm_source, utm_medium, utm_campaign, utm_term, utm_content.",
  keywords: [
    "UTM конструктор",
    "UTM метки",
    "Яндекс Директ",
    "генератор ссылок",
    "utm_source",
    "utm_medium", 
    "utm_campaign",
    "utm_term",
    "utm_content",
    "реклама",
    "аналитика",
    "маркетинг",
    "контекстная реклама",
    "UTM параметры",
    "отслеживание трафика",
    "рекламные кампании"
  ],
  authors: [{ name: "UTM Constructor", url: "https://utmtools.ru" }],
  creator: "UTM Constructor",
  publisher: "UTM Constructor",
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
  alternates: {
    canonical: 'https://utmtools.ru',
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://utmtools.ru",
    siteName: "UTM Tools",
    title: "UTM Конструктор для Яндекс Директ - Бесплатный генератор UTM-меток",
    description: "Создавайте UTM-метки для рекламных кампаний Яндекс Директ быстро и легко. Поддержка всех динамических параметров и автоматическая транслитерация.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UTM Конструктор для Яндекс Директ - Генератор UTM-меток",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@utmtools",
    creator: "@utmtools",
    title: "UTM Конструктор для Яндекс Директ",
    description: "Бесплатный генератор UTM-меток для Яндекс Директ с расширенными возможностями",
    images: ["/og-image.png"],
  },
  category: "business",
  classification: "marketing tools",
  other: {
    "google-site-verification": "your-verification-code",
    "yandex-verification": "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="canonical" href="https://utmtools.ru" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Структурированные данные для WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "@id": "https://utmtools.ru",
              name: "UTM Конструктор для Яндекс Директ",
              description: "Бесплатный инструмент для создания UTM-меток для рекламных кампаний Яндекс Директ с автоматической генерацией основных и быстрых ссылок",
              url: "https://utmtools.ru",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
              featureList: [
                "Генерация UTM-меток для Яндекс Директ",
                "Автоматическое создание быстрых ссылок",
                "Поддержка динамических параметров",
                "Копирование ссылок одним кликом",
                "Транслитерация названий кампаний",
                "Валидация URL",
                "Шаблоны UTM-меток"
              ],
              author: {
                "@type": "Organization",
                name: "UTM Constructor",
                url: "https://utmtools.ru"
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString().split('T')[0],
              inLanguage: "ru-RU",
              isAccessibleForFree: true,
              softwareVersion: "1.0.0",
              downloadUrl: "https://utmtools.ru",
              installUrl: "https://utmtools.ru",
              screenshot: "https://utmtools.ru/og-image.png",
              softwareHelp: "https://utmtools.ru/docs",
              audience: {
                "@type": "Audience",
                audienceType: "Маркетологи, рекламные агентства, владельцы бизнеса"
              }
            }),
          }}
        />

        {/* Структурированные данные для Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://utmtools.ru/#organization",
              name: "UTM Constructor",
              url: "https://utmtools.ru",
              logo: "https://utmtools.ru/android-chrome-512x512.png",
              description: "Создаем инструменты для эффективного маркетинга и аналитики",
              sameAs: [
                "https://github.com/az6ru/utmtools"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "Russian"
              }
            }),
          }}
        />

        {/* Структурированные данные для BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://utmtools.ru"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "UTM Конструктор",
                  "item": "https://utmtools.ru"
                }
              ]
            }),
          }}
        />

        {/* Яндекс Метрика */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103772260', 'ym');
              
              // Расширенная инициализация Яндекс Метрики
              ym(103772260, 'init', {
                ssr: true,
                webvisor: true,
                clickmap: true,
                ecommerce: "dataLayer",
                accurateTrackBounce: true,
                trackLinks: true,
                trackHash: true,
                ut: "noindex"
              });
              
              // Глобальные параметры для целей
              window.ymParams = {
                base_domain: '',
                campaign_name: ''
              };
            `,
          }}
        />
        
        {/* Google Analytics (если понадобится) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103772260" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
