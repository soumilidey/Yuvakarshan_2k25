import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const { width } = Dimensions.get("window");

type ValidRoutes = "/" | "/donate" | "/request" | "/about" | "/vision";

interface MenuItem {
  label: string;
  route: ValidRoutes;
}

const menuItems: MenuItem[] = [
  { label: "Home", route: "/" },
  { label: "Donate Food", route: "/donate" },
  { label: "Request Food", route: "/request" },
  { label: "About Us", route: "/about" },
  { label: "Our Vision", route: "/vision" },
];

export function Menu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width));

  const toggleMenu = () => {
    const toValue = isOpen ? -width : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleNavigation = (route: ValidRoutes) => {
    toggleMenu();
    router.push(route);
  };

  return (
    <>
      <Pressable style={styles.menuButton} onPress={toggleMenu}>
        <ThemedText style={styles.menuIcon}>☰</ThemedText>
      </Pressable>

      {isOpen && (
        <Pressable style={styles.overlay} onPress={toggleMenu}>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <ThemedView style={styles.menu}>
              <ThemedText type="title" style={styles.menuTitle}>
                Menu
              </ThemedText>

              {menuItems.map((item, index) => (
                <Pressable
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  <ThemedText style={styles.menuItemText}>
                    {item.label}
                  </ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          </Animated.View>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 100,
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.7,
    zIndex: 100,
  },
  menu: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  menuTitle: {
    marginBottom: 30,
    textAlign: "center",
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  menuItemText: {
    fontSize: 16,
  },
});
