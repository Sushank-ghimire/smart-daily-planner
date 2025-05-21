import { StyleSheet, Text, View } from 'react-native';
import ThemeBackground from '~/components/ThemeBackground';
import ThemeText from '~/components/Text';

const habits = () => {
  return (
    <ThemeBackground>
      <ThemeText>My Habits</ThemeText>
    </ThemeBackground>
  );
};

export default habits;

const styles = StyleSheet.create({});
