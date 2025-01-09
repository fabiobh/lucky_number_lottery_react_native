import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDrawnNumbers } from '../../contexts/DrawnNumbersContext';

function CardsTab({ cards, numbersPerCard, numCount, cardCount }: { 
  cards: number[][]; 
  numbersPerCard: number; 
  numCount: number; 
  cardCount: number; 
}): React.JSX.Element {
  const { drawnNumbers } = useDrawnNumbers();

  useEffect(() => {
  }, [numbersPerCard, numCount, cardCount]);

  return (
    <ScrollView style={styles.container}>
      {cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Card {index + 1}</Text>
          <View style={styles.cardNumbersContainer}>
            {card.map((number, numberIndex) => (
              <Text 
                key={numberIndex} 
                style={[
                  styles.cardNumber, 
                  drawnNumbers.includes(number) && styles.drawnNumber
                ]}
              >
                {number}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardNumber: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    padding: 5,
    width: '18%',
    textAlign: 'center',
  },
  drawnNumber: {
    color: 'white',
    backgroundColor: '#0F9D58',
    padding: 5,
    borderRadius: 3,
  },
});

export default CardsTab;
