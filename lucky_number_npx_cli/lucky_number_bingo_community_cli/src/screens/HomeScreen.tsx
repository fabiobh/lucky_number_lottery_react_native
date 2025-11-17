import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants';



export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  const [numCount, setNumCount] = useState(30);
  const [cardCount, setCardCount] = useState(10);
  const [numbersPerCard, setNumbersPerCard] = useState(5);

  const handleStart = () => {
    console.log('Iniciando jogo...');
    const generatedCards = Array.from({ length: cardCount }, () =>
      Array.from({ length: numbersPerCard }, () => Math.floor(Math.random() * (numCount - 1)) + 1)
    );
    navigation.navigate('Game', {
      numCount,
      cardCount,
      numbersPerCard,
      cards: generatedCards,
    });
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with gear icon */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity 
          style={styles.gearButton}
          onPress={() => navigation.navigate('Options')}
        >
          <Icon name="cog" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.setupContainer}>
          <Text style={styles.setupTitle}>{t('gameSetup')}</Text>
          <Text style={styles.setupSubtitle}>{t('customizeExperience')}</Text>

          {/* card #1 */}
          <View style={styles.sliderCard}>
            <View style={styles.labelContainer}>
              <Icon name="dice-multiple" size={24} color={colors.primary} />
              <Text style={styles.sliderLabel}>{t('totalNumbers')}</Text>
            </View>
            <View style={styles.valueSliderContainer}>
              <Text style={styles.sliderValue}>{numCount}</Text>
              <View style={styles.sliderWrapper}>
                <Slider
                  minimumValue={30}
                  maximumValue={100}
                  step={1}
                  value={numCount}
                  onValueChange={setNumCount}
                  style={styles.slider}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <View style={styles.sliderRange}>
                  <Text style={styles.rangeText}>30</Text>
                  <Text style={styles.rangeText}>100</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* card #2 */}
          <View style={styles.sliderCard}>
            <View style={styles.labelContainer}>
              <Icon name="refresh" size={24} color={colors.primary} />
              <Text style={styles.sliderLabel}>{t('quantityCards')}</Text>
            </View>
            <View style={styles.valueSliderContainer}>
              <Text style={styles.sliderValue}>{cardCount}</Text>
              <View style={styles.sliderWrapper}>
                <Slider
                  minimumValue={10}
                  maximumValue={100}
                  step={5}
                  value={cardCount}
                  onValueChange={setCardCount}
                  style={styles.slider}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <View style={styles.sliderRange}>
                  <Text style={styles.rangeText}>10</Text>
                  <Text style={styles.rangeText}>100</Text>
                </View>
              </View>
            </View>
          </View>

          {/* card #3 */}
          <View style={styles.sliderCard}>
            <View style={styles.labelContainer}>
              <Icon name="grid" size={24} color={colors.primary} />
              <Text style={styles.sliderLabel}>{t('numbersPerCard')}</Text>
            </View>
            <View style={styles.valueSliderContainer}>
              <Text style={styles.sliderValue}>{numbersPerCard}</Text>
              <View style={styles.sliderWrapper}>
                <Slider
                  minimumValue={5}
                  maximumValue={25}
                  step={1}
                  value={numbersPerCard}
                  onValueChange={setNumbersPerCard}
                  style={styles.slider}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <View style={styles.sliderRange}>
                  <Text style={styles.rangeText}>5</Text>
                  <Text style={styles.rangeText}>25</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>{t('startGame')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerSpacer: {
    width: 28, // Same width as gear icon to center content
  },
  gearButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  settingsIcon: {
    fontSize: 24,
  },
  setupContainer: {
    padding: 12,
    alignItems: 'center',
    minHeight: '100%',
    justifyContent: 'center',
  },
  setupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark_gray,
    marginBottom: 4,
  },
  setupSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  sliderCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    paddingRight: 24,
    width: '100%',
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 16,
    color: colors.dark_gray,
    marginLeft: 8,
  },
  valueSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    minWidth: 60,
    marginRight: 16,
  },
  sliderWrapper: {
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    marginTop: 12,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

}); 