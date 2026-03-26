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
} from "react";

// ─── Context ──────────────────────────────────────────────────────────────────

interface ConsentContextValue {
  /** null = no decision yet; "accepted" / "declined" = decided */
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
  /** Wipe the stored decision (useful for a "manage cookies" UI) */
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState(() => getConsentStatus());

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

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within <ConsentProvider>");
  }
  return ctx;
}
