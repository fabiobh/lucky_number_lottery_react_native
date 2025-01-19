import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants'; // Import Colors

const ICON_SIZE = 36;

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

        {/* card #1 */}
        <View style={styles.sliderCard}>
          <Text style={styles.sliderLabel}>Total Numbers to Draw</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.sliderValue}>{numCount}</Text>
            <Icon name="dice-multiple" size={ICON_SIZE} color="#6B46C1" />
          </View>
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
        
        {/* card #2 */}
        <View style={styles.sliderCard}>
          <Text style={styles.sliderLabel}>Quantity of Cards</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.sliderValue}>{cardCount}</Text>
            <Icon name="refresh" size={ICON_SIZE} color="#6B46C1" />
          </View>
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

        {/* card #3 */}
        <View style={styles.sliderCard}>
          <Text style={styles.sliderLabel}>Numbers per Card</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.sliderValue}>{numbersPerCard}</Text>
            <Icon name="grid" size={ICON_SIZE} color="#6B46C1" />
          </View>
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
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
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
    color: Colors.dark_gray,
    marginBottom: 4,
  },
  setupSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  sliderCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    paddingRight: 24,
    width: '100%',
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sliderLabel: {
    fontSize: 16,
    color: Colors.dark_gray,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.secondary,
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
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    marginTop: 12,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 1, // to align the icon with the text
  },
}); 