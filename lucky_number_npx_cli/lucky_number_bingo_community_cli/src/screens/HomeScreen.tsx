import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp } from '@react-navigation/native';

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
      <Text>Quantity of Numbers (30 - 100): {numCount}</Text>
      <Slider
        minimumValue={30}
        maximumValue={100}
        step={1}
        value={numCount}
        onValueChange={setNumCount}
        style={styles.slider}
      />
      
      <Text>Quantity of Cards (10 - 100): {cardCount}</Text>
      <Slider
        minimumValue={10}
        maximumValue={100}
        step={5}
        value={cardCount}
        onValueChange={setCardCount}
        style={styles.slider}
      />
      
      <Text>Numbers per Card (5 - 25): {numbersPerCard}</Text>
      <Slider
        minimumValue={5}
        maximumValue={25}
        step={1}
        value={numbersPerCard}
        onValueChange={setNumbersPerCard}
        style={styles.slider}
      />
      
      <Button title="Start Game" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
}); 