import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

export default function GameScreen({ route }) {
  const { numCount, cardCount, numbersPerCard } = route.params;
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawNumber = () => {
    // Lógica para sortear números
    console.log('Sorteando número...');
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'draw':
        return (
          <View style={styles.scene}>
            <Text>Números Sorteados: {drawnNumbers.join(', ')}</Text>
            <Button title="Sortear Número" onPress={drawNumber} disabled={isDrawing} />
            <Button title="Parar Sorteio" onPress={stopDrawing} />
          </View>
        );
      case 'cards':
        return (
          <View style={styles.scene}>
            <Text>Cartelas: {cardCount}</Text>
            <Button title="Gerar PDF" onPress={() => {}} />
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
}); 