import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useDrawnNumbers } from '../../contexts/DrawnNumbersContext';
import { Colors } from '../../constants';

function LotteryTab({ numCount, cards }: { numCount: number; cards: number[][] }): React.JSX.Element {
  const route = useRoute<RouteProp<ParamListBase, string>>();
  const { 
    drawnNumbers, 
    setDrawnNumbers, 
    lastDrawnNumber, 
    setLastDrawnNumber,
    completedCards,
    setCompletedCards 
  } = useDrawnNumbers();

  const handleDrawNumber = () => {
    const availableNumbers = Array.from({ length: numCount }, (_, i) => i + 1)
      .filter(num => !drawnNumbers.includes(num));

    if (availableNumbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const random = availableNumbers[randomIndex];
      setLastDrawnNumber(random);
      setDrawnNumbers((prev: number[]) => [...prev, random]);

      // Check for completed cards
      cards.forEach((card, index) => {
        const allNumbersDrawn = card.every(num => drawnNumbers.includes(num) || num === random);
        if (allNumbersDrawn && !completedCards.has(index)) {
          setCompletedCards(prev => {
            const updatedCards = new Set(prev).add(index);
            console.log('Completed Cards:', updatedCards);
            return updatedCards;
          });
          Alert.alert(`Card #${index + 1} completed all numbers in the card!`);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawSection}>
        <View style={styles.lastNumberContainer}>
          <Text style={styles.lastNumberLabel}>Last Drawn Number</Text>
          <View style={styles.lastNumberCircle}>
            <Text style={styles.lastNumberText}>
              {lastDrawnNumber ? lastDrawnNumber : '-'}
            </Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>Numbers Drawn</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{numCount - drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>Numbers Left</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.drawButton, drawnNumbers.length === numCount && styles.drawButtonDisabled]}
            onPress={handleDrawNumber}
            disabled={drawnNumbers.length === numCount}
          >
            <Text style={styles.drawButtonText}>
              {drawnNumbers.length === numCount ? 'All Numbers Drawn' : 'Draw Next Number'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.gridContainer}>
        <View style={styles.grid}>
          {Array.from({ length: numCount }, (_, i) => i + 1).map(number => (
            <View
              key={number}
              style={[
                styles.numberBox,
                drawnNumbers.includes(number) && styles.drawnNumber,
                lastDrawnNumber === number && styles.lastDrawnNumber,
              ]}
            >
              <Text style={[
                styles.numberText,
                drawnNumbers.includes(number) && styles.drawnNumberText
              ]}>
                {number}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  drawSection: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border, 
    borderRadius: 16,
    margin: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastNumberContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  lastNumberLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  lastNumberCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  lastNumberText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginHorizontal: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
      color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  buttonContainer: {
    gap: 12,
  },
  drawButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  drawButtonDisabled: {
    backgroundColor: Colors.gray,
  },
  drawButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: '500',
  },
  gridContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'center',
  },
  numberBox: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 28,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  drawnNumber: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  lastDrawnNumber: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    transform: [{ scale: 1.1 }],
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  numberText: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  drawnNumberText: {
    color: Colors.white,
  },
});

export default LotteryTab;

