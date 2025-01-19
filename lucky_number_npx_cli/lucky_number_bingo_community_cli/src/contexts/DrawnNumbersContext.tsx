import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawnNumbersContextType {
  drawnNumbers: number[];
  setDrawnNumbers: (numbers: number[] | ((prev: number[]) => number[])) => void;
  lastDrawnNumber: number;
  setLastDrawnNumber: (number: number) => void;
  completedCards: Set<number>;
  setCompletedCards: (cards: Set<number> | ((prev: Set<number>) => Set<number>)) => void;
}

export const DrawnNumbersContext = createContext<DrawnNumbersContextType>({
  drawnNumbers: [],
  setDrawnNumbers: () => {},
  lastDrawnNumber: 0,
  setLastDrawnNumber: () => {},
  completedCards: new Set(),
  setCompletedCards: () => {},
});

export function DrawnNumbersProvider({ children }: { children: React.ReactNode }) {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number>(0);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  return (
    <DrawnNumbersContext.Provider 
      value={{
        drawnNumbers,
        setDrawnNumbers,
        lastDrawnNumber,
        setLastDrawnNumber,
        completedCards,
        setCompletedCards,
      }}
    >
      {children}
    </DrawnNumbersContext.Provider>
  );
}

export const useDrawnNumbers = () => {
  const context = useContext(DrawnNumbersContext);
  if (!context) {
    throw new Error('useDrawnNumbers must be used within a DrawnNumbersProvider');
  }
  return context;
}; 