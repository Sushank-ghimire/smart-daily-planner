import { View, Animated, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import ThemeText from '~/components/Text';
import ThemeBackground from '~/components/ThemeBackground';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '~/store/theme';
import ListHeaderCard from '~/components/ListHeaderCard';

const Homepage = () => {
  const hours = new Date().getHours();
  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const cardScale = useRef(new Animated.Value(0.95)).current;

  const { theme } = useThemeStore();

  useEffect(() => {
    // Entry animations
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
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 5,
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

  const tasks = [];

  return (
    <ThemeBackground>
      <Animated.ScrollView contentContainerStyle={styles.container} style={{ opacity: fadeAnim }}>
        <Animated.View style={{ transform: [{ translateY: slideUpAnim }] }}>
          <ThemeText style={styles.greeting}>
            Good Morning <Animated.Text style={styles.emoji}>🌤️</Animated.Text>
          </ThemeText>
          <ThemeText style={styles.subtitle}>Here's your schedule for today</ThemeText>
        </Animated.View>

        <FlatList
          data={[]}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListHeaderComponent={<ListHeaderCard />}
          renderItem={({}) => <></>}
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        {/* Add more animated components here */}
      </Animated.ScrollView>
    </ThemeBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
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
  card: {
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Homepage;
