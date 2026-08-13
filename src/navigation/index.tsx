import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { NotFound } from './screens/NotFound';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { Day } from './screens/Day';
import { Info } from './screens/Info';

type RootStackParamList = {
  HomeTabs: undefined;
  Settings: undefined;
  Info: undefined;    
  Day: { date: string };
  NotFound: undefined;
};


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: createBottomTabScreen({
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    }),
    Updates: createBottomTabScreen({
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    }),
  },
});

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    HomeTabs: createNativeStackScreen({
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    }),
    
    Day: createNativeStackScreen({
      screen: Day,
      options: ({ route, navigation }) => ({
        headerLeft: () => {
          const currentDate = route.params?.date || new Date().toISOString().split('T')[0];
          const prevDate = new Date(currentDate);
          prevDate.setDate(prevDate.getDate() - 1);
          const prevDateString = prevDate.toISOString().split('T')[0];

          return (
            <HeaderButton onPress={() => {
              navigation.navigate('Day', { date: prevDateString });
            }}>
              <Text>⬅️</Text>
            </HeaderButton>
          );
        },
        headerBackVisible: false,
        headerRight: () => {
          const currentDate = route.params?.date || new Date().toISOString().split('T')[0];
          const nextDate = new Date(currentDate);
          nextDate.setDate(nextDate.getDate() + 1);
          const nextDateString = nextDate.toISOString().split('T')[0];

          return (
            <HeaderButton onPress={() => {
              navigation.navigate('Day', { date: nextDateString });
            }}>
              <Text>➡️</Text>
            </HeaderButton>
          );
        },
        title: `Meal Plan: ${route.params?.date || 'Today'}`,
        headerTitleAlign: 'center',
      }),
    }),

    Settings: createNativeStackScreen({
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={() => navigation.navigate('Info')}>
            <Text>Info</Text>
          </HeaderButton>
        ),
      }),
    }),

    Info: createNativeStackScreen({
      screen: Info,
      options: {
        presentation: 'modal',
        title: 'Info',
      },
    }),

    NotFound: createNativeStackScreen({
      screen: NotFound,
      options: {
        title: 'Not Found',
      },
    }),
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}
