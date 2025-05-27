import "../global.css";
import { StatusBar } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useThemeStore } from "~/store/theme";
import DatabaseProvider from "~/database/DatabaseProvider";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { initializeTheme, theme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <DatabaseProvider>
      <StatusBar
        backgroundColor={theme.colors.background}
        networkActivityIndicatorVisible
        showHideTransition={"fade"}
        animated
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Notifications",
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTitleStyle: {
              color: theme.colors.textPrimary,
            },
            headerTintColor: theme.colors.textPrimary,
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </DatabaseProvider>
  );
}
