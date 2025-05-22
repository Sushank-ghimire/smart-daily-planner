import { Link, Tabs } from "expo-router";
import { HeaderButton } from "../../components/HeaderButton";
import { TabBarIcon } from "../../components/TabBarIcon";
import { useThemeStore } from "~/store/theme";

export default function TabLayout() {
  const { theme } = useThemeStore();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3A86FF",
        tabBarStyle: {
          left: 16,
          right: 16,
          height: 65,
          backgroundColor: theme.colors.background,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          borderTopLeftRadius: theme.mode == "light" ? 25 : 0,
          borderTopEndRadius: theme.mode == "light" ? 25 : 0,
          borderTopColor: theme.colors.border,
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: "#9CA3AF",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.textPrimary,
        },
        animation: theme.mode === "dark" ? "none" : "shift",
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon size={size} source={require("~/assets/icons/home.png")} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color }) => (
            <TabBarIcon source={require("~/assets/icons/calendar.png")} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => (
            <TabBarIcon source={require("~/assets/icons/barbell.png")} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon source={require("~/assets/icons/settings.png")} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
