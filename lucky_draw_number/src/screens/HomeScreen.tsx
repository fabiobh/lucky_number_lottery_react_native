import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [numCount, setNumCount] = useState('');
  const [cardCount, setCardCount] = useState('');
  const [numbersPerCard, setNumbersPerCard] = useState('');

  const handleStart = () => {
    console.log('Iniciando jogo...');
    navigation.navigate('Game', {
      numCount: parseInt(numCount),
      cardCount: parseInt(cardCount),
      numbersPerCard: parseInt(numbersPerCard),
    });
  };

  return (
    <View style={styles.container}>
      <Text>Quantidade de Números (30 a 100):</Text>
      <TextInput
        keyboardType="numeric"
        value={numCount}
        onChangeText={setNumCount}
        style={styles.input}
      />
      <Text>Quantidade de Cartelas (10 a 100):</Text>
      <TextInput
        keyboardType="numeric"
        value={cardCount}
        onChangeText={setCardCount}
        style={styles.input}
      />
      <Text>Números por Cartela (5 a 25):</Text>
      <TextInput
        keyboardType="numeric"
        value={numbersPerCard}
        onChangeText={setNumbersPerCard}
        style={styles.input}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
  },
}); 