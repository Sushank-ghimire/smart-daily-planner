import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useRef } from 'react';
import ThemeText from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '~/store/theme';

const ListHeaderCard = () => {
  const { theme } = useThemeStore();
  const cardScale = useRef(new Animated.Value(0.95)).current;

  const handleCardPress = () => {
    // Pulse animation on card press
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleCardPress}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: cardScale }],
            backgroundColor: theme.colors.cardPrimary,
            shadowColor: theme.colors.textPrimary,
          },
        ]}>
        <View style={styles.cardHeader}>
          <ThemeText style={styles.cardTitle}>Today</ThemeText>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="list" size={16} color="#6366f1" />
            <ThemeText style={styles.statText}>3 tasks</ThemeText>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar" size={16} color="#10b981" />
            <ThemeText style={styles.statText}>1 event</ThemeText>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="notifications" size={16} color="#f59e0b" />
            <ThemeText style={styles.statText}>2 reminders</ThemeText>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ListHeaderCard;

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
