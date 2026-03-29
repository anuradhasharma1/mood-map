import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "mood-map",
  description: "Travel by mood not by plans",
  icons: {
    icon: "/location.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*  restore without flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        {/* lordicon script */}
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />

        {/* Auth wrapper */}
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "12px",
                fontWeight: "500",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#00ccff",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#00ccff",
                },
              },
              error: {
                style: {
                  background: "#df1231",
                  color: "#fff",
                },
                iconTheme: {
                  primary: "#fff",
                  secondary: "#df1231",
                },
              },
            }}
          />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}