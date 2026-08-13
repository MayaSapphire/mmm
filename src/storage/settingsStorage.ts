import AsyncStorage from '@react-native-async-storage/async-storage'

const MEAL_REMINDERS_KEY = 'mealRemindersNotifications';
const BREAKFAST_TIME_KEY = 'breakfastTime';
const BREAKFAST_NOTIFICATION_ID_KEY = 'breakfastNotificationId';
const LUNCH_TIME_KEY = 'lunchTime';
const LUNCH_NOTIFICATION_ID_KEY = 'lunchNotificationId';
const DINNER_TIME_KEY = 'dinnerTime';
const DINNER_NOTIFICATION_ID_KEY = 'dinnerNotificationId';


export async function saveMealRemindersEnabled(value: boolean) {
  try {
    await AsyncStorage.setItem(MEAL_REMINDERS_KEY, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save setting', e);
  }
}

export async function loadMealRemindersEnabled(): Promise<boolean | null> {
  try {
    const setting = await AsyncStorage.getItem(MEAL_REMINDERS_KEY);
    if (setting == null) return null;
    return JSON.parse(setting) as boolean;
  } catch (e) {
    console.warn('Failed to load setting', e);
    return null;
  }
}

export async function clearMealRemindersSetting() {
  try {
    await AsyncStorage.removeItem(MEAL_REMINDERS_KEY);
  } catch (e) {
    console.warn('Failed to clear setting', e);
  }
}

export async function saveBreakfastTime(value: Date) {
  try {
    await AsyncStorage.setItem(BREAKFAST_TIME_KEY, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save setting', e);
  }
}

export async function loadBreakfastTime(): Promise<Date | null> {
  try {
    const setting = await AsyncStorage.getItem(BREAKFAST_TIME_KEY);
    if (setting == null) return null;
    return new Date(JSON.parse(setting) as string);
  } catch (e) {
    console.warn('Failed to load setting', e);
    return null;
  }
}

export async function clearBreakfastTime() {
  try {
    await AsyncStorage.removeItem(BREAKFAST_TIME_KEY);
  } catch (e) {
    console.warn('Failed to clear setting', e);
  }
}

export async function saveLunchTime(value: Date) {
  try {
    await AsyncStorage.setItem(LUNCH_TIME_KEY, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save setting', e);
  }
}

export async function loadLunchTime(): Promise<Date | null> {
  try {
    const setting = await AsyncStorage.getItem(LUNCH_TIME_KEY);
    if (setting == null) return null;
    return new Date(JSON.parse(setting) as string);
  } catch (e) {
    console.warn('Failed to load setting', e);
    return null;
  }
}

export async function clearLunchTime() {
  try {
    await AsyncStorage.removeItem(LUNCH_TIME_KEY);
  } catch (e) {
    console.warn('Failed to clear setting', e);
  }
}

export async function saveDinnerTime(value: Date) {
  try {
    await AsyncStorage.setItem(DINNER_TIME_KEY, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save setting', e);
  }
}

export async function loadDinnerTime(): Promise<Date | null> {
  try {
    const setting = await AsyncStorage.getItem(DINNER_TIME_KEY);
    if (setting == null) return null;
    return new Date(JSON.parse(setting) as string);
  } catch (e) {
    console.warn('Failed to load setting', e);
    return null;
  }
}

export async function clearDinnerTime() {
  try {
    await AsyncStorage.removeItem(DINNER_TIME_KEY);
  } catch (e) {
    console.warn('Failed to clear setting', e);
  }
} 

export async function saveBreakfastNotificationId(id: string) {
  try {
    await AsyncStorage.setItem(BREAKFAST_NOTIFICATION_ID_KEY, id);
  } catch (e) {
    console.warn('Failed to save breakfast notification id', e);
  }
}

export async function loadBreakfastNotificationId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(BREAKFAST_NOTIFICATION_ID_KEY);
  } catch (e) {
    console.warn('Failed to load breakfast notification id', e);
    return null;
  }
}

export async function clearBreakfastNotificationId() {
  try {
    await AsyncStorage.removeItem(BREAKFAST_NOTIFICATION_ID_KEY);
  } catch (e) {
    console.warn('Failed to clear breakfast notification id', e);
  }
}

export async function saveLunchNotificationId(id: string) {
  try {
    await AsyncStorage.setItem(LUNCH_NOTIFICATION_ID_KEY, id);
  } catch (e) {
    console.warn('Failed to save lunch notification id', e);
  }
}

export async function loadLunchNotificationId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LUNCH_NOTIFICATION_ID_KEY);
  } catch (e) {
    console.warn('Failed to load lunch notification id', e);
    return null;
  }
}

export async function clearLunchNotificationId() {
  try {
    await AsyncStorage.removeItem(LUNCH_NOTIFICATION_ID_KEY);
  } catch (e) {
    console.warn('Failed to clear lunch notification id', e);
  }
}

export async function saveDinnerNotificationId(id: string) {
  try {
    await AsyncStorage.setItem(DINNER_NOTIFICATION_ID_KEY, id);
  } catch (e) {
    console.warn('Failed to save dinner notification id', e);
  }
}

export async function loadDinnerNotificationId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(DINNER_NOTIFICATION_ID_KEY);
  } catch (e) {
    console.warn('Failed to load dinner notification id', e);
    return null;
  }
}

export async function clearDinnerNotificationId() {
  try {
    await AsyncStorage.removeItem(DINNER_NOTIFICATION_ID_KEY);
  } catch (e) {
    console.warn('Failed to clear dinner notification id', e);
  }
}


export default {
  saveMealRemindersEnabled,
  loadMealRemindersEnabled,
  clearMealRemindersSetting,
  saveBreakfastTime,
  loadBreakfastTime,
  clearBreakfastTime,
  saveLunchTime,
  loadLunchTime,
  clearLunchTime,
  saveDinnerTime,
  loadDinnerTime,
  clearDinnerTime,
  saveBreakfastNotificationId,
  loadBreakfastNotificationId,
  clearBreakfastNotificationId,
  saveLunchNotificationId,
  loadLunchNotificationId,
  clearLunchNotificationId,
  saveDinnerNotificationId,
  loadDinnerNotificationId,
  clearDinnerNotificationId,
};
