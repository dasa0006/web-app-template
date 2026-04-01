"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root error fallback — rendered when errors occur outside locale segments
 * or when the locale-specific error boundary fails. Uses English as the
 * default language since we cannot determine the user's locale at this level.
 */
export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Root error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "6rem",
              fontWeight: 800,
              color: "rgba(239, 68, 68, 0.15)",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            500
          </div>

          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#18181b",
              marginBottom: "0.75rem",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              color: "#71717a",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            We encountered an unexpected error. Please try again or return to
            the homepage.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#a1a1aa",
                fontFamily: "monospace",
                marginBottom: "1.5rem",
              }}
            >
              Error reference: {error.digest}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                background: "#18181b",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>

            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "1px solid #e4e4e7",
                background: "white",
                color: "#18181b",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Go back home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
