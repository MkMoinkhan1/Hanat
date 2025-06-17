import "./globals.css"
import { Urbanist } from "next/font/google";


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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${urbanist.className} antialiased`}>
            {children}
      </body>
    </html>
  )
}
