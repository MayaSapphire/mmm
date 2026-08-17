import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { RootStackParamList } from '../index';
import { loadMeal, saveMeal } from '../../storage/dayStorage';

type DayScreenProps = NativeStackScreenProps<RootStackParamList, 'Day'>;

export function Day({ route, navigation }: DayScreenProps) {
  const theme = useTheme();
  const date = route.params.date;
  
  const [breakfastMeal, setBreakfastMeal] = useState<string>('');
  const [lunchMeal, setLunchMeal] = useState<string>('');
  const [dinnerMeal, setDinnerMeal] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      const breakfast = await loadMeal(date, 'breakfast');
      const lunch = await loadMeal(date, 'lunch');
      const dinner = await loadMeal(date, 'dinner');

      if (mounted) {
        if (breakfast) setBreakfastMeal(breakfast);
        if (lunch) setLunchMeal(lunch);
        if (dinner) setDinnerMeal(dinner);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [date]);

  const handleMealChange = async (
    mealType: 'breakfast' | 'lunch' | 'dinner',
    value: string
  ) => {
    if (mealType === 'breakfast') setBreakfastMeal(value);
    if (mealType === 'lunch') setLunchMeal(value);
    if (mealType === 'dinner') setDinnerMeal(value);
    
    await saveMeal(date, mealType, value);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Meals for {date}
      </Text>

      <View style={styles.mealSection}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Breakfast</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholder="Enter breakfast"
          placeholderTextColor={theme.colors.text}
          value={breakfastMeal}
          onChangeText={(value) => handleMealChange('breakfast', value)}
        />
      </View>

      <View style={styles.mealSection}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Lunch</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholder="Enter lunch"
          placeholderTextColor={theme.colors.text}
          value={lunchMeal}
          onChangeText={(value) => handleMealChange('lunch', value)}
        />
      </View>

      <View style={styles.mealSection}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Dinner</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholder="Enter dinner"
          placeholderTextColor={theme.colors.text}
          value={dinnerMeal}
          onChangeText={(value) => handleMealChange('dinner', value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mealSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
