import { View } from 'react-native';
import React from 'react';
import { useThemeStore } from '~/store/theme';

const ThemeBackground = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  return (
    <View className="min-h-full w-full" style={{ backgroundColor: theme.colors.background }}>
      {children}
    </View>
  );
};

export default ThemeBackground;
