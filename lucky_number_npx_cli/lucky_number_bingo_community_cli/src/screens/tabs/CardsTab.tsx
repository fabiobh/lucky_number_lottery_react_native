import React from 'react';
import {StyleSheet, Text} from 'react-native';

function CardsTab(): React.JSX.Element {
  return <Text style={styles.emptyCards}>Empty cards</Text>;
}

const styles = StyleSheet.create({
  emptyCards: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default CardsTab;
