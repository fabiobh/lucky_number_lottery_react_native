import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawnNumbersContextType {
  drawnNumbers: number[];
  setDrawnNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

const DrawnNumbersContext = createContext<DrawnNumbersContextType | undefined>(undefined);

export const DrawnNumbersProvider = ({ children }: { children: ReactNode }) => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  
  return (
    <DrawnNumbersContext.Provider value={{ drawnNumbers, setDrawnNumbers }}>
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