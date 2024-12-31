import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

const Card = ({ item, index, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(`Cartela #${index + 1}`);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(index, editedName);
    setIsEditing(false);
  };

  return (
    <View style={styles.cardContainer}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedName}
          onChangeText={setEditedName}
          onBlur={handleSave} // Salva o nome ao sair do campo
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.cardTitle}>{editedName}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.numberContainer}>
        {item.map((number, idx) => (
          <View key={idx} style={styles.numberBox}>
            <Text style={styles.number}>{number}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const GameScreen = ({ route }) => {
  const { numCount, cardCount, numbersPerCard } = route.params;
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cards, setCards] = useState<number[][]>([]);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number | null>(null); // Estado para o número sorteado

  useEffect(() => {
    generateCards();
  }, []);

  const generateCards = () => {
    const newCards = Array.from({ length: cardCount }, () => {
      const card = [];
      while (card.length < numbersPerCard) {
        const newNumber = Math.floor(Math.random() * numCount) + 1;
        if (!card.includes(newNumber)) {
          card.push(newNumber);
        }
      }
      return card;
    });
    setCards(newCards);
  };

  const drawNumber = () => {
    if (drawnNumbers.length >= numCount) {
      alert('Todos os números possíveis já foram sorteados');
      return;
    }
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * numCount) + 1;
    } while (drawnNumbers.includes(newNumber));
    setDrawnNumbers([...drawnNumbers, newNumber]);
    setLastDrawnNumber(newNumber); // Atualiza o número sorteado
  };

  const handleEditCardName = (index, newName) => {
    const updatedCards = [...cards];
    updatedCards[index] = newName; // Atualiza o nome da cartela
    setCards(updatedCards);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'draw':
        const allNumbers = Array.from({ length: numCount }, (_, i) => i + 1); // Gera todos os números de 1 a numCount
        return (
          <View style={styles.scene}>
            <View style={styles.drawContainer}>
              <Button title="Sortear Número" onPress={drawNumber} disabled={isDrawing} />
              {lastDrawnNumber !== null && (
                <Text style={styles.lastDrawnText}>{lastDrawnNumber}</Text>
              )}
            </View>
            <Text style={styles.title}>Números Sorteados</Text>
            <View style={styles.numberContainer}>
              <FlatList
                data={allNumbers}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => {
                  const isDrawn = drawnNumbers.includes(item);
                  return (
                    <View style={[
                      styles.numberBox,
                      isDrawn ? styles.drawnBox : styles.undrawnBox // Aplica estilos com base no estado do número
                    ]}>
                      <Text style={[
                        styles.number,
                        isDrawn ? styles.drawnNumber : styles.undrawnNumber // Aplica estilos com base no estado do número
                      ]}>
                        {item}
                      </Text>
                    </View>
                  );
                }}
                numColumns={5} // Define o número de colunas
                contentContainerStyle={styles.numbersList} // Adiciona estilo à lista
              />
            </View>
          </View>
        );
      case 'cards':
        return (
          <View style={styles.scene}>
            <FlatList
              data={cards}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Card item={item} index={index} onEdit={handleEditCardName} />
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
      renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os elementos no topo
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Cor de fundo suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Cor do título
  },
  drawContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Espaço entre o botão e a lista de números
  },
  lastDrawnText: {
    fontSize: 18,
    marginLeft: 10, // Espaço entre o botão e o número sorteado
    color: '#333', // Cor do texto
  },
  cardContainer: {
    margin: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: 5,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    width: '80%', // Largura do campo de entrada
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os números se movam para a linha seguinte
    justifyContent: 'center', // Centraliza os números
  },
  numbersList: {
    alignItems: 'center', // Centraliza os números na lista
  },
  numberBox: {
    width: 60, // Largura fixa para cada número
    height: 60, // Altura fixa para cada número
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 30, // Bordas arredondadas
    borderColor: 'gray', // Cor da borda para números não sorteados
    borderWidth: 2, // Largura da borda
    backgroundColor: '#e0f7fa', // Fundo suave para números não sorteados
  },
  number: {
    fontSize: 28, // Aumenta o tamanho da fonte dos números
    color: 'gray', // Cor padrão para números não sorteados
  },
  drawnBox: {
    borderColor: 'green', // Cor da borda para números sorteados
    backgroundColor: 'lightgreen', // Fundo suave para números sorteados
  },
  drawnNumber: {
    color: 'green', // Cor para números sorteados
  },
  undrawnNumber: {
    color: 'gray', // Cor para números não sorteados
  },
  tabBar: {
    marginBottom: 10, // Espaço entre a aba e o conteúdo
  },
});

export default GameScreen; 