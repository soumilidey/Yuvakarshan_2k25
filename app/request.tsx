import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import axios from "axios";

// Interface for the donation item type
interface DonationItem {
  id: string;
  foodName: string;
  quantity: string;
  location: string;
  expiryDate: string;
  donorName: string;
  description?: string;
}

// Enhanced mock data for available donations
const MOCK_DONATIONS: DonationItem[] = [
  {
    id: "1",
    foodName: "Fresh Vegetables",
    quantity: "5 kg",
    location: "Downtown Area",
    expiryDate: "25/07/2025",
    donorName: "John Doe",
    description: "Mixed seasonal vegetables - tomatoes, onions, carrots",
  },
  {
    id: "2",
    foodName: "Homemade Biryani",
    quantity: "8 portions",
    location: "Airoli West",
    expiryDate: "21/07/2025",
    donorName: "Priya Sharma",
    description: "Delicious chicken biryani with raita and pickle",
  },
  {
    id: "3",
    foodName: "Fresh Fruits",
    quantity: "3 kg",
    location: "Sector 19",
    expiryDate: "23/07/2025",
    donorName: "Raj Patel",
    description: "Apples, bananas, and oranges - perfectly ripe",
  },
];

export default function RequestScreen() {
  const handleRequest = async (donationId: string) => {
    try {
      const selectedDonation = MOCK_DONATIONS.find((d) => d.id === donationId);

      if (!selectedDonation) {
        alert("Donation not found");
        return;
      }

      const response = await axios.post(
        "http://192.168.0.6:5000/api/requests",
        {
          name: "",
          phone: "",
          address: "123 Street, City",
          itemNeeded: selectedDonation.foodName,
          quantity: selectedDonation.quantity,
          donorName: selectedDonation.donorName,
          location: selectedDonation.location,
        }
      );

      if (response.status === 201) {
        alert("Food request submitted successfully!");
      } else {
        alert("Request failed. Try again.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to submit request.");
    }
  };

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  // Animation refs
  const headerSlide = useRef(new Animated.Value(-50)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const searchSlide = useRef(new Animated.Value(100)).current;
  const listSlide = useRef(new Animated.Value(150)).current;

  useEffect(() => {
    // Staggered animation sequence
    const animations = Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(searchSlide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(listSlide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    animations.start();
  }, [headerSlide, headerOpacity, searchSlide, listSlide]);

  const submitRequest = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.6:5000/api/requests",
        {
          name: "John Doe",
          phone: "9876543210",
          address: "123 Street, City",
          itemNeeded: "Rice",
          quantity: 5,
        }
      );

      if (response.status === 201) {
        alert("Request submitted successfully");
      }
    } catch (error) {
      console.error("Request submission failed:", error);
      alert("Failed to submit request");
    }
  };

  const ListHeader = () => (
    <>
      {/* Header Section - White background */}
      <Animated.View
        style={[
          styles.headerSection,
          {
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          },
        ]}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </Pressable>

        <ThemedView style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>Find Food</ThemedText>
          <ThemedText style={styles.headerEmoji}>🔍</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Discover delicious meals shared by your generous neighbors
          </ThemedText>
        </ThemedView>
      </Animated.View>

      {/* Search Section */}
      <Animated.View
        style={[
          styles.searchSection,
          {
            transform: [{ translateY: searchSlide }],
          },
        ]}
      >
        <ThemedView style={styles.searchCard}>
          <ThemedText style={styles.searchTitle}>
            🎯 Find Your Perfect Meal
          </ThemedText>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>
              What are you craving?
            </ThemedText>
            <TextInput
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="e.g., biryani, vegetables, fruits..."
              placeholderTextColor="#9ca3af"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Your location</ThemedText>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g., Airoli, Sector 19..."
              placeholderTextColor="#9ca3af"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </ThemedView>

          <ThemedView style={styles.searchStats}>
            <ThemedText style={styles.statsText}>
              🔥 {MOCK_DONATIONS.length} fresh food available nearby!
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Animated.View>

      {/* List Header */}
      <Animated.View
        style={[
          styles.listHeaderSection,
          {
            transform: [{ translateY: listSlide }],
          },
        ]}
      >
        <ThemedText style={styles.availableTitle}>✨ Available Now</ThemedText>
        <ThemedText style={styles.availableSubtitle}>
          Fresh donations from your community
        </ThemedText>
      </Animated.View>
    </>
  );

  const renderDonationItem = ({
    item,
    index,
  }: {
    item: DonationItem;
    index: number;
  }) => (
    <Animated.View
      style={[
        styles.donationCard,
        {
          transform: [{ translateY: listSlide }],
          opacity: listSlide.interpolate({
            inputRange: [0, 150],
            outputRange: [1, 0],
          }),
        },
      ]}
    >
      <ThemedView style={styles.cardHeader}>
        <ThemedView style={styles.foodInfo}>
          <ThemedText style={styles.foodName}>{item.foodName}</ThemedText>
          <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statusBadge}>
          <ThemedText style={styles.statusText}>Available</ThemedText>
        </ThemedView>
      </ThemedView>

      {item.description && (
        <ThemedText style={styles.description}>{item.description}</ThemedText>
      )}

      <ThemedView style={styles.donationDetails}>
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailIcon}>📍</ThemedText>
          <ThemedText style={styles.detailText}>{item.location}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailIcon}>⏳</ThemedText>
          <ThemedText style={styles.detailText}>
            Best before: {item.expiryDate}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailIcon}>👤</ThemedText>
          <ThemedText style={styles.detailText}>
            Shared by {item.donorName}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <Pressable
        style={styles.requestButton}
        onPress={() => handleRequest(item.id)}
      >
        <ThemedText style={styles.buttonText}>Get it Now</ThemedText>
        <ThemedText style={styles.buttonSubtext}>Connect with donor</ThemedText>
      </Pressable>
    </Animated.View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={MOCK_DONATIONS}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },

  // Header Section - White background
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  backText: {
    color: "#f59e0b",
    fontWeight: "600",
    fontSize: 16,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f59e0b",
    textAlign: "center",
    marginBottom: 8,
  },
  headerEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  // Search Section
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#fef3c7",
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f59e0b",
    marginBottom: 20,
    textAlign: "center",
  },

  // Input Styles
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#374151",
  },

  // Search Stats
  searchStats: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  statsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400e",
  },

  // List Header
  listHeaderSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  availableTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6b46c1",
    marginBottom: 4,
  },
  availableSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },

  // List Content
  listContent: {
    paddingBottom: 40,
  },

  // Donation Cards
  donationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#e0d4f7",
  },

  // Card Header
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b46c1",
  },
  statusBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#16a34a",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16a34a",
  },

  // Description
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: "italic",
  },

  // Details
  donationDetails: {
    gap: 8,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    color: "#4b5563",
    flex: 1,
  },

  // Request Button
  requestButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#f59e0b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "500",
  },
});
