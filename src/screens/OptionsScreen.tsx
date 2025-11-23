import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {useLanguage} from '../contexts/LanguageContext';
import {useTheme} from '../contexts/ThemeContext';
import {getColors} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OptionsScreen({
  navigation: _navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {t} = useTranslation();
  const {language, setLanguage} = useLanguage();
  const {isDarkMode, toggleTheme} = useTheme();
  const colors = getColors(isDarkMode);

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.optionsContainer}>
          {/* Language Selection */}
          <View style={styles.optionCard}>
            <View style={styles.optionHeader}>
              <Icon name="translate" size={24} color={colors.primary} />
              <Text style={styles.optionTitle}>{t('language')}</Text>
            </View>

            <View style={styles.languageButtons}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'en' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('en')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'en' && styles.languageButtonTextActive,
                  ]}>
                  English
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'pt' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('pt')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'pt' && styles.languageButtonTextActive,
                  ]}>
                  Português
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'fr' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('fr')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'fr' && styles.languageButtonTextActive,
                  ]}>
                  Français
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'es' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('es')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'es' && styles.languageButtonTextActive,
                  ]}>
                  Español
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'de' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('de')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'de' && styles.languageButtonTextActive,
                  ]}>
                  Deutsch
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'zh' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('zh')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'zh' && styles.languageButtonTextActive,
                  ]}>
                  中文
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'it' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('it')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'it' && styles.languageButtonTextActive,
                  ]}>
                  Italiano
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'ru' && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage('ru')}>
                <Text
                  style={[
                    styles.languageButtonText,
                    language === 'ru' && styles.languageButtonTextActive,
                  ]}>
                  Русский
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dark Mode Toggle */}
          <View style={styles.optionCard}>
            <View style={styles.optionRow}>
              <View style={styles.optionHeader}>
                <Icon
                  name="theme-light-dark"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.optionTitle}>{t('darkMode')}</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{false: colors.gray, true: colors.primary}}
                thumbColor={colors.white}
              />
            </View>
          </View>

          {/* Reset Language Button */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={async () => {
              await AsyncStorage.removeItem('app_language');
              // Reload the app or navigate back
              Alert.alert(
                'Language preference cleared. Please restart the app.',
              );
            }}>
            <Icon name="refresh" size={20} color={colors.white} />
            <Text style={styles.resetButtonText}>Reset to Device Language</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    optionsContainer: {
      padding: 16,
    },

    optionCard: {
      backgroundColor: colors.white,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    optionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    optionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.dark_gray,
      marginLeft: 12,
    },
    optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    languageButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    languageButton: {
      minWidth: '30%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    languageButtonActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    languageButtonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: colors.textPrimary,
    },
    languageButtonTextActive: {
      color: colors.white,
    },
    comingSoonText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginTop: 8,
    },
    resetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 8,
      gap: 8,
    },
    resetButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
  });
