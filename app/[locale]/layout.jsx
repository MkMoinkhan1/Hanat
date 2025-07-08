import { Urbanist } from "next/font/google";
import {setRequestLocale} from 'next-intl/server';

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], 
  variable: "--font-urbanist", 
  display: "swap",
});
export const metadata = {
  title: "Hanat - Service Management Dashboard",
  description: "A comprehensive service management dashboard",
    generator: 'v0.dev'
}
import "./globals.css"
import { NextIntlClientProvider } from 'next-intl'
import { Toaster } from "sonner";


export default async function RootLayout({ children, params }) {
  const {locale} = await params
    setRequestLocale(locale);
    

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} translate="no">
      <body className={` ${urbanist.className} antialiased`}>
        <NextIntlClientProvider locale={locale} >
          {children}
                  <Toaster richColors position="top-right" />
        </NextIntlClientProvider>
      </body>
      
    </html>
  )
}


