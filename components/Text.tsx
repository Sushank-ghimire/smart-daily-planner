import { Text, TextProps } from 'react-native';
import React from 'react';
import { useThemeStore } from '~/store/theme';

interface ThemeTextProps extends TextProps {
  children: React.ReactNode;
  colorType?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary';
  className?: string;
}

const ThemeText = ({
  children,
  colorType = 'textPrimary',
  className,
  style,
  ...rest
}: ThemeTextProps) => {
  const { theme } = useThemeStore();
  const textColor = theme.colors[colorType] || theme.colors.textPrimary;

  return (
    <Text
      {...rest}
      style={[{ color: textColor }, style]}
      className={className ?? 'text-base font-medium'}>
      {children}
    </Text>
  );
};

export default ThemeText;
