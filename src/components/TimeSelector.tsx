import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { loadMeal } from '../storage/dayStorage';

export default function TimeSelector({ time, onTimeChange, label }: { time: Date; onTimeChange: (newTime: Date) => void; label: 'breakfast' | 'lunch' | 'dinner' }) {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  const onChange = (event: { type: string }, selectedTime: Date) => {
    // Android dismisses the dialog via 'dismissed' action
    if (event.type === 'dismissed') {
      return;
    }
    
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios'); // Keep open on iOS for wheel style
    onTimeChange(currentTime);
  };

  const sendImmediateNotification = async (label: "breakfast" | "lunch" | "dinner") => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldShowInForeground: true,
      }),
    });

    console.log('Sending immediate notification for', label);
    const perm = await Notifications.getPermissionsAsync();
    if (perm.status !== 'granted') {
      const req = await Notifications.requestPermissionsAsync();
      if (req.status !== 'granted') return; // user denied
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    // Await the async loadMeal call
    const mealName = await loadMeal(new Date().toISOString().split('T')[0], label);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${label[0].toUpperCase()}${label.slice(1)} Test Reminder`,
        body: `Time to eat ${mealName || label}!`,
        data: { meal: label },
      },
      trigger: null, // fire immediately
    });
  };

  return (
    <View style={{ padding: 5, alignItems: 'center', flexDirection: 'row', gap: 10 }}>
      
      <Text style={{ fontSize: 16, color: theme.colors.text }}>
        {label[0].toUpperCase()}{label.slice(1)}: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      <Button title="Select Time" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={time}
          mode="time" // Changes the selector to time mode
          is24Hour={false} // Toggles between 12-hour (AM/PM) and 24-hour formats
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
          onValueChange={(value) => onChange({ type: 'set' }, value.nativeEvent.timestamp ? new Date(value.nativeEvent.timestamp) : time)} 
        />
      )}

      <Button title="Test" onPress={() => sendImmediateNotification(label)} />
    </View>
  );
}
