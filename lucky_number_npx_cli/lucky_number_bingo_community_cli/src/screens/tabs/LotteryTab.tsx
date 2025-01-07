import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';

function LotteryTab(): React.JSX.Element {

  const route = useRoute<RouteProp<ParamListBase, string>>();
  const numCount = (route.params as { numCount?: number })?.numCount ?? 0;
  const [selectedNumber, setSelectedNumber] = useState<number>(0);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number>(0);


  const handleDrawNumber = () => {
    const random = Math.floor(Math.random() * numCount) + 1;
    setLastDrawnNumber(random);
    setDrawnNumbers(prev => [...prev, random]);
  };

  const renderNumberGrid = () => {
    const numbers = Array.from({length: numCount}, (_, i) => i + 1);
    return (
      <ScrollView>
        <View style={styles.grid}>
          {numbers.map(number => (
            <TouchableOpacity
              key={number}
              style={[
                styles.numberBox,
                selectedNumber === number && styles.selectedNumber,
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
      <View style={styles.drawSection}>
        <TouchableOpacity style={styles.drawButton} onPress={handleDrawNumber}>
          <Text style={styles.drawButtonText}>Draw Number</Text>
        </TouchableOpacity>
        <Text style={styles.drawnNumberText}>{lastDrawnNumber || ''}</Text>
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
