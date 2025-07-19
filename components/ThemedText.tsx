import { Text, TextStyle, useColorScheme } from "react-native";

type TextType = "title" | "subtitle" | "default" | "defaultSemiBold" | "small";

interface ThemedTextProps {
  children: React.ReactNode;
  type?: TextType;
  style?: TextStyle;
}

const textStyles: Record<TextType, TextStyle> = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  small: {
    fontSize: 14,
  },
};

export function ThemedText({
  children,
  type = "default",
  style,
}: ThemedTextProps) {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[
        textStyles[type],
        {
          color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
