import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import LotteryTab from './tabs/LotteryTab';
import CardsTab from './tabs/CardsTab';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDrawnNumbers } from '../contexts/DrawnNumbersContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { getColors } from '../constants';

const ICON_SIZE = 36;

function GameScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'lottery' | 'cards'>('lottery');
  const { showToast } = useToast();
  const {
    setDrawnNumbers,
    setLastDrawnNumber,
    setCompletedCards,
    setWinnerOrder,
  } = useDrawnNumbers();
  const route = useRoute();
  const params = route.params;

  const handleResetNumbers = useCallback(() => {
    console.log('');

    setDrawnNumbers([]);
    setLastDrawnNumber(0);
    setCompletedCards(new Set());
    setWinnerOrder([]);

    showToast(t('resettingNumbers'), 'info', 3000);
  }, [
    setDrawnNumbers,
    setLastDrawnNumber,
    setCompletedCards,
    setWinnerOrder,
    showToast,
    t,
  ]);

  // Handle the back button press, hardware back button and software back button(top left button)
  const handleBackButtonPress = useCallback(() => {
    Alert.alert(t('resetNumbers'), t('resetQuestion'), [
      {
        text: t('no'),
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: t('yes'),
        onPress: () => {
          handleResetNumbers();
          navigation.goBack();
        },
      },
    ]);
    return true; // Prevent default back action
  }, [t, handleResetNumbers, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress,
    );

    // Set custom header options with an icon
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={styles.headerLeftButton}>
          <Icon name="chevron-left" size={ICON_SIZE} color={colors.primary} />
        </TouchableOpacity>
      ),
    });

    return () => {
      backHandler.remove();
      navigation.setOptions({ headerLeft: undefined }); // Clean up
    };
  }, [
    navigation,
    handleBackButtonPress,
    colors.primary,
    styles.headerLeftButton,
  ]);

  const renderContent = () => {
    return activeTab === 'lottery' ? (
      <LotteryTab cards={[]} numCount={0} {...params} />
    ) : (
      <CardsTab
        cards={[]}
        numCount={0}
        cardCount={0}
        numbersPerCard={0}
        {...params}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('lottery')}>
            <Text
              style={[styles.tab, activeTab === 'lottery' && styles.activeTab]}>
              {t('lottery')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('cards')}>
            <Text
              style={[styles.tab, activeTab === 'cards' && styles.activeTab]}>
              {t('cards')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      padding: 2,
    },
    headerLeftButton: {
      marginLeft: 10,
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
