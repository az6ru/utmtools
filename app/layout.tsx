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
  title: "UTM Конструктор для Яндекс Директ | Генератор UTM-меток",
  description:
    "Бесплатный UTM конструктор для создания UTM-меток для рекламных кампаний Яндекс Директ. Автоматическая генерация основных и быстрых ссылок с динамическими параметрами.",
  keywords:
    "UTM конструктор, UTM метки, Яндекс Директ, генератор ссылок, utm_source, utm_medium, utm_campaign, реклама, аналитика",
  authors: [{ name: "UTM Constructor" }],
  creator: "UTM Constructor",
  publisher: "UTM Constructor",
  robots: "index, follow",
  openGraph: {
    title: "UTM Конструктор для Яндекс Директ",
    description: "Создавайте UTM-метки для рекламных кампаний Яндекс Директ быстро и легко",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UTM Конструктор для Яндекс Директ - Генератор UTM-меток",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UTM Конструктор для Яндекс Директ",
    description: "Бесплатный генератор UTM-меток для Яндекс Директ",
    images: ["/og-image.png"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "UTM Конструктор для Яндекс Директ",
              description:
                "Бесплатный инструмент для создания UTM-меток для рекламных кампаний Яндекс Директ с автоматической генерацией основных и быстрых ссылок",
              url: "https://utm-constructor.vercel.app",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "RUB",
              },
              featureList: [
                "Генерация UTM-меток для Яндекс Директ",
                "Автоматическое создание быстрых ссылок",
                "Поддержка динамических параметров",
                "Копирование ссылок одним кликом",
                "Транслитерация названий кампаний",
              ],
              author: {
                "@type": "Organization",
                name: "UTM Constructor",
              },
              datePublished: "2024-01-01",
              inLanguage: "ru-RU",
              isAccessibleForFree: true,
              browserRequirements: "Requires JavaScript",
            }),
          }}
        />

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
              ym(103772260, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
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
