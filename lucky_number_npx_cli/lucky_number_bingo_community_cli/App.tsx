import React from 'react';

// import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import { DrawnNumbersProvider } from './src/contexts/DrawnNumbersContext';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <DrawnNumbersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Select Cards and Numbers', headerTitleAlign: 'center' }}/>
          <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Draw Numbers', headerTitleAlign: 'center' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DrawnNumbersProvider>
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