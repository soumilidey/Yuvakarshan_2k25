import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Footer } from "@/components/Footer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function AboutScreen() {
  const router = useRouter();
  const mealsCount = useRef(0);
  const usersCount = useRef(0);
  const [displayMeals, setDisplayMeals] = useState(0);
  const [displayUsers, setDisplayUsers] = useState(0);

  // Enhanced animation values
  const titleSlide = useRef(new Animated.Value(-100)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Section animations
  const missionSlide = useRef(new Animated.Value(50)).current;
  const storySlide = useRef(new Animated.Value(100)).current;
  const statsOpacity = useRef(new Animated.Value(0)).current;
  const statsScale = useRef(new Animated.Value(0.8)).current;
  const teamSlide = useRef(new Animated.Value(150)).current;
  const joinSlide = useRef(new Animated.Value(200)).current;

  // Team card animations
  const leaderCard1Scale = useRef(new Animated.Value(0)).current;
  const leaderCard2Scale = useRef(new Animated.Value(0)).current;
  const teamCard1Scale = useRef(new Animated.Value(0)).current;
  const teamCard2Scale = useRef(new Animated.Value(0)).current;
  const teamCard3Scale = useRef(new Animated.Value(0)).current;

  const [statsAnimationTriggered, setStatsAnimationTriggered] = useState(false);
  const [teamAnimationTriggered, setTeamAnimationTriggered] = useState(false);

  useEffect(() => {
    // Staggered animation sequence
    const animations = Animated.stagger(150, [
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
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(missionSlide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(storySlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(joinSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    animations.start();

    // Counter animations
    const animateMeals = () => {
      const targetMeals = 250;
      const increment = targetMeals / 80;
      const timer = setInterval(() => {
        mealsCount.current += increment;
        if (mealsCount.current >= targetMeals) {
          mealsCount.current = targetMeals;
          clearInterval(timer);
        }
        setDisplayMeals(Math.floor(mealsCount.current));
      }, 25);
    };

    const animateUsers = () => {
      const targetUsers = 80;
      const increment = targetUsers / 80;
      const timer = setInterval(() => {
        usersCount.current += increment;
        if (usersCount.current >= targetUsers) {
          usersCount.current = targetUsers;
          clearInterval(timer);
        }
        setDisplayUsers(Math.floor(usersCount.current));
      }, 25);
    };

    const mealsTimer = setTimeout(animateMeals, 2000);
    const usersTimer = setTimeout(animateUsers, 2200);

    return () => {
      clearTimeout(mealsTimer);
      clearTimeout(usersTimer);
    };
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const screenHeight = event.nativeEvent.layoutMeasurement.height;

    // Stats animation
    if (scrollY > screenHeight * 0.3 && !statsAnimationTriggered) {
      setStatsAnimationTriggered(true);
      Animated.parallel([
        Animated.timing(statsOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(statsScale, {
          toValue: 1,
          tension: 120,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Team animation
    if (scrollY > screenHeight * 0.5 && !teamAnimationTriggered) {
      setTeamAnimationTriggered(true);

      Animated.timing(teamSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();

      Animated.stagger(200, [
        Animated.spring(leaderCard1Scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(leaderCard2Scale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        Animated.stagger(150, [
          Animated.spring(teamCard1Scale, {
            toValue: 1,
            tension: 120,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.spring(teamCard2Scale, {
            toValue: 1,
            tension: 120,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.spring(teamCard3Scale, {
            toValue: 1,
            tension: 120,
            friction: 6,
            useNativeDriver: true,
          }),
        ]).start();
      }, 400);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <ThemedView style={styles.headerSection}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
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
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{ scale: logoScale }],
                  opacity: logoOpacity,
                },
              ]}
            ></Animated.View>

            <ThemedText style={styles.mainTitle}>Our</ThemedText>
            <ThemedText style={styles.titleAccent}>Journey</ThemedText>
            <ThemedText style={styles.subtitle}>
              Connecting hearts through food
            </ThemedText>
          </Animated.View>
        </ThemedView>

        {/* Mission Section */}
        <Animated.View
          style={[
            styles.section,
            { transform: [{ translateY: missionSlide }] },
          ]}
        >
          <ThemedView style={styles.missionCard}>
            <ThemedText style={styles.sectionTitle}>🌟 Our Mission</ThemedText>
            <ThemedText style={styles.cardText}>
              FoodShare was born from a simple yet powerful idea: to connect
              those with surplus food to those in need. We believe that no food
              should go to waste while people go hungry.
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Story Section */}
        <Animated.View
          style={[styles.section, { transform: [{ translateY: storySlide }] }]}
        >
          <ThemedView style={styles.storyCard}>
            <ThemedText style={styles.sectionTitle}>
              🚀 How It Started
            </ThemedText>
            <ThemedText style={styles.cardText}>
              Founded in 2025, our journey began when we noticed the growing
              disparity between food waste and food insecurity in our
              communities. What started as a small local initiative has grown
              into a platform connecting thousands of donors and recipients.
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View
          style={[
            styles.statsSection,
            {
              opacity: statsOpacity,
              transform: [{ scale: statsScale }],
            },
          ]}
        >
          <ThemedView style={styles.statsHeader}>
            <ThemedText style={styles.statsTitle}>Our Impact</ThemedText>
            <ThemedText style={styles.statsSubtitle}>
              Real numbers, real change
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.statsGrid}>
            <ThemedView style={styles.mealsCard}>
              <ThemedText style={styles.statNumber}>
                {displayMeals.toLocaleString()}+
              </ThemedText>
              <ThemedText style={styles.statLabel}>Meals Shared</ThemedText>
            </ThemedView>

            <ThemedView style={styles.usersCard}>
              <ThemedText style={styles.statNumber}>
                {displayUsers.toLocaleString()}+
              </ThemedText>
              <ThemedText style={styles.statLabel}>Active Users</ThemedText>
            </ThemedView>
          </ThemedView>
        </Animated.View>

        {/* Team Section */}
        <Animated.View
          style={[
            styles.teamSection,
            { transform: [{ translateY: teamSlide }] },
          ]}
        >
          <ThemedView style={styles.teamHeader}>
            <ThemedText style={styles.teamTitle}>Meet Our Team</ThemedText>
            <ThemedText style={styles.teamSubtitle}>
              The people behind the mission
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.leadershipRow}>
            <Animated.View
              style={[
                styles.leaderCard,
                { transform: [{ scale: leaderCard1Scale }] },
              ]}
            >
              <ThemedView style={styles.leaderCardContent}>
                <View style={styles.leaderImageContainer}>
                  <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={styles.leaderImage}
                  />
                </View>
                <ThemedText style={styles.leaderName}>Rishabh Das</ThemedText>
                <ThemedText style={styles.leaderRole}>
                  Frontend Developer
                </ThemedText>
                <ThemedView style={styles.leaderBadge}>
                  <ThemedText style={styles.badgeText}>Lead</ThemedText>
                </ThemedView>
              </ThemedView>
            </Animated.View>

            <Animated.View
              style={[
                styles.leaderCard,
                { transform: [{ scale: leaderCard2Scale }] },
              ]}
            >
              <ThemedView style={styles.leaderCardContentAlt}>
                <View style={styles.leaderImageContainer}>
                  <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={styles.leaderImage}
                  />
                </View>
                <ThemedText style={styles.leaderNameAlt}>
                  Soumili Dey
                </ThemedText>
                <ThemedText style={styles.leaderRoleAlt}>
                  Backend Developer
                </ThemedText>
                <ThemedView style={styles.leaderBadgeAlt}>
                  <ThemedText style={styles.badgeTextAlt}>Lead</ThemedText>
                </ThemedView>
              </ThemedView>
            </Animated.View>
          </ThemedView>
        </Animated.View>

        {/* Join Section */}
        <Animated.View
          style={[styles.section, { transform: [{ translateY: joinSlide }] }]}
        >
          <ThemedView style={styles.joinCard}>
            <ThemedText style={styles.sectionTitle}>
              🤝 Join Our Mission
            </ThemedText>
            <ThemedText style={styles.cardText}>
              {
                "Whether you're a restaurant, grocery store, or individual with "
              }
              {
                "surplus food, or someone in need of food assistance, you can make "
              }
              {"a difference. Join us in our mission to reduce food waste and "}
              {"fight hunger in our communities."}
            </ThemedText>
          </ThemedView>
        </Animated.View>

        <ThemedView style={styles.bottomSpacer}>{""}</ThemedView>
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
    paddingBottom: 30,
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
  backButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoWrapper: {
    backgroundColor: "#ffd700",
    borderRadius: 50,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  mainTitle: {
    fontSize: 44,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 2,
  },
  titleAccent: {
    fontSize: 44,
    fontWeight: "800",
    color: "#ffd700", // Gold accent
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

  // Section styles
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  missionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#e0d4f7", // Light purple border
  },
  storyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#fef3c7", // Light yellow border
  },
  joinCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#e0d4f7", // Light purple border
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6b46c1", // Purple
    marginBottom: 12,
    textAlign: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    textAlign: "center",
  },

  // Stats Section
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
    gap: 16,
  },
  mealsCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    position: "relative",
    backgroundColor: "#8b5fbf", // Purple background
  },
  usersCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    position: "relative",
    backgroundColor: "#f59e0b", // Yellow background
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  statEmoji: {
    fontSize: 24,
    position: "absolute",
    top: 15,
    right: 15,
  },

  // Team Section
  teamSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  teamHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6b46c1", // Purple
    marginBottom: 4,
  },
  teamSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  leadershipRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  leaderCard: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  leaderCardContent: {
    backgroundColor: "#8b5fbf", // Purple background
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    minHeight: 200,
    justifyContent: "center",
  },
  leaderCardContentAlt: {
    backgroundColor: "#f59e0b", // Yellow background
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    minHeight: 200,
    justifyContent: "center",
  },
  leaderImageContainer: {
    marginBottom: 15,
    borderRadius: 60,
    padding: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  leaderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  leaderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center",
  },
  leaderNameAlt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center",
  },
  leaderRole: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 10,
  },
  leaderRoleAlt: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 10,
  },
  leaderBadge: {
    backgroundColor: "#ffd700",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  leaderBadgeAlt: {
    backgroundColor: "#8b5fbf",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  badgeTextAlt: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  teamRow: {
    flexDirection: "row",
    gap: 12,
  },
  teamCard: {
    flex: 1,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  teamCardContent: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    minHeight: 140,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e0d4f7", // Light purple border
  },
  teamImageContainer: {
    marginBottom: 10,
    borderRadius: 40,
    padding: 2,
    backgroundColor: "rgba(107, 70, 193, 0.1)",
  },
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b46c1", // Purple
    marginBottom: 3,
    textAlign: "center",
  },
  teamRole: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },

  bottomSpacer: {
    height: 20,
  },
});
