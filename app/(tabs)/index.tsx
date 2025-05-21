import { Text, View } from 'react-native';
import ThemeText from '~/components/Text';
import ThemeBackground from '~/components/ThemeBackground';

const Homepage = () => {
  return (
    <ThemeBackground>
      <ThemeText>My Theme Text</ThemeText>
    </ThemeBackground>
  );
};

export default Homepage;
