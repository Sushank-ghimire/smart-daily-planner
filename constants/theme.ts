// types/theme.ts

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  statusbar: string;
  tabBarBackground: string;
  cardPrimary: string;
  cardSecondary: string;
}

export interface AppTheme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
}
