import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tuno - The shortcut to 'ohhh i get it'",
  description: "Connect with verified tutors in seconds. Learn fast, stay confident.",
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
                // Method 1: Override window.onerror
                const originalOnError = window.onerror;
                window.onerror = function(message, source, lineno, colno, error) {
                  // Check if it's a ResizeObserver error
                  if (
                    typeof message === 'string' && 
                    message.includes('ResizeObserver')
                  ) {
                    return true; // Suppress the error
                  }
                  // Call original handler for other errors
                  if (originalOnError) {
                    return originalOnError(message, source, lineno, colno, error);
                  }
                  return false;
                };

                // Method 2: Add error event listener
                window.addEventListener('error', function(e) {
                  if (
                    e.message && 
                    e.message.includes('ResizeObserver')
                  ) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                // Method 3: Catch unhandled promise rejections
                window.addEventListener('unhandledrejection', function(e) {
                  if (
                    e.reason && 
                    e.reason.message && 
                    e.reason.message.includes('ResizeObserver')
                  ) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                });

                // Method 4: Override console.error
                const originalConsoleError = console.error;
                console.error = function(...args) {
                  if (
                    args[0] && 
                    typeof args[0] === 'string' && 
                    args[0].includes('ResizeObserver')
                  ) {
                    return; // Suppress ResizeObserver errors in console
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
