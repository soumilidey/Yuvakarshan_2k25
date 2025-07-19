import { View, ViewStyle, useColorScheme } from "react-native";

interface ThemedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ThemedView({ children, style }: ThemedViewProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        {
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
