export const generateCards = (
    cardCount: number,
    numbersPerCard: number,
    totalNumbers: number,
): number[][] => {
    return Array.from({ length: cardCount }, () => {
        const cardNumbers = new Set<number>();
        // Ensure we don't get stuck in an infinite loop if totalNumbers < numbersPerCard
        // ideally totalNumbers should be significantly larger than numbersPerCard
        const max = totalNumbers;

        while (cardNumbers.size < numbersPerCard) {
            // Generates number between 1 and max (inclusive if max is used correctly)
            // Original logic was: Math.floor(Math.random() * (numCount - 1)) + 1
            // If numCount is 30, random * 29 -> 0..28.99 -> floor 0..28 -> +1 -> 1..29. 
            // So it never generated 30?
            // Let's assume we want 1 to totalNumbers.
            const num = Math.floor(Math.random() * totalNumbers) + 1;
            cardNumbers.add(num);
        }
        return Array.from(cardNumbers).sort((a, b) => a - b);
    });
};

export const checkWin = (card: number[], drawnNumbers: number[]): boolean => {
    if (card.length === 0) return false;
    return card.every(num => drawnNumbers.includes(num));
};
