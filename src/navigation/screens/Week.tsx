import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { loadMeal, saveMeal } from '../../storage/dayStorage';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


type MealType = 'breakfast' | 'lunch' | 'dinner';


export type RootStackParamList = {
  Week: { startDate: string, endDate: string };
};

type WeekProps = NativeStackScreenProps<RootStackParamList, 'Week'>;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dayContainer: {
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
});

interface MealSectionProps {
  date: string;
  mealType: MealType;
}


function MealSection({date,  mealType}: MealSectionProps) {
  const theme = useTheme();
  const [meal, setMealState] = useState('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      const savedMeal = await loadMeal(date, mealType);
      if (mounted && savedMeal) {
        setMealState(savedMeal);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [date, mealType]);

  async function updateMeal(value: string) {
    setMealState(value);
    await saveMeal(date, mealType, value || null);
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        {mealType[0].toUpperCase() + mealType.slice(1)}
      </Text>
      <Text>{meal || "No meal planned+
      "}</Text>
    </View>
  );
}

function DaySection({date}: {date: string}) {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Day', { date })}>
      <View style={[styles.dayContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Meals for {date}
        </Text>

        <MealSection date={date} mealType='breakfast' />

        <MealSection date={date} mealType='lunch' />

        <MealSection date={date} mealType='dinner' />
        
      </View>
    </TouchableOpacity>  
  )
}

export function Week({ route }: WeekProps) {
  const start = new Date(route.params.startDate);
  const end = new Date(route.params.endDate);
  const theme = useTheme();
  
  const dates: Date[] = [];
  let currentDate = new Date(start);
  const endDate = new Date(end);

  while (currentDate.getTime() <= endDate.getTime()) {
    dates.push(new Date(currentDate)); // push cloned date
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {dates.map((date) => (
        <DaySection key={(date.toISOString().split('T')[0])} date={date.toISOString().split('T')[0]} />
          ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
