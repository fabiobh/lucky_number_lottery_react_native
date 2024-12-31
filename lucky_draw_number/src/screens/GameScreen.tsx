import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

export default function GameScreen({ route }) {
  const { numCount, cardCount, numbersPerCard } = route.params;
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cards, setCards] = useState([]);

  const drawNumber = () => {
    console.log('Lógica para sortear números - Sorteando número...');
    if (drawnNumbers.length === numCount) {
      alert('Todos os números possíveis já foram sorteados');      
      return;
    }
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * numCount) + 1;
    } while (drawnNumbers.includes(newNumber));
    setDrawnNumbers([...drawnNumbers, newNumber]);
    console.log(`Número sorteado: ${newNumber}`);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const generateCards = () => {
    const newCards = [];
    for (let i = 0; i < cardCount; i++) {
      const card = [];
      while (card.length < numbersPerCard) {
        const newNumber = Math.floor(Math.random() * numCount) + 1;
        if (!card.includes(newNumber)) {
          card.push(newNumber);
        }
      }
      newCards.push(card);
    }
    setCards(newCards);
  };

  useEffect(() => {
    generateCards();
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'draw':
        return (
          <View style={styles.scene}>
            <Text>Números Sorteados:</Text>
            <View style={styles.numberContainer}>
              {Array.from({ length: numCount }, (_, i) => i + 1).reduce((rows, number, index) => {
                if (index % 10 === 0) rows.push([]);
                rows[rows.length - 1].push(number);
                return rows;
              }, []).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((item) => {
                    const isDrawn = drawnNumbers.includes(item);
                    return (
                      <Text key={item} style={[styles.number, isDrawn && styles.drawnNumber]}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              ))}
            </View>
            <Button title="Sortear Número" onPress={drawNumber} disabled={isDrawing} />
            <Button title="Parar Sorteio" onPress={stopDrawing} />
          </View>
        );
      case 'cards':
        return (
          <View style={styles.scene}>
            <FlatList
              data={cards}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.card}>{item.join(', ')}</Text>
              )}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'draw', title: 'Sorteio' },
    { key: 'cards', title: 'Cartelas' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <TabBar {...props} />}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  card: {
    margin: 10,
    fontSize: 18,
  },
  number: {
    margin: 5,
    fontSize: 18,
    color: 'gray',
  },
  drawnNumber: {
    color: 'green',
  },
}); 