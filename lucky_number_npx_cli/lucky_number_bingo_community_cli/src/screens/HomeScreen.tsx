import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [numCount, setNumCount] = useState(30);
  const [cardCount, setCardCount] = useState(10);
  const [numbersPerCard, setNumbersPerCard] = useState(5);

  const handleStart = () => {
    console.log('Iniciando jogo...');
    const generatedCards = Array.from({ length: cardCount }, () =>
      Array.from({ length: numbersPerCard }, () => Math.floor(Math.random() * (numCount - 1)) + 1)
    );
    navigation.navigate('Game', {
      numCount,
      cardCount,
      numbersPerCard,
      cards: generatedCards,
    });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.setupContainer}>
        <Text style={styles.setupTitle}>Game Setup</Text>
        <Text style={styles.setupSubtitle}>Customize your bingo experience</Text>

        <View style={styles.sliderCard}>
          <Text style={styles.sliderLabel}>Total Numbers to Draw</Text>
          <Icon name="dice-multiple" size={24} color="#6B46C1" />
          <Text style={styles.sliderValue}>{numCount}</Text>
          <Slider
            minimumValue={30}
            maximumValue={100}
            step={1}
            value={numCount}
            onValueChange={setNumCount}
            style={styles.slider}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#8B5CF6"
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>30</Text>
            <Text style={styles.rangeText}>100</Text>
          </View>
        </View>

        <View style={styles.sliderCard}>
          <Text style={styles.sliderLabel}>Quantity of Cards</Text>
          <Icon name="refresh" size={24} color="#6B46C1" />
          <Text style={styles.sliderValue}>{cardCount}</Text>
          <Slider
            minimumValue={10}
            maximumValue={100}
            step={5}
            value={cardCount}
            onValueChange={setCardCount}
            style={styles.slider}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#8B5CF6"
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>10</Text>
            <Text style={styles.rangeText}>100</Text>
          </View>
        </View>

        <View style={styles.sliderCard}>
          <Text style={styles.sliderLabel}>Numbers per Card</Text>
          <Icon name="grid" size={24} color="#6B46C1" />
          <Text style={styles.sliderValue}>{numbersPerCard}</Text>
          <Slider
            minimumValue={5}
            maximumValue={25}
            step={1}
            value={numbersPerCard}
            onValueChange={setNumbersPerCard}
            style={styles.slider}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#8B5CF6"
          />
          <View style={styles.sliderRange}>
            <Text style={styles.rangeText}>5</Text>
            <Text style={styles.rangeText}>25</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>▶ Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  settingsIcon: {
    fontSize: 24,
  },
  setupContainer: {
    padding: 12,
    alignItems: 'center',
  },
  setupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C1D95',
    marginBottom: 4,
  },
  setupSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  sliderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#4C1D95',
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rangeText: {
    color: '#6B7280',
  },
  startButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    marginTop: 12,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 