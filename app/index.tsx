import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet } from "react-native";

import { Menu } from "@/components/Menu";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const router = useRouter();

  // Animation refs
  const titleSlide = useRef(new Animated.Value(-100)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.8)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const actionButtonsSlide = useRef(new Animated.Value(50)).current;
  const statsSlide = useRef(new Animated.Value(100)).current;
  const recentActivitySlide = useRef(new Animated.Value(150)).current;

  // Counter states and refs
  const [displayMeals, setDisplayMeals] = useState(0);
  const [displayDonors, setDisplayDonors] = useState(0);
  const mealsCount = useRef(0);
  const donorsCount = useRef(0);

  // Counter animation functions
  const animateMeals = () => {
    const targetMeals = 254;
    const increment = targetMeals / 120;
    const timer = setInterval(() => {
      mealsCount.current += increment;
      if (mealsCount.current >= targetMeals) {
        mealsCount.current = targetMeals;
        clearInterval(timer);
      }
      setDisplayMeals(Math.floor(mealsCount.current));
    }, 15);
  };

  const animateDonors = () => {
    const targetDonors = 82;
    const increment = targetDonors / 120;
    const timer = setInterval(() => {
      donorsCount.current += increment;
      if (donorsCount.current >= targetDonors) {
        donorsCount.current = targetDonors;
        clearInterval(timer);
      }
      setDisplayDonors(Math.floor(donorsCount.current));
    }, 15);
  };

  useEffect(() => {
    // Staggered animation sequence
    const animations = Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
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
      Animated.timing(actionButtonsSlide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(statsSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(recentActivitySlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    animations.start(() => {
      // Start counter animations after main animations
      setTimeout(() => {
        animateMeals();
        animateDonors();
      }, 400);
    });
  }, [
    titleSlide,
    titleOpacity,
    heroScale,
    heroOpacity,
    actionButtonsSlide,
    statsSlide,
    recentActivitySlide,
  ]);

  return (
    <ThemedView style={styles.container}>
      <Menu />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <ThemedView style={styles.headerSection}>
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <ThemedText style={styles.loginText}>Sign In</ThemedText>
          </Pressable>

          <Animated.View
            style={[
              styles.titleContainer,
              {
                transform: [{ translateY: titleSlide }],
                opacity: titleOpacity,
              },
            ]}
          >
            <ThemedText style={styles.mainTitle}>Food</ThemedText>
            <ThemedText style={styles.titleAccent}>Share</ThemedText>
            <ThemedText style={styles.subtitle}>
              Connecting hearts through food
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
              🌟 Make a Difference Today
            </ThemedText>
            <ThemedText style={styles.heroDescription}>
              Join our community of food heroes sharing meals and spreading
              kindness across the city
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionSection,
            { transform: [{ translateY: actionButtonsSlide }] },
          ]}
        >
          <Pressable
            style={[styles.actionButton, styles.donateButton]}
            onPress={() => router.push("/donate")}
          >
            <ThemedText style={styles.actionIcon}>🍽️</ThemedText>
            <ThemedText style={styles.actionTitle}>Share Food</ThemedText>
            <ThemedText style={styles.actionSubtitle}>
              Got extra food? Share the love!
            </ThemedText>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.requestButton]}
            onPress={() => router.push("/request")}
          >
            <ThemedText style={styles.actionIcon}>🔍</ThemedText>
            <ThemedText style={styles.actionTitle}>Find Food</ThemedText>
            <ThemedText style={styles.actionSubtitle}>
              Discover available meals nearby
            </ThemedText>
          </Pressable>
        </Animated.View>

        {/* Live Stats */}
        <Animated.View
          style={[
            styles.statsSection,
            { transform: [{ translateY: statsSlide }] },
          ]}
        >
          <ThemedView style={styles.statsHeader}>
            <ThemedText style={styles.statsTitle}>Live Impact</ThemedText>
            <ThemedText style={styles.statsSubtitle}>
              Real-time community impact
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.statsGrid}>
            <ThemedView style={styles.mealsCard}>
              <ThemedText style={styles.statNumber}>
                {displayMeals.toLocaleString()}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Meals Shared</ThemedText>
            </ThemedView>

            <ThemedView style={styles.donorsCard}>
              <ThemedText style={styles.statNumber}>
                {displayDonors.toLocaleString()}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Food Heroes</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.impactBanner}>
            <ThemedText style={styles.impactText}>
              🌍 Together we&apos;re fighting food waste!
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View
          style={[
            styles.recentSection,
            { transform: [{ translateY: recentActivitySlide }] },
          ]}
        >
          <ThemedView style={styles.recentHeader}>
            <ThemedText style={styles.recentTitle}>⚡ Happening Now</ThemedText>
            <ThemedText style={styles.recentSubtitle}>
              Latest community activities
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.activityCard}>
            <ThemedText style={styles.activityText}>
              📍 5 new food donations in Airoli
            </ThemedText>
            <ThemedText style={styles.activityTime}>2 minutes ago</ThemedText>
          </ThemedView>

          <ThemedView style={styles.activityCard}>
            <ThemedText style={styles.activityText}>
              🎉 50 meals shared this hour!
            </ThemedText>
            <ThemedText style={styles.activityTime}>8 minutes ago</ThemedText>
          </ThemedView>

          <Pressable style={styles.viewMoreButton}>
            <ThemedText style={styles.viewMoreText}>
              View All Activity →
            </ThemedText>
          </Pressable>
        </Animated.View>

        {/* Bottom Spacer */}
        <ThemedView style={styles.bottomSpacer}>
          <ThemedText> </ThemedText>
        </ThemedView>
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
  loginButton: {
    position: "absolute",
    right: 24,
    top: 60,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 10,
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 40,
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

  // Action Section - Purple and yellow buttons
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 16,
  },
  actionButton: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  donateButton: {
    backgroundColor: "#8b5fbf", // Rich purple
  },
  requestButton: {
    backgroundColor: "#f59e0b", // Warm yellow/amber
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },

  // Stats Section - White cards with purple and yellow accents
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  statsHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6b46c1", // Purple
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  mealsCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e0d4f7", // Light purple border
  },
  donorsCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#fef3c7", // Light yellow border
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6b46c1", // Purple numbers
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textAlign: "center",
  },
  statEmoji: {
    fontSize: 20,
    position: "absolute",
    top: 12,
    right: 12,
    opacity: 0.6,
  },
  impactBanner: {
    backgroundColor: "#fef3c7", // Light yellow background
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#f59e0b", // Yellow border
  },
  impactText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400e", // Darker yellow/amber text
    textAlign: "center",
  },

  // Recent Section - White cards with purple accents
  recentSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  recentHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6b46c1", // Purple
    marginBottom: 4,
  },
  recentSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5fbf", // Purple left border
  },
  activityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  viewMoreButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    alignItems: "center",
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8b5fbf", // Purple
  },

  bottomSpacer: {
    height: 20,
  },
});
