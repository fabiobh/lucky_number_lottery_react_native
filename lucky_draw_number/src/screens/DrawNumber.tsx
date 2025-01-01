import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const DrawNumber = ({ drawNumber, lastDrawnNumber, drawnNumbers, numCount }) => {
  const allNumbers = Array.from({ length: numCount }, (_, i) => i + 1);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={drawNumber} style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, backgroundColor: '#007BFF', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Sortear Número</Text>
        </TouchableOpacity>
        {lastDrawnNumber !== null && (
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>{lastDrawnNumber}</Text>
          </View>
        )}
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>Números Sorteados: {drawnNumbers.length}</Text>
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
        {allNumbers.map((item) => {
          const isDrawn = drawnNumbers.includes(item);
          return (
            <View key={item} style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 20, borderWidth: 2, borderColor: isDrawn ? 'green' : 'gray', backgroundColor: isDrawn ? 'lightgreen' : '#f0f0f0' }}>
              <Text style={{ fontSize: 20, color: isDrawn ? 'green' : 'gray', fontWeight: isDrawn ? 'bold' : 'normal' }}>{item}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DrawNumber;
