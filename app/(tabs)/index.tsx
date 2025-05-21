import { Animated, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import ThemeText from '~/components/Text';
import ThemeBackground from '~/components/ThemeBackground';
import { useThemeStore } from '~/store/theme';
import ListHeaderCard from '~/components/ListHeaderCard';
import EmptyListAnimation from '~/components/EmptyList';

const Homepage = () => {
  const hours = new Date().getHours();
  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;

  const { theme } = useThemeStore();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getGreeting = () => {
    if (hours < 12) return { text: 'Good Morning', emoji: '🌤️' };
    if (hours < 18) return { text: 'Good Afternoon', emoji: '☀️' };
    return { text: 'Good Evening', emoji: '🌙' };
  };

  const { text: greeting, emoji } = getGreeting();

  const header = (
    <Animated.View
      style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
      <ThemeText style={styles.greeting}>
        {greeting} <Animated.Text style={styles.emoji}>{emoji}</Animated.Text>
      </ThemeText>
      <ThemeText style={styles.subtitle}>Here's your schedule for today</ThemeText>
      <ListHeaderCard />
    </Animated.View>
  );

  return (
    <ThemeBackground>
      <FlatList
        data={[]} // Replace with your data array
        keyExtractor={(_, index) => index.toString()}
        renderItem={() => null}
        contentContainerStyle={styles.container}
        ListHeaderComponent={header}
        ListEmptyComponent={<EmptyListAnimation />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
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

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 38,
  },
  emoji: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 32,
  },
});

export default Homepage;
