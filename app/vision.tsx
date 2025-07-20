import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet } from "react-native";

import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function VisionScreen() {
  const router = useRouter();

  // Animation refs
  const headerSlide = useRef(new Animated.Value(-100)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.8)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const problemSlide = useRef(new Animated.Value(50)).current;
  const visionSlide = useRef(new Animated.Value(100)).current;
  const goalsSlide = useRef(new Animated.Value(150)).current;
  const impactSlide = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    // Staggered animation sequence
    const animations = Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(heroScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(problemSlide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(visionSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(goalsSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(impactSlide, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    animations.start();
  }, [
    headerSlide,
    headerOpacity,
    heroScale,
    heroOpacity,
    problemSlide,
    visionSlide,
    goalsSlide,
    impactSlide,
  ]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <ThemedView style={styles.headerSection}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ThemedText style={styles.backText}>← Back</ThemedText>
          </Pressable>

          <Animated.View
            style={[
              styles.titleContainer,
              {
                transform: [{ translateY: headerSlide }],
                opacity: headerOpacity,
              },
            ]}
          >
            <ThemedText style={styles.mainTitle}>Our</ThemedText>
            <ThemedText style={styles.titleAccent}>Vision</ThemedText>
            <ThemedText style={styles.subtitle}>
              Creating a world without food waste
            </ThemedText>
          </Animated.View>
        </ThemedView>

        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              transform: [{ scale: heroScale }],
              opacity: heroOpacity,
            },
          ]}
        >
          <ThemedView style={styles.heroCard}>
            <ThemedText style={styles.heroTitle}>
              🌍 Food is a Human Right
            </ThemedText>
            <ThemedText style={styles.heroDescription}>
              We believe everyone deserves access to nutritious food. Our
              mission is to bridge the gap between abundance and need, ensuring
              no one goes hungry while excess food goes to waste.
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Real World Problem Section */}
        <Animated.View
          style={[
            styles.problemSection,
            { transform: [{ translateY: problemSlide }] },
          ]}
        >
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              🚨 The Global Challenge
            </ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              Understanding the scale of the problem
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.problemGrid}>
            <ThemedView style={styles.problemCard}>
              <ThemedText style={styles.problemStat}>1.3B</ThemedText>
              <ThemedText style={styles.problemLabel}>
                Tons of food wasted annually
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.problemCard}>
              <ThemedText style={styles.problemStat}>828M</ThemedText>
              <ThemedText style={styles.problemLabel}>
                People face hunger worldwide
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.problemDetails}>
            <ThemedText style={styles.problemText}>
              📍{" "}
              <ThemedText style={styles.boldText}>In India alone:</ThemedText>{" "}
              40% of food produced is wasted while 195 million people remain
              undernourished. Our technology connects surplus food with those
              who need it most.
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Core Vision Section */}
        <Animated.View
          style={[
            styles.visionSection,
            { transform: [{ translateY: visionSlide }] },
          ]}
        >
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              ✨ Our Core Vision
            </ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              Building a sustainable future together
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.visionCard}>
            <ThemedText style={styles.visionText}>
              {
                "We envision communities where technology empowers compassion, where surplus becomes sustenance, and where every person has dignified access to nutritious food. Through FoodShare, we're not just reducing waste—we're building bridges of humanity."
              }
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.rightsCard}>
            <ThemedText style={styles.rightsTitle}>
              🤝 Food as a Fundamental Right
            </ThemedText>
            <ThemedText style={styles.rightsText}>
              {
                "Article 25 of the Universal Declaration of Human Rights recognizes food as essential for human dignity. We're committed to making this right accessible to all through community-driven solutions."
              }
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Goals Section */}
        <Animated.View
          style={[
            styles.goalsSection,
            { transform: [{ translateY: goalsSlide }] },
          ]}
        >
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              🎯 Our 2030 Goals
            </ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              Measurable impact for lasting change
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.goalCard}>
            <ThemedText style={styles.goalIcon}>🌐</ThemedText>
            <ThemedText style={styles.goalTitle}>Global Reach</ThemedText>
            <ThemedText style={styles.goalDescription}>
              Scale to 100+ cities across India and expand internationally,
              creating a worldwide network of food sharing communities.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.goalCard}>
            <ThemedText style={styles.goalIcon}>♻️</ThemedText>
            <ThemedText style={styles.goalTitle}>
              50% Waste Reduction
            </ThemedText>
            <ThemedText style={styles.goalDescription}>
              Cut food waste by half in our operating communities through
              intelligent matching and efficient distribution networks.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.goalCard}>
            <ThemedText style={styles.goalIcon}>🤖</ThemedText>
            <ThemedText style={styles.goalTitle}>
              AI-Powered Solutions
            </ThemedText>
            <ThemedText style={styles.goalDescription}>
              Deploy machine learning for predictive analytics, optimal routing,
              and personalized matching between donors and recipients.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.goalCard}>
            <ThemedText style={styles.goalIcon}>🏢</ThemedText>
            <ThemedText style={styles.goalTitle}>
              Corporate Partnerships
            </ThemedText>
            <ThemedText style={styles.goalDescription}>
              Partner with restaurants, grocery stores, and food manufacturers
              to create systematic surplus redistribution channels.
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Impact & Call to Action */}
        <Animated.View
          style={[
            styles.impactSection,
            { transform: [{ translateY: impactSlide }] },
          ]}
        >
          <ThemedView style={styles.impactBanner}>
            <ThemedText style={styles.impactTitle}>
              🌱 Join the Movement
            </ThemedText>
            <ThemedText style={styles.impactText}>
              Every meal shared is a step toward justice. Every connection made
              strengthens our community. Together, we can ensure that abundance
              reaches those who need it most.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.actionGrid}>
            <Pressable
              style={[styles.actionButton, styles.donateActionButton]}
              onPress={() => router.push("/donate")}
            >
              <ThemedText style={styles.actionIcon}>🍽️</ThemedText>
              <ThemedText style={styles.actionTitle}>Start Sharing</ThemedText>
            </Pressable>

            <Pressable
              style={[styles.actionButton, styles.requestActionButton]}
              onPress={() => router.push("/request")}
            >
              <ThemedText style={styles.actionIcon}>🔍</ThemedText>
              <ThemedText style={styles.actionTitle}>Find Food</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.sustainabilityCard}>
            <ThemedText style={styles.sustainabilityTitle}>
              🌿 Sustainability Promise
            </ThemedText>
            <ThemedText style={styles.sustainabilityText}>
              {
                "Beyond redistribution, we're committed to eco-friendly delivery solutions, biodegradable packaging, and carbon-neutral operations by 2027."
              }
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Bottom Spacer */}
        <ThemedView style={styles.bottomSpacer}>
          <ThemedText> </ThemedText>
        </ThemedView>
        <Footer />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    flex: 1,
  },

  // Header Section - Purple gradient background
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#8b5fbf", // Rich purple
  },
  backButton: {
    position: "absolute",
    left: 24,
    top: 60,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 10,
  },
  backText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 2,
  },
  titleAccent: {
    fontSize: 48,
    fontWeight: "800",
    color: "#ffd700", // Gold/yellow accent
    textAlign: "center",
    marginTop: -8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },

  // Hero Section - White card with purple accents
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#e0d4f7", // Light purple border
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6b46c1", // Purple text
    textAlign: "center",
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },

  // Problem Section
  problemSection: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6b46c1", // Purple
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  problemGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  problemCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#fee2e2", // Light red border
  },
  problemStat: {
    fontSize: 24,
    fontWeight: "800",
    color: "#dc2626", // Red for urgency
    marginBottom: 4,
  },
  problemLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textAlign: "center",
  },
  problemDetails: {
    backgroundColor: "#fef3c7", // Light yellow background
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#f59e0b", // Yellow border
  },
  problemText: {
    fontSize: 14,
    color: "#92400e", // Darker yellow/amber text
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "700",
  },

  // Vision Section
  visionSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  visionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#e0d4f7", // Light purple border
  },
  visionText: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    textAlign: "center",
  },
  rightsCard: {
    backgroundColor: "#f0fdf4", // Light green background
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#22c55e", // Green border
  },
  rightsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#166534", // Dark green
    marginBottom: 8,
    textAlign: "center",
  },
  rightsText: {
    fontSize: 14,
    color: "#166534",
    lineHeight: 20,
    textAlign: "center",
  },

  // Goals Section
  goalsSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  goalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5fbf", // Purple left border
  },
  goalIcon: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6b46c1", // Purple
    marginBottom: 8,
    textAlign: "center",
  },
  goalDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    textAlign: "center",
  },

  // Impact Section
  impactSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  impactBanner: {
    backgroundColor: "#8b5fbf", // Purple background
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: "center",
  },
  impactTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  impactText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 24,
    textAlign: "center",
  },
  actionGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  donateActionButton: {
    backgroundColor: "#8b5fbf", // Rich purple
  },
  requestActionButton: {
    backgroundColor: "#f59e0b", // Warm yellow/amber
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  sustainabilityCard: {
    backgroundColor: "#ecfdf5", // Very light green
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#10b981", // Green border
  },
  sustainabilityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#065f46", // Dark green
    marginBottom: 8,
    textAlign: "center",
  },
  sustainabilityText: {
    fontSize: 14,
    color: "#065f46",
    lineHeight: 20,
    textAlign: "center",
  },

  bottomSpacer: {
    height: 20,
  },
});
