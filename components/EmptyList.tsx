import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import ThemeText from '~/components/Text';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '~/store/theme';
import { useRouter } from 'expo-router';

const EmptyListAnimation = () => {
  const { theme } = useThemeStore();
  const router = useRouter();
  const animationProgress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
      <Animated.View style={{ transform: [{ translateY }] }}></Animated.View>
      <ThemeText style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
        Nothing here yet!
      </ThemeText>
      <ThemeText style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        Add some tasks to get started
      </ThemeText>
      <TouchableOpacity
        onPress={() => {
          router.push('/calendar');
        }}
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.8}>
        <Ionicons name="add" size={24} color="white" />
        <ThemeText style={styles.addButtonText}>Create Task</ThemeText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    flexGrow: 1,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: '80%',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default EmptyListAnimation;
