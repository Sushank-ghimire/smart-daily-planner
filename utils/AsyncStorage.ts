import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorageItem = async <T>(key: string): Promise<T | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to parse AsyncStorage item "${key}"`, error);
    throw error; // Preserve stack trace
  }
};

export const setAsyncStorageItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const serializedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Failed to set AsyncStorage item "${key}"`, error);
    throw error;
  }
};
