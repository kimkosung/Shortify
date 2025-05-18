import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StackNavigator from './src/navigations/StackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
