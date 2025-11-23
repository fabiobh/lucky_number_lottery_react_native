import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import {
    DrawnNumbersProvider,
    useDrawnNumbers,
} from '../../src/contexts/DrawnNumbersContext';

describe('DrawnNumbersContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DrawnNumbersProvider>{children}</DrawnNumbersProvider>
    );

    describe('Initial State', () => {
        it('should initialize with empty drawn numbers array', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            expect(result.current.drawnNumbers).toEqual([]);
        });

        it('should initialize with lastDrawnNumber as 0', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            expect(result.current.lastDrawnNumber).toBe(0);
        });

        it('should initialize with empty completedCards set', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            expect(result.current.completedCards).toEqual(new Set());
        });

        it('should initialize with empty winnerOrder array', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            expect(result.current.winnerOrder).toEqual([]);
        });
    });

    describe('setDrawnNumbers', () => {
        it('should update drawn numbers with array', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setDrawnNumbers([1, 2, 3, 4, 5]);
            });

            expect(result.current.drawnNumbers).toEqual([1, 2, 3, 4, 5]);
        });

        it('should update drawn numbers with function', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setDrawnNumbers([1, 2, 3]);
            });

            act(() => {
                result.current.setDrawnNumbers(prev => [...prev, 4, 5]);
            });

            expect(result.current.drawnNumbers).toEqual([1, 2, 3, 4, 5]);
        });

        it('should replace drawn numbers when set directly', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setDrawnNumbers([1, 2, 3]);
            });

            act(() => {
                result.current.setDrawnNumbers([10, 20, 30]);
            });

            expect(result.current.drawnNumbers).toEqual([10, 20, 30]);
        });
    });

    describe('setLastDrawnNumber', () => {
        it('should update last drawn number', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setLastDrawnNumber(42);
            });

            expect(result.current.lastDrawnNumber).toBe(42);
        });

        it('should update last drawn number multiple times', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setLastDrawnNumber(10);
            });

            expect(result.current.lastDrawnNumber).toBe(10);

            act(() => {
                result.current.setLastDrawnNumber(20);
            });

            expect(result.current.lastDrawnNumber).toBe(20);
        });
    });

    describe('setCompletedCards', () => {
        it('should update completed cards with Set', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setCompletedCards(new Set([1, 2, 3]));
            });

            expect(result.current.completedCards).toEqual(new Set([1, 2, 3]));
        });

        it('should update completed cards with function', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setCompletedCards(new Set([1, 2]));
            });

            act(() => {
                result.current.setCompletedCards(prev => {
                    const newSet = new Set(prev);
                    newSet.add(3);
                    return newSet;
                });
            });

            expect(result.current.completedCards).toEqual(new Set([1, 2, 3]));
        });

        it('should maintain Set uniqueness', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setCompletedCards(new Set([1, 1, 2, 2, 3]));
            });

            expect(result.current.completedCards.size).toBe(3);
            expect(result.current.completedCards).toEqual(new Set([1, 2, 3]));
        });
    });

    describe('setWinnerOrder', () => {
        it('should update winner order with array', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setWinnerOrder([5, 3, 1]);
            });

            expect(result.current.winnerOrder).toEqual([5, 3, 1]);
        });

        it('should update winner order with function', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setWinnerOrder([1]);
            });

            act(() => {
                result.current.setWinnerOrder(prev => [...prev, 2, 3]);
            });

            expect(result.current.winnerOrder).toEqual([1, 2, 3]);
        });

        it('should maintain order of winners', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setWinnerOrder([10, 5, 15, 3]);
            });

            expect(result.current.winnerOrder[0]).toBe(10);
            expect(result.current.winnerOrder[1]).toBe(5);
            expect(result.current.winnerOrder[2]).toBe(15);
            expect(result.current.winnerOrder[3]).toBe(3);
        });
    });

    describe('Integration scenarios', () => {
        it('should handle complete game flow', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            // Draw first number
            act(() => {
                result.current.setLastDrawnNumber(15);
                result.current.setDrawnNumbers([15]);
            });

            expect(result.current.lastDrawnNumber).toBe(15);
            expect(result.current.drawnNumbers).toEqual([15]);

            // Draw more numbers
            act(() => {
                result.current.setLastDrawnNumber(23);
                result.current.setDrawnNumbers(prev => [...prev, 23]);
            });

            expect(result.current.drawnNumbers).toEqual([15, 23]);

            // Mark card as completed
            act(() => {
                result.current.setCompletedCards(new Set([1]));
                result.current.setWinnerOrder([1]);
            });

            expect(result.current.completedCards).toEqual(new Set([1]));
            expect(result.current.winnerOrder).toEqual([1]);
        });

        it('should handle multiple winners', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            act(() => {
                result.current.setCompletedCards(new Set([1, 3, 5]));
                result.current.setWinnerOrder([1, 3, 5]);
            });

            expect(result.current.completedCards.size).toBe(3);
            expect(result.current.winnerOrder).toHaveLength(3);
        });

        it('should reset game state', () => {
            const { result } = renderHook(() => useDrawnNumbers(), { wrapper });

            // Set some state
            act(() => {
                result.current.setDrawnNumbers([1, 2, 3]);
                result.current.setLastDrawnNumber(3);
                result.current.setCompletedCards(new Set([1]));
                result.current.setWinnerOrder([1]);
            });

            // Reset
            act(() => {
                result.current.setDrawnNumbers([]);
                result.current.setLastDrawnNumber(0);
                result.current.setCompletedCards(new Set());
                result.current.setWinnerOrder([]);
            });

            expect(result.current.drawnNumbers).toEqual([]);
            expect(result.current.lastDrawnNumber).toBe(0);
            expect(result.current.completedCards).toEqual(new Set());
            expect(result.current.winnerOrder).toEqual([]);
        });
    });

    describe('Error handling', () => {
        it.skip('should throw error when used outside provider', () => {
            // This test is skipped because renderHook behavior with errors
            // varies between testing library versions
        });
    });
});
