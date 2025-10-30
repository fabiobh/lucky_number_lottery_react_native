import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { useDrawnNumbers } from '../../contexts/DrawnNumbersContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { getColors } from '../../constants';
import Toast from 'react-native-toast-message';

function LotteryTab({ numCount, cards }: { numCount: number; cards: number[][] }): React.JSX.Element {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);

  const { 
    drawnNumbers, 
    setDrawnNumbers, 
    lastDrawnNumber, 
    setLastDrawnNumber,
    completedCards,
    setCompletedCards,
    winnerOrder,
    setWinnerOrder

  } = useDrawnNumbers();

  const handleDrawNumber = () => {
    const availableNumbers = Array.from({ length: numCount }, (_, i) => i + 1)
      .filter(num => !drawnNumbers.includes(num));

    if (availableNumbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const random = availableNumbers[randomIndex];
      setLastDrawnNumber(random);
      setDrawnNumbers((prev: number[]) => [...prev, random]);

      // Check for completed cards
      cards.forEach((card, index) => {
        const allNumbersDrawn = card.every(num => drawnNumbers.includes(num) || num === random);
        if (allNumbersDrawn && !completedCards.has(index)) {
          setCompletedCards((prev: Set<number>) => {
            const updatedCards = new Set(prev).add(index);
            console.log('Completed Cards:', updatedCards);
            return updatedCards;
          });
          
          // Update the winner order
          setWinnerOrder([...winnerOrder, index]); // Add the index of the completed card to the order
          Toast.show({
            text1: t('cardCompleted', { cardNumber: index + 1 }),
            type: 'success',
            position: 'bottom',
            visibilityTime: 3000,
            autoHide: true,
          });

        }
      });
    }
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.drawSection}>
        <View style={styles.lastNumberContainer}>
          <Text style={styles.lastNumberLabel}>{t('lastDrawnNumber')}</Text>
          <View style={styles.lastNumberCircle}>
            <Text style={styles.lastNumberText}>
              {lastDrawnNumber ? lastDrawnNumber : '-'}
            </Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>{t('numbersDrawn')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{numCount - drawnNumbers.length}</Text>
            <Text style={styles.statLabel}>{t('numbersLeft')}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.drawButton, drawnNumbers.length === numCount && styles.drawButtonDisabled]}
            onPress={handleDrawNumber}
            disabled={drawnNumbers.length === numCount}
          >
            <Text style={styles.drawButtonText}>
              {drawnNumbers.length === numCount ? t('allNumbersDrawn') : t('drawNextNumber')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.gridContainer}>
        <View style={styles.grid}>
          {Array.from({ length: numCount }, (_, i) => i + 1).map(number => (
            <View
              key={number}
              style={[
                styles.numberBox,
                drawnNumbers.includes(number) && styles.drawnNumber,
                lastDrawnNumber === number && styles.lastDrawnNumber,
              ]}
            >
              <Text style={[
                styles.numberText,
                drawnNumbers.includes(number) && styles.drawnNumberText
              ]}>
                {number}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  drawSection: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border, 
    borderRadius: 16,
    margin: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastNumberContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  lastNumberLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  lastNumberCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  lastNumberText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
      color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  buttonContainer: {
    gap: 12,
  },
  drawButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  drawButtonDisabled: {
    backgroundColor: colors.gray,
  },
  drawButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '500',
  },
  gridContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'center',
  },
  numberBox: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 28,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  drawnNumber: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  lastDrawnNumber: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    transform: [{ scale: 1.1 }],
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  numberText: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  drawnNumberText: {
    color: colors.white,
  },
});

export default LotteryTab;

