import { Image, Text, View } from 'react-native';

interface TabBarIconProps {
  source: any; // PNG icon (require)
  label?: string; // Label under the icon
  color: string; // Icon and label tint color
  size?: number; // Icon size
}

export const TabBarIcon = ({ source, label, color, size = 24 }: TabBarIconProps) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          tintColor: color,
          marginBottom: 2,
        }}
        resizeMode="contain"
      />
      {label && (
        <Text className="text-xs font-medium" style={{ color }}>
          {label}
        </Text>
      )}
    </View>
  );
};
