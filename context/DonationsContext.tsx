import { createContext, useContext, useState } from "react";

export interface DonationItem {
  id: string;
  foodName: string;
  quantity: string;
  location: string;
  expiryDate: string;
  donorName: string;
  foodImage?: string | null;
  description?: string;
}

interface DonationsContextType {
  donations: DonationItem[];
  addDonation: (donation: Omit<DonationItem, "id">) => void;
}

const DonationsContext = createContext<DonationsContextType | undefined>(
  undefined
);

export function DonationsProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<DonationItem[]>([
    {
      id: "1",
      foodName: "Fresh Vegetables",
      quantity: "5 kg",
      location: "Downtown Area",
      expiryDate: "25/07/2025",
      donorName: "John Doe",
    },
  ]);

  const addDonation = (donation: Omit<DonationItem, "id">) => {
    const newDonation = {
      ...donation,
      id: Date.now().toString(),
    };
    setDonations((prev) => [newDonation, ...prev]);
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (context === undefined) {
    throw new Error("useDonations must be used within a DonationsProvider");
  }
  return context;
}
