"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DropdownContextType {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  isBurger: boolean;
  setIsBurger: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBurger, setIsBurger] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setIsDropdownOpen, isBurger, setIsBurger }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
