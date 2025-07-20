import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export function Footer() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.copyrightText}>
        © 2025 FoodShare. All rights reserved.
      </ThemedText>
      <ThemedText style={styles.creditsText}>
        Made by RD & SD, DPSRPK
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a787cd", // Purple background matching your theme
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  copyrightText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
    textAlign: "center",
  },
  creditsText: {
    fontSize: 12,
    color: "#ffd700", // Gold/yellow accent matching your theme
    fontWeight: "600",
    textAlign: "center",
  },
});
