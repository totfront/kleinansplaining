"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import type { TAcronym } from "@/lib/supabase/types/TAcronym";

type TAcronymCtx = {
  current?: TAcronym | null;
  setCurrent: (a: TAcronym | null) => void;
};

const AcronymContext = createContext<TAcronymCtx | undefined>(undefined);

export function AcronymProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<TAcronym | null | undefined>(
    undefined
  );
  return (
    <AcronymContext.Provider value={{ current, setCurrent }}>
      {children}
    </AcronymContext.Provider>
  );
}

export function useAcronym() {
  const ctx = useContext(AcronymContext);
  if (!ctx) throw new Error("useAcronym must be used inside AcronymProvider");
  return ctx;
}
