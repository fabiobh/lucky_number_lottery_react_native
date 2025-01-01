import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Share from 'react-native-share';

const ShareModal = ({ modalVisible, setModalVisible, selectedCardIndex, cards }) => {
  const shareSelectedCard = () => {
    const cardName = `Cartela #${selectedCardIndex + 1}`;
    const cardNumbers = cards[selectedCardIndex].join(', ');
    const message = `Nome da Cartela: ${cardName}\nNúmeros: ${cardNumbers}`;
    Share.share({ message });
    setModalVisible(false);
  };

  const shareAllCards = () => {
    const messages = cards.map((_, index) => {
      const cardName = `Cartela #${index + 1}`;
      const cardNumbers = cards[index].join(', ');
      return `Nome da Cartela: ${cardName}\nNúmeros: ${cardNumbers}`;
    }).join('\n\n');
    Share.share({ message: messages });
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 15, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Compartilhar</Text>
          <TouchableOpacity style={{ backgroundColor: '#007BFF', borderRadius: 10, paddingVertical: 10, marginVertical: 10, width: '100%' }} onPress={shareSelectedCard}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Cartela selecionada</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#007BFF', borderRadius: 10, paddingVertical: 10, marginVertical: 10, width: '100%' }} onPress={shareAllCards}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Todas as cartelas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, paddingVertical: 10, marginVertical: 10, width: '100%' }} onPress={() => setModalVisible(false)}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShareModal;
