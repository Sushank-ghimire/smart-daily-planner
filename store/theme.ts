import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { darkTheme, lightTheme } from './../theme/index';
import type { AppTheme } from '~/constants/theme';

interface ThemeState {
  theme: AppTheme;
  toggleTheme: () => void;
  initializeTheme: () => Promise<void>
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: lightTheme,
  initializeTheme: async () => {
    const storedTheme = await AsyncStorage.getItem('theme');
    set({ theme: storedTheme === 'light' ? lightTheme : darkTheme });
  },
  toggleTheme: () => {
    const currentMode = get().theme.mode;
    set({ theme: currentMode === 'light' ? darkTheme : lightTheme });
  },
}));
