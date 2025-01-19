import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, BackHandler, Image} from 'react-native';
import LotteryTab from './tabs/LotteryTab';
import CardsTab from './tabs/CardsTab';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDrawnNumbers} from '../contexts/DrawnNumbersContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_SIZE = 36;

function GameScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'lottery' | 'cards'>('lottery');
  const {drawnNumbers, setDrawnNumbers} = useDrawnNumbers();
  const route = useRoute();
  const params = route.params;

  const handleResetNumbers = () => {
    setDrawnNumbers([]);
  };

  const handleBackButtonPress = () => {
    Alert.alert(
      "Reset Numbers",
      "Do you want to reset the drawn numbers?",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
            handleResetNumbers();
            navigation.goBack();
          }
        }
      ]
    );
    return true; // Prevent default back action
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    // Set custom header options with an icon
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackButtonPress} style={{ marginLeft: 10 }}>
          {/* Replace with your icon component */}
          {/* Example using a local image */}
          <Icon name="chevron-left" size={ICON_SIZE} color="#6B46C1" />
        </TouchableOpacity>
      ),
    });

    return () => {
      backHandler.remove();
      navigation.setOptions({ headerLeft: undefined }); // Clean up
    };
  }, [navigation]);

  const renderContent = () => {
    return activeTab === 'lottery' ? (
      <LotteryTab {...params} drawnNumbers={drawnNumbers} setDrawnNumbers={setDrawnNumbers} />
    ) : (
      <CardsTab cards={[]} numCount={0} cardCount={0} numbersPerCard={0} {...params} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
    justifyContent: 'center',
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