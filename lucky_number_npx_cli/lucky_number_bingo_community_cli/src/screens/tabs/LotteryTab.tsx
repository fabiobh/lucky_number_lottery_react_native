import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import { useDrawnNumbers } from '../../contexts/DrawnNumbersContext';

function LotteryTab({ numCount }: { numCount: number; }): React.JSX.Element {
  const route = useRoute<RouteProp<ParamListBase, string>>();
  const { drawnNumbers, setDrawnNumbers } = useDrawnNumbers();
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number>(0);

  const handleDrawNumber = () => {
    const availableNumbers = Array.from({ length: numCount }, (_, i) => i + 1)
      .filter(num => !drawnNumbers.includes(num));

    if (availableNumbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const random = availableNumbers[randomIndex];
      setLastDrawnNumber(random);
      setDrawnNumbers(prev => [...prev, random]);
    }
  };

  const handleResetNumbers = () => {
    setDrawnNumbers([]);
    setLastDrawnNumber(0); // Optionally reset the last drawn number
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawSection}>
        <View style={styles.lastNumberContainer}>
          <Text style={styles.lastNumberLabel}>Last Number</Text>
          <Text style={styles.lastNumberText}>
            {lastDrawnNumber ? lastDrawnNumber : '-'}
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>Drawn</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{numCount - drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.drawButton}
          onPress={handleDrawNumber}
          disabled={drawnNumbers.length === numCount}
        >
          <Text style={styles.drawButtonText}>
            {drawnNumbers.length === numCount ? 'Complete' : 'Draw Number'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.gridContainer}>
        <View style={styles.grid}>
          {Array.from({ length: numCount }, (_, i) => i + 1).map(number => (
            <View
              key={number}
              style={[
                styles.numberBox,
                drawnNumbers.includes(number) && styles.drawnNumber,
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
    backgroundColor: '#FFFFFF',
  },
  drawSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  lastNumberContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lastNumberLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  lastNumberText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0F9D58',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
  drawButton: {
    backgroundColor: '#0F9D58',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 25,
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
  drawnNumber: {
    backgroundColor: '#0F9D58',
  },
  numberText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '500',
  },
  drawnNumberText: {
    color: '#FFFFFF',
  },
});

export default LotteryTab;
