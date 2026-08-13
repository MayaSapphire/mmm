import { useState, useEffect } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { saveBreakfastTime, saveLunchTime, saveDinnerTime, loadBreakfastTime, loadLunchTime, loadDinnerTime } from '../../storage/settingsStorage';
import  settingsStorage  from '../../storage/settingsStorage';
import TimeSelector from '../../components/TimeSelector';
import scheduler from '../../notifications/scheduler';
import * as Notifications from 'expo-notifications';


export function Settings() {
  const theme = useTheme();
  const [mealRemindersEnabled, setMealRemindersEnabled] = useState<boolean>(false);
  const [breakfastTime, setBreakfastTime] = useState<Date>(new Date());
  const [lunchTime, setLunchTime] = useState<Date>(new Date());
  const [dinnerTime, setDinnerTime] = useState<Date>(new Date());



  useEffect(() => {
    let mounted = true;

    (async () => {
      // Load all settings
      const remindersSetting = await settingsStorage.loadMealRemindersEnabled();
      const breakfast = await loadBreakfastTime();
      const lunch = await loadLunchTime();
      const dinner = await loadDinnerTime();

      if (mounted) {
        if (remindersSetting != null) setMealRemindersEnabled(remindersSetting);
        if (breakfast) setBreakfastTime(breakfast);
        if (lunch) setLunchTime(lunch);
        if (dinner) setDinnerTime(dinner);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  async function changeSetting(value: boolean) {
    setMealRemindersEnabled(value);
    await settingsStorage.saveMealRemindersEnabled(value);
    if (value) {
      // enabled: schedule all saved notifications
      await scheduler.scheduleAllIfEnabled();
    } else {
      // disabled: cancel all scheduled notifications
      await scheduler.cancelAll();
    }
  }

  async function onBreakfastChange(newTime: Date) {
    setBreakfastTime(newTime);
    await saveBreakfastTime(newTime);
    if (mealRemindersEnabled) {
      await scheduler.scheduleMealNotification('breakfast', newTime);
    }
  }

  async function onLunchChange(newTime: Date) {
    setLunchTime(newTime);
    await saveLunchTime(newTime);
    if (mealRemindersEnabled) {
      await scheduler.scheduleMealNotification('lunch', newTime);
    }
  }

  async function onDinnerChange(newTime: Date) {
    setDinnerTime(newTime);
    await saveDinnerTime(newTime);
    if (mealRemindersEnabled) {
      await scheduler.scheduleMealNotification('dinner', newTime);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Meal Reminders</Text>
      <View>
        <View style={styles.row}>
          <Switch value={mealRemindersEnabled} onValueChange={(value) => changeSetting(value)} />
          <Text style={[styles.body, { color: theme.colors.text }]}>Enable meal reminder notifications</Text>
        </View>
        {mealRemindersEnabled && (
          <>
            <TimeSelector time={breakfastTime} onTimeChange={(newTime) => onBreakfastChange(newTime)} label="breakfast" />
            <TimeSelector time={lunchTime} onTimeChange={(newTime) => onLunchChange(newTime)} label="lunch" />
            <TimeSelector time={dinnerTime} onTimeChange={(newTime) => onDinnerChange(newTime)} label="dinner" />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
  }
});
