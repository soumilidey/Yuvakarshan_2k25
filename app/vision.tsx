import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function VisionScreen() {
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
          <ThemedText type="title">Our Vision</ThemedText>
          <ThemedText style={styles.subtitle}>
            Creating a World Without Food Waste
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Core Vision</ThemedText>
          <ThemedText style={styles.paragraph}>
            We envision a future where no edible food goes to waste, where
            communities are connected through sharing, and where technology
            bridges the gap between excess and need.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Long-Term Goals</ThemedText>

          <ThemedView style={styles.goalItem}>
            <ThemedText type="defaultSemiBold">Global Reach</ThemedText>
            <ThemedText style={styles.paragraph}>
              Expand our platform to serve communities worldwide, making food
              sharing a global movement.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.goalItem}>
            <ThemedText type="defaultSemiBold">Zero Food Waste</ThemedText>
            <ThemedText style={styles.paragraph}>
              Reduce food waste by 50% in our operating communities by 2030
              through efficient redistribution.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.goalItem}>
            <ThemedText type="defaultSemiBold">
              Technology Innovation
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              Implement AI-driven solutions for better matching of donors with
              recipients and predictive analytics for food supply.
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Sustainability Commitment</ThemedText>
          <ThemedText style={styles.paragraph}>
            {
              "Beyond food sharing, we're committed to reducing our environmental footprint through eco-friendly delivery solutions and sustainable packaging initiatives."
            }
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Join Our Vision</ThemedText>
          <ThemedText style={styles.paragraph}>
            {
              "Together, we can create lasting change. Whether you're an individual, business, or organization, your participation helps build a more sustainable and equitable food system."
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
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
  },
  section: {
    padding: 20,
    gap: 15,
  },
  goalItem: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  paragraph: {
    lineHeight: 22,
    fontSize: 14,
  },
});
