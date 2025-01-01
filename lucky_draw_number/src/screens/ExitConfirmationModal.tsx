import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const ExitConfirmationModal = ({ showExitModal, handleExitConfirmation }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showExitModal} onRequestClose={() => handleExitConfirmation(false)}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 15, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Deseja começar outro sorteio?</Text>
          <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, paddingVertical: 10, marginVertical: 10, width: '100%' }} onPress={() => handleExitConfirmation(true)}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#007BFF', borderRadius: 10, paddingVertical: 10, marginVertical: 10, width: '100%' }} onPress={() => handleExitConfirmation(false)}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExitConfirmationModal;
