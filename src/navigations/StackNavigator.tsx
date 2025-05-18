import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

type RootStackParamList = {
  Main: undefined;
};

export default function StackNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Main"
        component={() => {
          return (
            <View>
              <Text>Hello</Text>
            </View>
          );
        }}
      />
    </Stack.Navigator>
  );
}
