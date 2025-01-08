import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LotteryTab from './tabs/LotteryTab';
import CardsTab from './tabs/CardsTab';
import {useRoute} from '@react-navigation/native';

function GameScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'lottery' | 'cards'>('lottery');
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const route = useRoute();
  const params = route.params;

  const handleResetNumbers = () => {
    setDrawnNumbers([]);
  };

  const renderContent = () => {
    return activeTab === 'lottery' ? (
      <LotteryTab {...params} drawnNumbers={drawnNumbers} setDrawnNumbers={setDrawnNumbers} />
    ) : (
      <CardsTab numbersPerCard={0} {...params} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lucky Draw</Text>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('lottery')}>
            <Text style={[styles.tab, activeTab === 'lottery' && styles.activeTab]}>
              Lottery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('cards')}>
            <Text style={[styles.tab, activeTab === 'cards' && styles.activeTab]}>
              Cards
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}

      <TouchableOpacity onPress={handleResetNumbers}>
        <Text>Prosseguir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    marginRight: 16,
    color: '#666',
    padding: 8,
  },
  activeTab: {
    color: '#0F9D58',
    borderBottomWidth: 2,
    borderBottomColor: '#0F9D58',
  },
});

export default GameScreen;