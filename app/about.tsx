import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ThemedText>← Back</ThemedText>
      </Pressable>

      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.header}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <ThemedText type="title">Our Journey</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Our Mission</ThemedText>
          <ThemedText style={styles.paragraph}>
            FoodShare was born from a simple yet powerful idea: to connect those
            with surplus food to those in need. We believe that no food should
            go to waste while people go hungry.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">How It Started</ThemedText>
          <ThemedText style={styles.paragraph}>
            Founded in 2025, our journey began when we noticed the growing
            disparity between food waste and food insecurity in our communities.
            What started as a small local initiative has grown into a platform
            connecting thousands of donors and recipients.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Our Impact</ThemedText>
          <ThemedView style={styles.statsContainer}>
            <ThemedView style={styles.statBox}>
              <ThemedText type="title">1000+</ThemedText>
              <ThemedText>Meals Shared</ThemedText>
            </ThemedView>
            <ThemedView style={styles.statBox}>
              <ThemedText type="title">500+</ThemedText>
              <ThemedText>Active Users</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Join Our Mission</ThemedText>
          <ThemedText style={styles.paragraph}>
            {
              "Whether you're a restaurant, grocery store, or individual with surplus food, or someone in need of food assistance, you can make a difference. Join us in our mission to reduce food waste and fight hunger in our communities."
            }
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
    padding: 6,
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginTop: 40,
    gap: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  section: {
    padding: 20,
    gap: 10,
  },
  paragraph: {
    lineHeight: 22,
    fontSize: 14,
  },
  statsContainer: {
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
});
