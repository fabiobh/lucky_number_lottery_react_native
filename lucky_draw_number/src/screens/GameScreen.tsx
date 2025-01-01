import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, Share, Modal } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

const Card = ({ item, index, onEdit, onShare, drawnNumbers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(`Cartela #${index + 1}`);

  const handleEdit = () => {
    onShare(index);
  };

  const handleSave = () => {
    onEdit(index, editedName);
    setIsEditing(false);
  };

  const isCardDrawn = item.every(num => drawnNumbers.includes(num)); // Verifica se todos os números da cartela foram sorteados

  return (
    <TouchableOpacity onPress={handleEdit}>
      <View style={[
        styles.cardContainer,
        isCardDrawn ? styles.drawnBox : styles.undrawnBox // Aplica estilos com base no estado da cartela
      ]}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            onBlur={handleSave} // Salva o nome ao sair do campo
            autoFocus
          />
        ) : (
          <Text style={styles.cardTitle}>{editedName}</Text>
        )}
        <View style={styles.numberContainer}>
          {Array.isArray(item) && item.map((number, idx) => {
            const isDrawn = drawnNumbers.includes(number); // Verifica se o número foi sorteado
            return (
              <View key={idx} style={[
                styles.numberBox,
                isDrawn ? styles.drawnBox : styles.undrawnBox // Aplica estilos com base no estado do número
              ]}>
                <Text style={[
                  styles.number,
                  isDrawn ? styles.drawnNumber : styles.undrawnNumber // Aplica estilos com base no estado do número
                ]}>
                  {number}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const GameScreen = ({ route }) => {
  const { numCount, cardCount, numbersPerCard } = route.params;
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cards, setCards] = useState<number[][]>([]);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number | null>(null); // Estado para o número sorteado
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Índice da cartela selecionada

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

    checkWinningCards(newNumber);
  };

  const checkWinningCards = (number) => {
    cards.forEach((card, index) => {
      if (card.every(num => drawnNumbers.includes(num))) {
        alert(`A cartela #${index + 1} foi campeã!`);
      }
    });
  };

  const handleEditCardName = (index, newName) => {
    const updatedCards = [...cards];
    updatedCards[index] = newName; // Atualiza o nome da cartela
    setCards(updatedCards);
  };

  const handleShareCard = (index) => {
    setSelectedCardIndex(index); // Define a cartela selecionada
    setModalVisible(true); // Abre o modal
  };

  const shareSelectedCard = () => {
    const cardName = `Cartela #${selectedCardIndex + 1}`;
    const cardNumbers = cards[selectedCardIndex].join(', ');
    const message = `Nome da Cartela: ${cardName}\nNúmeros: ${cardNumbers}`;

    Share.share({ message });
    setModalVisible(false); // Fecha o modal após compartilhar
  };

  const shareAllCards = () => {
    const messages = cards.map((_, index) => {
      const cardName = `Cartela #${index + 1}`;
      const cardNumbers = cards[index].join(', ');
      return `Nome da Cartela: ${cardName}\nNúmeros: ${cardNumbers}`;
    }).join('\n\n'); // Junta todas as mensagens

    Share.share({ message: messages });
    setModalVisible(false); // Fecha o modal após compartilhar
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
            <ScrollView 
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {allNumbers.map((item) => {
                const isDrawn = drawnNumbers.includes(item);
                return (
                  <View key={item} style={[
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
              })}
            </ScrollView>
          </View>
        );
      case 'cards':
        return (
          <View style={styles.scene}>
            <FlatList
              data={cards}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Card 
                  item={item} 
                  index={index} 
                  onEdit={handleEditCardName} 
                  onShare={handleShareCard} 
                  drawnNumbers={drawnNumbers} // Passa os números sorteados para o Card
                />
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
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar 
            {...props} 
            style={styles.tabBar} 
            activeColor="yellow"
            inactiveColor="black"
          />
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma opção</Text>
            <TouchableOpacity style={styles.button} onPress={shareSelectedCard}>
              <Text style={styles.buttonText}>Cartela selecionada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={shareAllCards}>
              <Text style={styles.buttonText}>Todas as cartelas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  numbersList: {
    alignItems: 'center', // Centraliza os números na lista
  },
  numberBox: {
    width: 60,  // controla o tamanho do número
    height: 60, // controla o tamanho do número
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20, 
    borderWidth: 2, // Largura da borda    
  },
  number: {
    fontSize: 20, 
    color: 'black', // Cor padrão para números não sorteados
  },
  drawnBox: {
    borderColor: 'green', // Cor da borda para números sorteados
    backgroundColor: 'lightgreen', // Fundo suave para números sorteados
  },
  undrawnBox: {
    borderColor: 'gray', // Cor da borda para números não sorteados
    backgroundColor: '#f0f0f0', // Fundo cinza claro para números não sorteados
  },
  drawnNumber: {
    color: 'green', // Cor para números sorteados
    fontWeight: 'bold', // Negrito para números sorteados
  },
  undrawnNumber: {
    color: 'gray', // Cor para números não sorteados
    fontWeight: 'normal', // Normal para números não sorteados
  },
  tabBar: {
    marginBottom: 10, // Espaço entre a aba e o conteúdo    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente mais escuro
  },
  modalContent: {
    width: '80%', // Largura do modal
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15, // Bordas arredondadas
    alignItems: 'center',
    shadowColor: '#000', // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  modalTitle: {
    fontSize: 20, // Aumentar o tamanho da fonte
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333', // Cor do título
  },
  button: {
    backgroundColor: '#007BFF', // Cor de fundo do botão
    borderRadius: 10, // Bordas arredondadas
    paddingVertical: 10,
    marginVertical: 10, // Aumente o espaço entre os botões
    width: '100%', // Largura total do botão
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16,
    textAlign: 'center', // Centraliza o texto
  }
});

export default GameScreen; 