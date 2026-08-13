import * as Notifications from 'expo-notifications';
import settingsStorage from '../storage/settingsStorage';

import { loadMeal } from '../storage/dayStorage';

type Meal = 'breakfast' | 'lunch' | 'dinner';

async function requestPermissionIfNeeded(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') return true;
  const res = await Notifications.requestPermissionsAsync();
  return res.status === 'granted';
}

function getSaveIdFn(meal: Meal) {
  if (meal === 'breakfast') return settingsStorage.saveBreakfastNotificationId;
  if (meal === 'lunch') return settingsStorage.saveLunchNotificationId;
  return settingsStorage.saveDinnerNotificationId;
}

function getLoadIdFn(meal: Meal) {
  if (meal === 'breakfast') return settingsStorage.loadBreakfastNotificationId;
  if (meal === 'lunch') return settingsStorage.loadLunchNotificationId;
  return settingsStorage.loadDinnerNotificationId;
}

function getClearIdFn(meal: Meal) {
  if (meal === 'breakfast') return settingsStorage.clearBreakfastNotificationId;
  if (meal === 'lunch') return settingsStorage.clearLunchNotificationId;
  return settingsStorage.clearDinnerNotificationId;
}

export async function scheduleMealNotification(meal: Meal, date: Date, title?: string, body?: string) {
  const ok = await requestPermissionIfNeeded();
  if (!ok) return null;

  // cancel previous if exists
  const loadId = getLoadIdFn(meal);
  const prevId = await loadId();
  if (prevId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(prevId);
    } catch (e) {
      console.warn('Failed to cancel previous notification', e);
    }
  }

  const hour = date.getHours();
  const minute = date.getMinutes();

  try {
    const mealName = await loadMeal(new Date().toISOString().split('T')[0], meal);
    
    const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: `${meal[0].toUpperCase()}${meal.slice(1)} Reminder`,
            body: `Time to eat ${mealName || meal}!`,
            data: { meal: meal },
          },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute, 
        repeats: true,
      } as Notifications.NotificationTriggerInput,
    });

    const saveId = getSaveIdFn(meal);
    await saveId(id);
    console.log(`Scheduled ${meal} notification at ${hour}:${minute} with id ${id}`);
    return id;
  } catch (e) {
    console.warn('Failed to schedule notification', e);
    return null;
  }
}

export async function cancelMealNotification(meal: Meal) {
  const loadId = getLoadIdFn(meal);
  const id = await loadId();
  if (!id) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
    const clearFn = getClearIdFn(meal);
    await clearFn();
  } catch (e) {
    console.warn('Failed to cancel notification', e);
  }
}

export async function scheduleAllIfEnabled() {
  const enabled = await settingsStorage.loadMealRemindersEnabled();
  if (!enabled) return;

  const breakfast = await settingsStorage.loadBreakfastTime();
  const lunch = await settingsStorage.loadLunchTime();
  const dinner = await settingsStorage.loadDinnerTime();

  if (breakfast) await scheduleMealNotification('breakfast', breakfast);
  if (lunch) await scheduleMealNotification('lunch', lunch);
  if (dinner) await scheduleMealNotification('dinner', dinner);
}

export async function cancelAll() {
  await cancelMealNotification('breakfast');
  await cancelMealNotification('lunch');
  await cancelMealNotification('dinner');
}

export default {
  scheduleMealNotification,
  cancelMealNotification,
  scheduleAllIfEnabled,
  cancelAll,
};
