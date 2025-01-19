import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDrawnNumbers } from '../../contexts/DrawnNumbersContext';

function CardsTab({ cards, numbersPerCard, numCount, cardCount }: { 
  cards: number[][]; 
  numbersPerCard: number; 
  numCount: number; 
  cardCount: number; 
}): React.JSX.Element {
  const { drawnNumbers } = useDrawnNumbers();

  return (
    <View style={styles.container}>
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>Numbers Drawn</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{numCount - drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Card {index + 1}</Text>
            <View style={styles.cardNumbersContainer}>
              {card.map((number, numberIndex) => (
                <View 
                  key={numberIndex} 
                  style={[
                    styles.numberBox,
                    drawnNumbers.includes(number) && styles.drawnNumber
                  ]}
                >
                  <Text 
                    style={[
                      styles.numberText,
                      drawnNumbers.includes(number) && styles.drawnNumberText
                    ]}
                  >
                    {number}
                  </Text>
                </View>
              ))}
            </View>
          </View>        
        ))}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  cardsContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  cardNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  numberBox: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  numberText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '500',
  },
  drawnNumber: {
    backgroundColor: '#0F9D58',
  },
  drawnNumberText: {
    color: '#FFFFFF',
  },
  spacer: {
    height: 50,
  },
});

export default CardsTab;
