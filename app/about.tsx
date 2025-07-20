import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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

import { ThemedText } from "@/components/ThemedText";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function AboutScreen() {
  const router = useRouter();
  const mealsCount = useRef(0);
  const usersCount = useRef(0);
  const [displayMeals, setDisplayMeals] = useState(0);
  const [displayUsers, setDisplayUsers] = useState(0);

  // Enhanced animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;

  // Mission section animations
  const statsOpacity = useRef(new Animated.Value(0)).current;
  const statsScale = useRef(new Animated.Value(0.5)).current;

  // Team card animations
  const leaderCard1Scale = useRef(new Animated.Value(0)).current;
  const leaderCard2Scale = useRef(new Animated.Value(0)).current;
  const teamCard1Scale = useRef(new Animated.Value(0)).current;
  const teamCard2Scale = useRef(new Animated.Value(0)).current;
  const teamCard3Scale = useRef(new Animated.Value(0)).current;

  // Floating animation
  const floatingAnimation = useRef(new Animated.Value(0)).current;

  const [statsAnimationTriggered, setStatsAnimationTriggered] = useState(false);
  const [teamAnimationTriggered, setTeamAnimationTriggered] = useState(false);

  useEffect(() => {
    // Initial header animation
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(headerTranslateY, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 120,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo rotation animation
    Animated.loop(
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnimation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Counters animation
    const animateMeals = () => {
      const targetMeals = 250;
      const increment = targetMeals / 60;
      const timer = setInterval(() => {
        mealsCount.current += increment;
        if (mealsCount.current >= targetMeals) {
          mealsCount.current = targetMeals;
          clearInterval(timer);
        }
        setDisplayMeals(Math.floor(mealsCount.current));
      }, 30);
    };

    const animateUsers = () => {
      const targetUsers = 80;
      const increment = targetUsers / 60;
      const timer = setInterval(() => {
        usersCount.current += increment;
        if (usersCount.current >= targetUsers) {
          usersCount.current = targetUsers;
          clearInterval(timer);
        }
        setDisplayUsers(Math.floor(usersCount.current));
      }, 30);
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
    if (scrollY > screenHeight * 0.4 && !statsAnimationTriggered) {
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
    if (scrollY > screenHeight * 0.7 && !teamAnimationTriggered) {
      setTeamAnimationTriggered(true);

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

  const logoRotate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const floatingTranslateY = floatingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#667eea", "#764ba2", "#667eea"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <BlurView intensity={20} style={styles.backButtonBlur}>
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
          </BlurView>
        </Pressable>

        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerOpacity,
              transform: [
                { translateY: headerTranslateY },
                { translateY: floatingTranslateY },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScale }, { rotate: logoRotate }],
              },
            ]}
          >
            <LinearGradient
              colors={["#ffd700", "#ffed4e", "#ffd700"]}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.logo}
              />
            </LinearGradient>
          </Animated.View>

          <ThemedText style={styles.titleText}>Our Journey</ThemedText>
          <ThemedText style={styles.subtitleText}>
            Connecting hearts through food
          </ThemedText>
        </Animated.View>

        <View style={styles.section}>
          <LinearGradient
            colors={["rgba(255, 215, 0, 0.1)", "rgba(102, 126, 234, 0.1)"]}
            style={styles.missionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ThemedText style={styles.sectionTitle}>Our Mission</ThemedText>
            <ThemedText style={styles.missionText}>
              FoodShare was born from a simple yet powerful idea: to connect
              those with surplus food to those in need. We believe that no food
              should go to waste while people go hungry.
            </ThemedText>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <LinearGradient
            colors={["rgba(102, 126, 234, 0.1)", "rgba(255, 215, 0, 0.1)"]}
            style={styles.storyCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ThemedText style={styles.sectionTitle}>How It Started</ThemedText>
            <ThemedText style={styles.paragraph}>
              Founded in 2025, our journey began when we noticed the growing
              disparity between food waste and food insecurity in our
              communities. What started as a small local initiative has grown
              into a platform connecting thousands of donors and recipients.
            </ThemedText>
          </LinearGradient>
        </View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: statsOpacity,
              transform: [{ scale: statsScale }],
            },
          ]}
        >
          <ThemedText style={styles.sectionTitle}>Our Impact</ThemedText>
          <View style={styles.statsContainer}>
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.statBox}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.statNumber}>{displayMeals}+</ThemedText>
              <ThemedText style={styles.statLabel}>Meals Shared</ThemedText>
              <View style={styles.statIcon}>🍽️</View>
            </LinearGradient>

            <LinearGradient
              colors={["#ffd700", "#ffed4e"]}
              style={styles.statBox}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.darkStatNumber}>
                {displayUsers}+
              </ThemedText>
              <ThemedText style={styles.darkStatLabel}>Active Users</ThemedText>
              <View style={styles.statIcon}>👥</View>
            </LinearGradient>
          </View>
        </Animated.View>

        <View style={styles.section}>
          <LinearGradient
            colors={["rgba(255, 215, 0, 0.15)", "rgba(102, 126, 234, 0.15)"]}
            style={styles.joinCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ThemedText style={styles.sectionTitle}>
              Join Our Mission
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              Whether you&apos;re a restaurant, grocery store, or individual
              with surplus food, or someone in need of food assistance, you can
              make a difference. Join us in our mission to reduce food waste and
              fight hunger in our communities.
            </ThemedText>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Meet Our Team</ThemedText>

          <View style={styles.leadershipRow}>
            <Animated.View
              style={[
                styles.leaderCard,
                { transform: [{ scale: leaderCard1Scale }] },
              ]}
            >
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={styles.leaderCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
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
                <View style={styles.leaderBadge}>
                  <ThemedText style={styles.badgeText}>Lead</ThemedText>
                </View>
              </LinearGradient>
            </Animated.View>

            <Animated.View
              style={[
                styles.leaderCard,
                { transform: [{ scale: leaderCard2Scale }] },
              ]}
            >
              <LinearGradient
                colors={["#ffd700", "#ffed4e"]}
                style={styles.leaderCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.leaderImageContainer}>
                  <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={styles.leaderImage}
                  />
                </View>
                <ThemedText style={styles.darkLeaderName}>
                  Soumili Dey
                </ThemedText>
                <ThemedText style={styles.darkLeaderRole}>
                  Backend Developer
                </ThemedText>
                <View style={styles.alternateBadge}>
                  <ThemedText style={styles.badgeText}>Lead</ThemedText>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>

          <View style={styles.teamRow}>
            {[
              {
                name: "Alex Johnson",
                role: "Operations Lead",
                animation: teamCard1Scale,
              },
              {
                name: "Sarah Lee",
                role: "Community Manager",
                animation: teamCard2Scale,
              },
              {
                name: "Mike Chen",
                role: "Tech Lead",
                animation: teamCard3Scale,
              },
            ].map((member, index) => (
              <Animated.View
                key={member.name}
                style={[
                  styles.teamCard,
                  { transform: [{ scale: member.animation }] },
                ]}
              >
                <LinearGradient
                  colors={
                    index % 2 === 0
                      ? ["rgba(102, 126, 234, 0.2)", "rgba(255, 215, 0, 0.2)"]
                      : ["rgba(255, 215, 0, 0.2)", "rgba(102, 126, 234, 0.2)"]
                  }
                  style={styles.teamCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.teamImageContainer}>
                    <Image
                      source={require("@/assets/images/react-logo.png")}
                      style={styles.teamImage}
                    />
                  </View>
                  <ThemedText style={styles.teamName}>{member.name}</ThemedText>
                  <ThemedText style={styles.teamRole}>{member.role}</ThemedText>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: screenHeight * 1.5,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
    zIndex: 100,
  },
  backButtonBlur: {
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
  },
  backButtonText: {
    color: "white",
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    padding: 40,
    marginTop: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
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
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontStyle: "italic",
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  missionCard: {
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  storyCard: {
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  joinCard: {
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  missionText: {
    lineHeight: 24,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  paragraph: {
    lineHeight: 24,
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 15,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    padding: 25,
    borderRadius: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textAlign: "center",
  },
  statIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    fontSize: 24,
  },
  leadershipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    gap: 15,
  },
  leaderCard: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  leaderCardGradient: {
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  leaderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  leaderRole: {
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
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  teamCard: {
    flex: 1,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  teamCardGradient: {
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    minHeight: 140,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  teamImageContainer: {
    marginBottom: 10,
    borderRadius: 40,
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  teamImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 3,
    textAlign: "center",
  },
  teamRole: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  darkStatNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  darkStatLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  darkLeaderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  darkLeaderRole: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  alternateBadge: {
    backgroundColor: "#667eea",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bottomSpacer: {
    height: 100,
  },
});
