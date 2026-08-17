import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { loadMeal, saveMeal } from '../storage/dayStorage';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
type DayCardProps = {
  date: string;
};



export function DayCard({ date }: DayCardProps) {
    const navigation: any = useNavigation();
  
  const theme = useTheme();
  
  const [breakfast, setBreakfast] = useState<string | null>(null);
  const [lunch, setLunch] = useState<string | null>(null);
  const [dinner, setDinner] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const breakfast = await loadMeal(date, 'breakfast');
      const lunch = await loadMeal(date, 'lunch');
      const dinner = await loadMeal(date, 'dinner');

      console.log(breakfast);
      if (!mounted) return;

      setBreakfast(breakfast);
      setLunch(lunch);
      setDinner(dinner);
    })();

    return () => {
      mounted = false;
    };
  }, [date]);

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Day', date)}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Meals for {date}
        </Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>Breakfast</Text>
        <Text style={{color: theme.colors.text}}>{breakfast || 'No meal planned'}</Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>Lunch</Text>
        <Text style={{color: theme.colors.text}}>{lunch || 'No meal planned'}</Text>

        <Text style={[styles.label, { color: theme.colors.text }]}>Dinner</Text>
        <Text style={{color: theme.colors.text}}>{dinner || 'No meal planned'}</Text>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,

  },
  
});
