import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

function LotteryTab(): React.JSX.Element {
  const route = useRoute();
  const {numCount} = route.params;
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);

  const handleDrawNumber = () => {
    const random = Math.floor(Math.random() * numCount) + 1;
    setDrawnNumber(random);
  };

  const renderNumberGrid = () => {
    const numbers = Array.from({length: numCount}, (_, i) => i + 1);
    return (
      <View style={styles.grid}>
        {numbers.map(number => (
          <TouchableOpacity
            key={number}
            style={[
              styles.numberBox,
              selectedNumber === number && styles.selectedNumber,
              drawnNumber === number && styles.drawnNumber,
            ]}
            onPress={() => setSelectedNumber(number)}>
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <>
      <View style={styles.drawSection}>
        <TouchableOpacity style={styles.drawButton} onPress={handleDrawNumber}>
          <Text style={styles.drawButtonText}>Draw Number</Text>
        </TouchableOpacity>
        <Text style={styles.drawnNumberText}>{drawnNumber || ''}</Text>
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
  drawButtonText: {
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
  selectedNumber: {
    backgroundColor: '#0F9D58',
  },
  drawnNumber: {
    backgroundColor: '#0F9D58',
  },
  numberText: {
    fontSize: 18,
  },
});

export default LotteryTab;
