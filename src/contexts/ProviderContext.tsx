"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Provider } from "@/models/provider";

interface ProviderContextType {
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
}

const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
);

export function ProviderProvider({ children }: { children: ReactNode }) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  return (
    <ProviderContext.Provider value={{ selectedProvider, setSelectedProvider }}>
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const context = useContext(ProviderContext);
  if (!context)
    throw new Error("useProvider must be used within ProviderProvider");
  return context;
}
