import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawnNumbersContextType {
  drawnNumbers: number[];
  setDrawnNumbers: (numbers: number[]) => void;
  lastDrawnNumber: number;
  setLastDrawnNumber: (number: number) => void;
}

const DrawnNumbersContext = createContext<DrawnNumbersContextType | undefined>(undefined);

export const DrawnNumbersProvider = ({ children }: { children: ReactNode }) => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number>(0);
  
  return (
    <DrawnNumbersContext.Provider value={{ 
      drawnNumbers, 
      setDrawnNumbers, 
      lastDrawnNumber, 
      setLastDrawnNumber 
    }}>
      {children}
    </DrawnNumbersContext.Provider>
  );
};

export const useDrawnNumbers = () => {
  const context = useContext(DrawnNumbersContext);
  if (!context) {
    throw new Error('useDrawnNumbers must be used within a DrawnNumbersProvider');
  }
  return context;
}; 