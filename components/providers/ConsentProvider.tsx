"use client";

import {
  ConsentStatus,
  clearConsentStatus,
  getConsentStatus,
  setConsentStatus,
} from "@/lib/consent";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

// --- Context ---

interface ConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

// --- Provider ---

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Server always renders as null because document.cookie is unavailable.
  // We sync from the cookie on the client after the first paint.
  const [status, setStatus] = useState<ConsentStatus>(null);

  useEffect(() => {
    // NOTE: Disabling react-hooks/set-state-in-effect is intentional here.
    // This is a standard Next.js SSR pattern to prevent hydration mismatches.
    // The server cannot read cookies, so it initializes as `null`.
    // We must sync the real state from document.cookie post-mount.
    // This results in exactly one extra render and does not create a loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(getConsentStatus());
  }, []);

  const accept = useCallback(() => {
    setConsentStatus("accepted");
    setStatus("accepted");
  }, []);

  const decline = useCallback(() => {
    setConsentStatus("declined");
    setStatus("declined");
  }, []);

  const reset = useCallback(() => {
    clearConsentStatus();
    setStatus(null);
  }, []);

  return (
    <ConsentContext.Provider value={{ status, accept, decline, reset }}>
      {children}
    </ConsentContext.Provider>
  );
}

// --- Hook ---

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within <ConsentProvider>");
  }
  return ctx;
}