import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

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

  const isCardDrawn = item.every(num => drawnNumbers.includes(num));

  return (
    <TouchableOpacity onPress={handleEdit}>
      <View style={[
        styles.cardContainer,
        isCardDrawn ? styles.drawnBox : styles.undrawnBox
      ]}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <Text style={styles.cardTitle}>{editedName}</Text>
        )}
        <View style={styles.numberContainer}>
          {Array.isArray(item) && item.map((number, idx) => {
            const isDrawn = drawnNumbers.includes(number);
            return (
              <View key={idx} style={[
                styles.numberBox,
                isDrawn ? styles.drawnBox : styles.undrawnBox
              ]}>
                <Text style={[
                  styles.number,
                  isDrawn ? styles.drawnNumber : styles.undrawnNumber
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

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    padding: 5,
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    width: '80%',
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    borderWidth: 2,
  },
  number: {
    fontSize: 20,
  },
  drawnBox: {
    borderColor: 'green',
    backgroundColor: 'lightgreen',
  },
  undrawnBox: {
    borderColor: 'gray',
    backgroundColor: '#f0f0f0',
  },
  drawnNumber: {
    color: 'green',
    fontWeight: 'bold',
  },
  undrawnNumber: {
    color: 'gray',
    fontWeight: 'normal',
  },
});

export default Card;
