import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButton, Text } from '@react-navigation/elements';
import { Day } from './screens/Day';
import { Week } from './screens/Week';
import { Settings } from './screens/Settings';
import { Info } from './screens/Info';
import { NotFound } from './screens/NotFound';
import { Home } from './screens/Home';
import { View } from 'react-native';

export type RootStackParamList = {
  Day: { date: string };
  Week: { startDate: string; endDate: string };
  Settings: undefined;
  Info: undefined;
  NotFound: undefined;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return <AppNavigator />
}

export function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Day"
            component={Day}
            options={({ route, navigation }) => {
              const currentDate = route.params?.date ?? new Date().toISOString().split('T')[0];
              
              const changeDate = (days: number) => {
                const target = new Date(currentDate);
                target.setDate(target.getDate() + days);
                navigation.navigate('Day', { date: target.toISOString().split('T')[0] });
              };

              return {
                title: `Meal Plan: ${currentDate}`,
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: () => (
                  <HeaderButton onPress={() => changeDate(-1)}>
                    <Text>⬅️</Text>
                  </HeaderButton>
                ),
                headerRight: () => (
                  <HeaderButton onPress={() => changeDate(1)}>
                    <Text>➡️</Text>
                  </HeaderButton>
                ),
              };
            }}
          />

          <Stack.Screen
            name="Week"
            component={Week}
            options={({ route }) => ({
              title: `${route.params.startDate} - ${route.params.endDate}`,
              headerTitleAlign: 'center',
            })}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={({ navigation }) => ({
              presentation: 'modal',
              headerRight: () => (
                <HeaderButton onPress={() => navigation.navigate('Info')}>
                  <Text>Info</Text>
                </HeaderButton>
              ),
            })}
          />

          <Stack.Screen name="Info" component={Info} options={{ presentation: 'modal', title: 'Info' }} />
          <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Not Found' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}