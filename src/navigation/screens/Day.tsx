import React, { useEffect, useState } from 'react';
import { Text } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, TextInput } from 'react-native';
import { loadMeal, saveMeal } from '../../storage/dayStorage';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
type RootStackParamList = {
  Day: { date: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Day'>;

export function Day({ route }: Props) {
  const theme = useTheme();
  const date = route.params?.date || new Date().toISOString().split('T')[0];
  const [breakfastMeal, setBreakfastMealState] = useState('');
  const [lunchMeal, setLunchMealState] = useState('');
  const [dinnerMeal, setDinnerMealState] = useState('');

  useEffect(() => {
    let active = true;

    (async () => {
      const breakfastValue = await loadMeal(date, 'breakfast');
      const lunchValue = await loadMeal(date, 'lunch');
      const dinnerValue = await loadMeal(date, 'dinner');

      if (!active) return;
      setBreakfastMealState(breakfastValue ?? '');
      setLunchMealState(lunchValue ?? '');
      setDinnerMealState(dinnerValue ?? '');
    })();

    return () => {
      active = false;
    };
  }, [date]);

  function getMeal(mealType: 'breakfast' | 'lunch' | 'dinner') {
    switch (mealType) {
      case 'breakfast':
        return breakfastMeal;
      case 'lunch':
        return lunchMeal;
      case 'dinner':
        return dinnerMeal;
    }
  }

  async function setMeal(
    mealType: 'breakfast' | 'lunch' | 'dinner',
    meal: string | null,
  ) {
    const normalizedMeal = meal ?? '';
    if (mealType === 'breakfast') {
      setBreakfastMealState(normalizedMeal);
    } else if (mealType === 'lunch') {
      setLunchMealState(normalizedMeal);
    } else if (mealType === 'dinner') {
      setDinnerMealState(normalizedMeal);
    }
    await saveMeal(date, mealType, normalizedMeal || null);
  }

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
          <Text style={[styles.title, { color: theme.colors.text }]}>Breakfast</Text>
          <TextInput
            value={getMeal('breakfast')}
            onChangeText={(text) => setMeal('breakfast', text)}
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholderTextColor={theme.colors.text}
          />

          <Text style={[styles.title, { color: theme.colors.text }]}>Lunch</Text>
          <TextInput
            value={getMeal('lunch')}
            onChangeText={(text) => setMeal('lunch', text)}
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholderTextColor={theme.colors.text}
          />

          <Text style={[styles.title, { color: theme.colors.text }]}>Dinner</Text>
          <TextInput
            value={getMeal('dinner')}
            onChangeText={(text) => setMeal('dinner', text)}
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholderTextColor={theme.colors.text}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    padding: 10,
    marginHorizontal: 0,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },
});
