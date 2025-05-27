import { StyleSheet, FlatList, View, ActivityIndicator, RefreshControl } from "react-native";
import ThemeBackground from "~/components/ThemeBackground";
import ThemeText from "~/components/Text";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useThemeStore } from "~/store/theme";

interface HabitTask {
  id: string;
  title: string;
  habitStreak: number;
  category: string;
  createdAt: string;
}

const Habits = () => {
  const db = useSQLiteContext();

  const { theme } = useThemeStore();
  const [habits, setHabits] = useState<HabitTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchHabits = async () => {
    try {
      const result = await db.getAllAsync<HabitTask>(
        "SELECT id, title, habitStreak, category, createdAt FROM tasks WHERE isHabit = 1 ORDER BY createdAt DESC"
      );
      setHabits(result);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
      setError("Could not load habits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(habits);

    fetchHabits();
  }, []);

  if (loading) {
    return (
      <ThemeBackground>
        <ActivityIndicator size="large" style={styles.loader} />
        <ThemeText>Loading habits...</ThemeText>
      </ThemeBackground>
    );
  }

  if (error) {
    return (
      <ThemeBackground>
        <View className="flex h-full w-full items-center justify-center">
          <ThemeText style={[styles.error]} className="text-2xl capitalize">
            {error}
          </ThemeText>
        </View>
      </ThemeBackground>
    );
  }

  if (habits.length === 0) {
    return (
      <ThemeBackground>
        <View className="flex h-full w-full items-center justify-center">
          <ThemeText className="text-2xl">No habits yet. Start building one!</ThemeText>
        </View>
      </ThemeBackground>
    );
  }

  return (
    <ThemeBackground>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.habitCard}>
            <ThemeText style={styles.habitName}>{item.title}</ThemeText>
            <ThemeText>Streak: {item.habitStreak ?? 0}</ThemeText>
            <ThemeText>Category: {item.category}</ThemeText>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchHabits}
            colors={[theme.colors.primary]} // Android spinner
            progressBackgroundColor={theme.colors.card} // Android background
            tintColor={theme.colors.primary} // iOS spinner
            titleColor={theme.colors.textPrimary} // iOS title
          />
        }
      />
    </ThemeBackground>
  );
};

export default Habits;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  habitCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  habitName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
});
