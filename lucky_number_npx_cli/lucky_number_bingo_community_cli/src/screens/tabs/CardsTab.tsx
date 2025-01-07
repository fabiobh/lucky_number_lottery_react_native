import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function CardsTab(): React.JSX.Element {
  const cards = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Card {index + 1}</Text>
          <View style={styles.cardNumbersContainer}>
            {card.map((number, numberIndex) => (
              <Text key={numberIndex} style={styles.cardNumber}>{number}</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardNumber: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    padding: 5,
    width: '18%',
    textAlign: 'center',
  },
});

export default CardsTab;
