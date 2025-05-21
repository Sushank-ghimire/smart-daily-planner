import { Text, View } from 'react-native';
import { useThemeStore } from '~/store/theme';
import ThemeBackground from '~/components/ThemeBackground';
import ThemeText from '~/components/Text';

const settings = () => {
  const { theme } = useThemeStore();
  return (
    <View>
      <Text>settings</Text>
    </View>
  );
};

export default settings;
