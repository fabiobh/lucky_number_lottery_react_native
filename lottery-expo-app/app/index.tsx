import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const TOTAL_NUMBERS = 80;
const NUMBERS_PER_ROW = 8;

interface Card {
  id: number;
  numbers: number[];
}

export default function Index() {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const drawNumber = () => {
    const availableNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1)
      .filter(num => !drawnNumbers.includes(num));
    
    if (availableNumbers.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    setDrawnNumbers([...drawnNumbers, newNumber]);
  };

  const createCards = () => {
    const generateNumberInRange = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const createCard = (id: number): Card => {
      return {
        id,
        numbers: [
          generateNumberInRange(1, 16),
          generateNumberInRange(17, 32),
          generateNumberInRange(33, 48),
          generateNumberInRange(49, 64),
          generateNumberInRange(65, 80),
        ].sort((a, b) => a - b),
      };
    };

    const newCards = Array.from({ length: 3 }, (_, index) => createCard(index + 1));
    setCards(newCards);
  };

  const resetDraw = () => {
    setDrawnNumbers([]);
    setCards([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Latest Drawn Number Display */}
        {drawnNumbers.length > 0 && (
          <View style={styles.latestNumberContainer}>
            <Text style={styles.latestNumberText}>
              Last Number Drawn: {drawnNumbers[drawnNumbers.length - 1]}
            </Text>
          </View>
        )}

        {/* Number Grid */}
        <View style={styles.grid}>
          {Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1).map((number) => (
            <View
              key={number}
              style={[
                styles.numberBox,
                drawnNumbers.includes(number) && styles.drawnNumber,
              ]}
            >
              <Text style={[
                styles.numberText,
                drawnNumbers.includes(number) && styles.drawnNumberText,
              ]}>
                {number}
              </Text>
            </View>
          ))}
        </View>

        {/* Cards Display */}
        {cards.length > 0 && (
          <View style={styles.cardsContainer}>
            <Text style={styles.cardsTitle}>Lottery Cards</Text>
            {cards.map((card) => (
              <View key={card.id} style={styles.card}>
                <Text style={styles.cardTitle}>Card {card.id}</Text>
                <View style={styles.cardNumbers}>
                  {card.numbers.map((num) => (
                    <View
                      key={num}
                      style={[
                        styles.cardNumber,
                        drawnNumbers.includes(num) && styles.drawnCardNumber,
                      ]}
                    >
                      <Text style={styles.cardNumberText}>{num}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={drawNumber}
          disabled={drawnNumbers.length === TOTAL_NUMBERS}
        >
          <Text style={styles.buttonText}>Draw Number</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={createCards}
        >
          <Text style={styles.buttonText}>Create Cards</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetDraw}
        >
          <Text style={styles.buttonText}>Reset Draw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  latestNumberContainer: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  latestNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  numberBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    margin: 2,
  },
  drawnNumber: {
    backgroundColor: '#4CAF50',
  },
  numberText: {
    fontSize: 16,
    color: '#666',
  },
  drawnNumberText: {
    color: 'white',
  },
  buttonContainer: {
    padding: 16,
    gap: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsContainer: {
    marginTop: 20,
    gap: 10,
  },
  cardsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  cardNumber: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  drawnCardNumber: {
    backgroundColor: '#4CAF50',
  },
  cardNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
