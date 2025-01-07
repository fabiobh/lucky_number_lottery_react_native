import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';

export default function HomeScreen({ navigation }) {
  const [numCount, setNumCount] = useState(30);
  const [cardCount, setCardCount] = useState(10);
  const [numbersPerCard, setNumbersPerCard] = useState(5);

  const handleStart = () => {
    console.log('Iniciando jogo...');
    navigation.navigate('Game', {
      numCount,
      cardCount,
      numbersPerCard,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Quantidade de Números (30 a 100): {numCount}</Text>
      <Slider
        minimumValue={30}
        maximumValue={100}
        step={1}
        value={numCount}
        onValueChange={setNumCount}
        style={styles.slider}
      />
      
      <Text>Quantidade de Cartelas (10 a 100): {cardCount}</Text>
      <Slider
        minimumValue={10}
        maximumValue={100}
        step={1}
        value={cardCount}
        onValueChange={setCardCount}
        style={styles.slider}
      />
      
      <Text>Números por Cartela (5 a 25): {numbersPerCard}</Text>
      <Slider
        minimumValue={5}
        maximumValue={25}
        step={1}
        value={numbersPerCard}
        onValueChange={setNumbersPerCard}
        style={styles.slider}
      />
      
      <Button title="Prosseguir" onPress={handleStart} />
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