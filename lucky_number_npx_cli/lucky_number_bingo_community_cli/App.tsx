import React from 'react';
import Toast from 'react-native-toast-message';

// import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import { DrawnNumbersProvider } from './src/contexts/DrawnNumbersContext';
import { CardProvider } from './src/contexts/CardContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import './src/i18n';

const Stack = createStackNavigator();

function AppNavigator() {
  const { t } = useTranslation();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerShown: false, 
            title: t('selectCards'), 
            headerTitleAlign: 'center' 
          }}
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{ 
            title: t('drawNumbers'), 
            headerTitleAlign: 'center' 
          }} 
        />
        <Stack.Screen 
          name="Options" 
          component={OptionsScreen} 
          options={{ 
            title: t('options'), 
            headerTitleAlign: 'center' 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Index() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <DrawnNumbersProvider>
          <CardProvider>
            <AppNavigator />
            <Toast />
          </CardProvider>
        </DrawnNumbersProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

/*
import React from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {

  return (
    <SafeAreaView >
      
      <ScrollView>
        
        <View>
          <Text>oi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
*/