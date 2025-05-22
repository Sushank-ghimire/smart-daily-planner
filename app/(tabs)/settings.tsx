import { Switch, View, Animated, StyleSheet } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useThemeStore } from "~/store/theme";
import ThemeBackground from "~/components/ThemeBackground";
import ThemeText from "~/components/Text";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isEnabled, setIsEnabled] = useState(theme.mode === "dark");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const switchAnim = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const onToggle = async () => {
    Animated.timing(switchAnim, {
      toValue: isEnabled ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    toggleTheme();
    setIsEnabled((prev) => !prev);
  };

  const [notificationsEnabled, setNotificationEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationEnabled((prev) => !prev);
  };

  return (
    <ThemeBackground>
      <Animated.ScrollView style={{ opacity: fadeAnim }} contentContainerStyle={styles.container}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <ThemeText style={styles.sectionTitle}>Appearance</ThemeText>

          <Animated.View
            style={[
              styles.optionCard,
              {
                shadowColor: theme.colors.textPrimary,
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
              },
            ]}>
            <View style={styles.optionContent}>
              <Ionicons
                name={isEnabled ? "moon" : "sunny"}
                size={22}
                color={theme.colors.textPrimary}
                style={styles.optionIcon}
              />
              <ThemeText style={styles.optionText}>Dark Mode</ThemeText>
            </View>

            <Animated.View style={[{ transform: [{ scale: 1.1 }] }]}>
              <Switch
                value={isEnabled}
                onValueChange={onToggle}
                thumbColor={isEnabled ? theme.colors.primary : "#f8f9fa"}
                trackColor={{ false: "#e9ecef", true: theme.colors.primary }}
                ios_backgroundColor="#e9ecef"
              />
            </Animated.View>
          </Animated.View>
        </View>
        <View style={styles.section}>
          <ThemeText style={styles.sectionTitle}>Notifications</ThemeText>

          <Animated.View style={[styles.optionCard, { shadowColor: theme.colors.textPrimary }]}>
            <View style={styles.optionContent}>
              <Ionicons
                name="notifications"
                size={22}
                color={theme.colors.textPrimary}
                style={styles.optionIcon}
              />
              <ThemeText style={styles.optionText}>Enable Reminders</ThemeText>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              thumbColor={notificationsEnabled ? theme.colors.primary : "#f8f9fa"}
              trackColor={{ false: "#e9ecef", true: theme.colors.primary }}
            />
          </Animated.View>

          {notificationsEnabled && (
            <Animated.View style={[styles.optionCard, { marginTop: 8 }]}>
              <View style={styles.optionContent}>
                <Ionicons
                  name="time"
                  size={22}
                  color={theme.colors.textPrimary}
                  style={styles.optionIcon}
                />
                <ThemeText style={styles.optionText}>Daily Reminder Time</ThemeText>
              </View>
              <Button
                title="8:00 AM"
                // onPress={() => setShowTimePicker(true)}
                color={theme.colors.primary}
              />
            </Animated.View>
          )}
        </View>
      </Animated.ScrollView>
    </ThemeBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 4,
  },
  optionCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
