import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDrawnNumbers } from '../../contexts/DrawnNumbersContext';
import { useCardContext } from '../../contexts/CardContext';

function CardsTab({ cards, numbersPerCard, numCount, cardCount }: { 
  cards: number[][]; 
  numbersPerCard: number; 
  numCount: number; 
  cardCount: number; 
}): React.JSX.Element {
  const { drawnNumbers } = useDrawnNumbers();
  const { setCards } = useCardContext();

  useEffect(() => {
    setCards(cards);
  }, [cards, setCards]);

  return (
    <View style={styles.container}>
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Numbers Drawn</Text>
            <Text style={styles.statValue}>{drawnNumbers.length}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(drawnNumbers.length / numCount) * 100}%` }]} />
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={styles.statValue}>{numCount - drawnNumbers.length}</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((numCount - drawnNumbers.length) / numCount) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const allNumbersDrawn = card.every(num => drawnNumbers.includes(num));
          const winnerPosition = drawnNumbers.indexOf(card[0]) + 1;
          return (
            <View key={index} style={[styles.card, allNumbersDrawn ? styles.winnerCard : null]}>
              {allNumbersDrawn && <Text style={styles.winnerText}>Card {index + 1} wins</Text>}
              {allNumbersDrawn && <Text style={styles.winnerPosition}>Winner #{winnerPosition}</Text>}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Card {index + 1}</Text>
                <View style={styles.cardStats}>
                  <Text style={styles.cardStatsText}>
                    {card.filter(num => drawnNumbers.includes(num)).length}/{numbersPerCard}
                  </Text>
                </View>
              </View>
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
          );
        })}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  statsSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#95A5A6',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0F9D58',
    borderRadius: 2,
  },
  cardsContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },
  cardStats: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cardStatsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#95A5A6', // 
  },
  cardNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  numberBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  numberText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '600',
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
  winnerCard: {
    backgroundColor: '#A5D6A7',
  },
  winnerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  winnerPosition: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default CardsTab;
