import { Button, Text } from '@react-navigation/elements';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export function Info() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to Maya's Meal Maker!</Text>
      <Text style={{ color: theme.colors.text }}>
        This app is designed to help you plan your meals for the week. 
        Created by MayaSapphire.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
