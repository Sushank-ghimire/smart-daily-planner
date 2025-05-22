import { AppTheme } from "./theme";

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    primary: "#3A86FF",
    secondary: "#FFBE0B",
    background: "#F9FAFB",
    card: "#FFFFFF",
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    statusbar: "#3A86FF",
    cardPrimary: "#E0F2FE", // Tailwind blue-100
    cardSecondary: "#DCFCE7",
    tabBarBackground: "#FFFFFF",
    picker1: "#c4b5fd",
    picker2: "#5eead4",
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    primary: "#3A86FF",
    secondary: "#FFBE0B",
    background: "#0F172A",
    card: "#1E293B",
    textPrimary: "#F1F5F9",
    textSecondary: "#94A3B8",
    border: "#334155",
    statusbar: "#0F172A",
    tabBarBackground: "#1E293B",
    cardPrimary: "#1E40AF", // Tailwind blue-900
    cardSecondary: "#064E3B",
    picker1: "#0d9488",
    picker2: "#5b21b6",
  },
};
