import { Button, Text } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export function NotFound() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>404</Text>
      <Button screen="HomeTabs">Go to Home</Button>
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
});
