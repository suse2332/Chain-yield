// File: src/context/UserContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  vipTier: number;
  totalYield: number;
  setVipTier: (tier: number) => void;
  setTotalYield: (yieldAmount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [vipTier, setVipTier] = useState(0);
  const [totalYield, setTotalYield] = useState(0);

  return (
    <UserContext.Provider value={{ vipTier, totalYield, setVipTier, setTotalYield }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used inside UserProvider");
  return context;
};
// Placeholder for UserContext.tsx