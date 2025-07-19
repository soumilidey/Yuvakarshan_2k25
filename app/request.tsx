import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// First, add an interface for the donation item type
interface DonationItem {
  id: string;
  foodName: string;
  quantity: string;
  location: string;
  expiryDate: string;
  donorName: string;
}

// Mock data for available donations
const MOCK_DONATIONS: DonationItem[] = [
  {
    id: "1",
    foodName: "Fresh Vegetables",
    quantity: "5 kg",
    location: "Downtown Area",
    expiryDate: "25/07/2025",
    donorName: "John Doe",
  },
];

export default function RequestScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const ListHeader = () => (
    <>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Available Donations</ThemedText>
        <ThemedText>Find food donations near you</ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <ThemedView style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for food items..."
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
          />
        </ThemedView>
      </ThemedView>
    </>
  );

  const handleRequest = (itemId: string) => {
    // Add your request logic here
    console.log("Requested item:", itemId);
    router.push("/");
  };

  const renderDonationItem = ({ item }: { item: DonationItem }) => (
    <ThemedView style={styles.donationCard}>
      <ThemedView style={styles.donationHeader}>
        <ThemedText type="subtitle">{item.foodName}</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.quantity}>
          {item.quantity}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.donationDetails}>
        <ThemedText>📍 {item.location}</ThemedText>
        <ThemedText>⏳ Expires: {item.expiryDate}</ThemedText>
        <ThemedText>👤 Donor: {item.donorName}</ThemedText>
      </ThemedView>

      <Pressable
        style={styles.requestButton}
        onPress={() => handleRequest(item.id)}
      >
        <ThemedText style={styles.buttonText}>Request Food</ThemedText>
      </Pressable>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={MOCK_DONATIONS}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
      />
    </ThemedView>
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
  searchContainer: {
    padding: 20,
    gap: 15,
  },
  inputGroup: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  donationCard: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#F8F8F8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  quantity: {
    color: "#666",
  },
  donationDetails: {
    gap: 5,
    marginBottom: 15,
  },
  requestButton: {
    backgroundColor: "#A1CEDC",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {
    padding: 20,
    gap: 15,
  },
});
