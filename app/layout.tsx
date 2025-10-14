import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tuno",
  description: "Connect with verified tutors in seconds. Learn fast, stay confident.",
  icons: {
    icon: [{ url: "/tuno.ico", rel: "icon", sizes: "any" }],
    // optional extras if you add them later:
    // apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Comprehensive ResizeObserver error suppression
              (function() {
                const originalOnError = window.onerror;
                window.onerror = function(message, source, lineno, colno, error) {
                  if (typeof message === 'string' && message.includes('ResizeObserver')) {
                    return true;
                  }
                  if (originalOnError) return originalOnError(message, source, lineno, colno, error);
                  return false;
                };

                window.addEventListener('error', function(e) {
                  if (e.message && e.message.includes('ResizeObserver')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                });

                const originalConsoleError = console.error;
                console.error = function(...args) {
                  if (args[0] && typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
                    return;
                  }
                  originalConsoleError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body className={`${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
