'use client'; // Add this directive as usePathname is a client hook
import { Inter, Exo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConditionalHeader from "@/components/ConditionalHeader";
import { ModalProvider } from "@/context/ModalContext";
import { Providers } from "./providers";
import { usePathname } from 'next/navigation'; // Import usePathname

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter",
});
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-exo",
});

const clashDisplay = localFont({
  src: "../../public/font/ClashDisplay.ttf",
  variable: "--font-clashDisplay",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get current pathname
  const isLoginPage = pathname === '/login'; // Check if it's the login page

  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${inter.variable} ${exo.variable}  bg-neutral-50 text-neutral-800 antialiased`}
      >
        <Providers>
          <ModalProvider>
            <LoadingSpinner />
            <div className="min-h-screen flex flex-col font-clashDisplay">
              {!isLoginPage && <ConditionalHeader />} {/* Conditionally render Header */}
              <div className="flex-1">{children}</div>
              {!isLoginPage && <Footer />} {/* Conditionally render Footer */}
            </div>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
