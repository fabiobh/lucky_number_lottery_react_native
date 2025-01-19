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

  const renderNumberGrid = () => {
    const numbers = Array.from({ length: numCount }, (_, i) => i + 1);
    return (
      <ScrollView>
        <View style={styles.grid}>
          {numbers.map(number => (
            <TouchableOpacity
              key={number}
              style={[
                styles.numberBox,
                drawnNumbers.includes(number) && styles.drawnNumber,
              ]}
              onPress={() => {}}
              disabled={true}
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      <View style={styles.drawSection}>0                 
        <TouchableOpacity style={styles.drawButton} onPress={handleDrawNumber}>
          <Text style={styles.drawButtonText}>Draw Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetNumbers}>
          <Text style={styles.resetButtonText}>Reset Numbers</Text>
        </TouchableOpacity>        
        <Text style={styles.drawnNumberText}>{lastDrawnNumber || ''}</Text>
        <Text>Quantity of Numbers Drawed - {drawnNumbers.length || '0'}</Text>
      </View>
      {renderNumberGrid()}
    </>
  );
}

const styles = StyleSheet.create({
  drawSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  drawButton: {
    backgroundColor: '#0F9D58',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  resetButton: {
    backgroundColor: '#D9534F', // Red color for reset button
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  drawButtonText: {
    color: 'white',
    fontSize: 16,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
  drawnNumberText: {
    fontSize: 24,
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'center',
    width: '100%',
  },
  numberBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
    backgroundColor: '#f5f5f5',
  },
  drawnNumber: {
    backgroundColor: '#0F9D58',
  },
  numberText: {
    fontSize: 18,
  },
});

export default LotteryTab;
