import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";
import { useThemeStore } from "~/store/theme";
import { AntDesign } from "@expo/vector-icons";

type ButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof AntDesign.glyphMap;
  iconPosition?: "left" | "right";
  className?: string;
  textClassName?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  className = "",
  textClassName = "",
}) => {
  const { theme } = useThemeStore();

  const baseStyle = `flex-row items-center justify-center px-4 py-3 ${className}`;
  const textStyle = `text-base font-medium ${textClassName}`;

  return (
    <TouchableOpacity
      className={`${baseStyle} ${disabled || loading ? "opacity-50" : "bg-primary"}`}
      onPress={onPress}
      disabled={disabled || loading}
      style={{ backgroundColor: theme.colors.primary }}>
      {loading ? (
        <ActivityIndicator color={theme.colors.textPrimary} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && iconPosition === "left" && (
            <AntDesign name={icon} size={18} color={theme.colors.textPrimary} />
          )}
          <Text style={{ color: theme.colors.textPrimary }} className={textStyle}>
            {label}
          </Text>
          {icon && iconPosition === "right" && (
            <AntDesign name={icon} size={18} color={theme.colors.textPrimary} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
