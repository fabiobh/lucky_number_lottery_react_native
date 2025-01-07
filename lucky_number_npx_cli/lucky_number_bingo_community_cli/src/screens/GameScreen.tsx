import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LotteryTab from './tabs/LotteryTab';
import CardsTab from './tabs/CardsTab';
import {useRoute} from '@react-navigation/native';

function GameScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'lottery' | 'cards'>('lottery');
  const route = useRoute();
  const params = route.params;

  const renderContent = () => {
    return activeTab === 'lottery' ? (
      <LotteryTab {...params} />
    ) : (
      <CardsTab {...params} />
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