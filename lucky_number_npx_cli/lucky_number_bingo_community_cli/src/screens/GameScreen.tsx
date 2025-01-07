import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function GameScreen(): React.JSX.Element {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);

  const handleDrawNumber = () => {
    const random = Math.floor(Math.random() * 15) + 1;
    setDrawnNumber(random);
  };

  const renderNumberGrid = () => {
    const numbers = Array.from({length: 15}, (_, i) => i + 1);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lucky Draw</Text>
        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>Lottery</Text>
          <Text style={styles.tab}>Cards</Text>
        </View>
      </View>

      <View style={styles.drawSection}>
        <TouchableOpacity style={styles.drawButton} onPress={handleDrawNumber}>
          <Text style={styles.drawButtonText}>Draw Number</Text>
        </TouchableOpacity>
        <Text style={styles.drawnNumberText}>{drawnNumber || ''}</Text>
      </View>

      {renderNumberGrid()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    marginRight: 16,
    color: '#666',
  },
  activeTab: {
    color: '#0F9D58',
  },
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
  },
  numberBox: {
    width: '20%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: '1%',
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

export default GameScreen;
