import { Text } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export function Updates() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>Updates Screen</Text>
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
