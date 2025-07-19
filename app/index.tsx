import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")} // Add your app logo
          style={styles.logo}
        />
        <ThemedText type="title">FoodShare</ThemedText>
      </ThemedView>

      <ThemedView style={styles.actionContainer}>
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("/donate")}
        >
          <ThemedText type="subtitle">Donate Food</ThemedText>
          <ThemedText>Share your surplus food with those in need</ThemedText>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("/request")}
        >
          <ThemedText type="subtitle">Request Food</ThemedText>
          <ThemedText>Find available food donations near you</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedText type="subtitle">Impact Statistics</ThemedText>
        <ThemedView style={styles.statsRow}>
          <ThemedView style={styles.statBox}>
            <ThemedText type="title">150+</ThemedText>
            <ThemedText>Meals Shared</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statBox}>
            <ThemedText type="title">50+</ThemedText>
            <ThemedText>Active Donors</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.recentActivity}>
        <ThemedText type="subtitle">Recent Activity</ThemedText>
        {/* Add your recent activity list component here */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  actionContainer: {
    padding: 20,
    gap: 15,
  },
  actionButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#A1CEDC",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  recentActivity: {
    padding: 20,
  },
});
