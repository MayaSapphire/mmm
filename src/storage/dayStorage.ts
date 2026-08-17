import AsyncStorage from '@react-native-async-storage/async-storage';

export const mealKey = (date: string, mealType: 'breakfast' | 'lunch' | 'dinner') =>
  `day:${date}:${mealType}`;

export async function saveMeal(
  date: string,
  mealType: 'breakfast' | 'lunch' | 'dinner',
  meal: string | null,
) {
  const key = mealKey(date, mealType);
  try {
    if (meal == null || meal === '') {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, meal);
    }
  } catch (e) {
    console.warn('Failed to save meal', e);
  }
}

export async function loadMeal(
  date: string,
  mealType: 'breakfast' | 'lunch' | 'dinner',
): Promise<string | null> {
  const key = mealKey(date, mealType);
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.warn('Failed to load meal', e);
    return null;
  }
}

export async function loadMeals(date: string) {
  const breakfast = await loadMeal(date, 'breakfast');
  const lunch = await loadMeal(date, 'lunch');
  const dinner = await loadMeal(date, 'dinner');
  return { breakfast, lunch, dinner };
}

export async function clearMeal(
  date: string,
  mealType: 'breakfast' | 'lunch' | 'dinner',
) {
  const key = mealKey(date, mealType);
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to clear meal', e);
  }
}
