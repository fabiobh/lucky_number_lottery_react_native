import { generateCards, checkWin } from '../../src/utils/gameUtils';

describe('gameUtils', () => {
    describe('generateCards', () => {
        it('should generate the correct number of cards', () => {
            const cardCount = 5;
            const numbersPerCard = 10;
            const totalNumbers = 50;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            expect(cards).toHaveLength(cardCount);
        });

        it('should generate cards with the correct number of numbers per card', () => {
            const cardCount = 3;
            const numbersPerCard = 7;
            const totalNumbers = 30;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            cards.forEach(card => {
                expect(card).toHaveLength(numbersPerCard);
            });
        });

        it('should generate cards with unique numbers', () => {
            const cardCount = 5;
            const numbersPerCard = 10;
            const totalNumbers = 50;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            cards.forEach(card => {
                const uniqueNumbers = new Set(card);
                expect(uniqueNumbers.size).toBe(numbersPerCard);
            });
        });

        it('should generate numbers within the valid range (1 to totalNumbers)', () => {
            const cardCount = 3;
            const numbersPerCard = 5;
            const totalNumbers = 30;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            cards.forEach(card => {
                card.forEach(num => {
                    expect(num).toBeGreaterThanOrEqual(1);
                    expect(num).toBeLessThanOrEqual(totalNumbers);
                });
            });
        });

        it('should generate sorted numbers in each card', () => {
            const cardCount = 5;
            const numbersPerCard = 8;
            const totalNumbers = 40;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            cards.forEach(card => {
                const sortedCard = [...card].sort((a, b) => a - b);
                expect(card).toEqual(sortedCard);
            });
        });

        it('should handle edge case with minimum values', () => {
            const cardCount = 1;
            const numbersPerCard = 1;
            const totalNumbers = 10;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            expect(cards).toHaveLength(1);
            expect(cards[0]).toHaveLength(1);
            expect(cards[0][0]).toBeGreaterThanOrEqual(1);
            expect(cards[0][0]).toBeLessThanOrEqual(totalNumbers);
        });

        it('should handle large card generation', () => {
            const cardCount = 100;
            const numbersPerCard = 15;
            const totalNumbers = 75;

            const cards = generateCards(cardCount, numbersPerCard, totalNumbers);

            expect(cards).toHaveLength(cardCount);
            cards.forEach(card => {
                expect(card).toHaveLength(numbersPerCard);
            });
        });
    });

    describe('checkWin', () => {
        it('should return true when all card numbers are drawn', () => {
            const card = [5, 12, 23, 34, 45];
            const drawnNumbers = [1, 5, 12, 15, 23, 34, 40, 45, 50];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(true);
        });

        it('should return false when not all card numbers are drawn', () => {
            const card = [5, 12, 23, 34, 45];
            const drawnNumbers = [1, 5, 12, 15, 23, 40, 50];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(false);
        });

        it('should return false when no numbers are drawn', () => {
            const card = [5, 12, 23, 34, 45];
            const drawnNumbers: number[] = [];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(false);
        });

        it('should return false when card is empty', () => {
            const card: number[] = [];
            const drawnNumbers = [1, 5, 12, 15, 23, 34, 40, 45, 50];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(false);
        });

        it('should return true when card has only one number and it is drawn', () => {
            const card = [42];
            const drawnNumbers = [10, 20, 30, 42, 50];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(true);
        });

        it('should return false when card has only one number and it is not drawn', () => {
            const card = [42];
            const drawnNumbers = [10, 20, 30, 40, 50];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(false);
        });

        it('should handle exact match between card and drawn numbers', () => {
            const card = [1, 2, 3, 4, 5];
            const drawnNumbers = [1, 2, 3, 4, 5];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(true);
        });

        it('should return false when only some numbers match', () => {
            const card = [1, 2, 3, 4, 5];
            const drawnNumbers = [1, 2, 3];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(false);
        });

        it('should handle duplicate numbers in drawn numbers array', () => {
            const card = [5, 10, 15];
            const drawnNumbers = [5, 5, 10, 10, 15, 15, 20];

            const result = checkWin(card, drawnNumbers);

            expect(result).toBe(true);
        });
    });
});
