import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export function Home() {
  const navigation: any = useNavigation();
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Maya's Meal Maker!</Text>
      <Button
        title={`Go to Today's Meal Plan`}
        onPress={() => navigation.navigate('Day', { date: new Date().toISOString().split('T')[0] })}
      />
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});
