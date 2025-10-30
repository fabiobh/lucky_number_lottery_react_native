import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, BackHandler} from 'react-native';
import LotteryTab from './tabs/LotteryTab';
import CardsTab from './tabs/CardsTab';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDrawnNumbers} from '../contexts/DrawnNumbersContext';
import {useTheme} from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { getColors } from '../constants';
import Toast from 'react-native-toast-message';

const ICON_SIZE = 36;

function GameScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'lottery' | 'cards'>('lottery');
  const {
    setDrawnNumbers, 
    setLastDrawnNumber, 
    setCompletedCards,
    setWinnerOrder
  } = useDrawnNumbers();
  const route = useRoute();
  const params = route.params;

  const handleResetNumbers = () => {
    console.log('');
    
    setDrawnNumbers([]);
    setLastDrawnNumber(0);
    setCompletedCards(new Set());
    setWinnerOrder([]);

    Toast.show({
      text1: t('resettingNumbers'),
      type: 'info',
      position: 'bottom',
      visibilityTime: 3000,
      autoHide: true,
    });

  };


  // Handle the back button press, hardware back button and software back button(top left button)
  const handleBackButtonPress = () => {
    Alert.alert(
      t('resetNumbers'),
      t('resetQuestion'),
      [
        {
          text: t('no'),
          onPress: () => null,
          style: "cancel"
        },
        { text: t('yes'), onPress: () => {
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
          <Icon name="chevron-left" size={ICON_SIZE} color={colors.primary} />
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
      <LotteryTab cards={[]} numCount={0} {...params}  />
    ) : (
      <CardsTab cards={[]} numCount={0} cardCount={0} numbersPerCard={0} {...params} />
    );
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('lottery')}>
            <Text style={[styles.tab, activeTab === 'lottery' && styles.activeTab]}>
              {t('lottery')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('cards')}>
            <Text style={[styles.tab, activeTab === 'cards' && styles.activeTab]}>
              {t('cards')}
            </Text>
          </TouchableOpacity>          
        </View>
      </View>

      {renderContent()}

    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: 2,
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
    color: colors.textSecondary,
    padding: 8,
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
});

export default GameScreen;
