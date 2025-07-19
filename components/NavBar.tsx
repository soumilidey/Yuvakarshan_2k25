import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Menu } from "./Menu";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface NavBarProps {
  showBack?: boolean;
  isLoggedIn?: boolean;
  username?: string;
}

export function NavBar({
  showBack = false,
  isLoggedIn = false,
  username = "",
}: NavBarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.leftSection}>
        {showBack ? (
          <Pressable style={styles.button} onPress={() => router.back()}>
            <ThemedText>← Back</ThemedText>
          </Pressable>
        ) : (
          <Menu />
        )}
      </View>

      <View style={styles.rightSection}>
        {isLoggedIn ? (
          <ThemedText style={styles.username}>{username}</ThemedText>
        ) : (
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <ThemedText>Login</ThemedText>
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: "#A1CEDC",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  username: {
    fontWeight: "500",
  },
});
