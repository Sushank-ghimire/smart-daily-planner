import { forwardRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useThemeStore } from '~/store/theme';

export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref) => {
    const { theme } = useThemeStore();
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <Image
            source={require('~/assets/icons/bell.png')}
            style={[
              styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            height={25}
            width={30}
            tintColor={theme.colors.textPrimary}
            resizeMethod="none"
            resizeMode="contain"
          />
        )}
      </Pressable>
    );
  }
);

HeaderButton.displayName = 'HeaderButton';

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
