import axios from "axios";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DonateScreen() {
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [foodImage, setFoodImage] = useState<string | null>(null);

  // Animation refs
  const headerSlide = useRef(new Animated.Value(-50)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const formSlide = useRef(new Animated.Value(100)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animation sequence
    const animations = Animated.stagger(200, [
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
      Animated.parallel([
        Animated.timing(formSlide, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animations.start();
  }, [headerSlide, headerOpacity, formSlide, formOpacity]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFoodImage(result.assets[0].uri);
    }
  };

  const handleDonate = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.6:5000/api/donations/submit",
        {
          foodName,
          quantity,
          description,
          expiryDate,
          foodImage,
        }
      );

      if (response.data.success) {
        alert("Donation submitted successfully!");
        setFoodName("");
        setQuantity("");
        setDescription("");
        setExpiryDate("");
        setFoodImage(null);
        router.push("/");
      } else {
        alert("Failed to submit: " + response.data.message);
      }
    } catch (error: any) {
      console.error("Donation error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
            <ThemedText style={styles.headerTitle}>Share Food</ThemedText>
            <ThemedText style={styles.headerEmoji}>🍽️</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Turn surplus into smiles - share your extra food with those in
              need
            </ThemedText>
          </ThemedView>
        </Animated.View>

        {/* Form Section */}
        <Animated.View
          style={[
            styles.formSection,
            {
              transform: [{ translateY: formSlide }],
              opacity: formOpacity,
            },
          ]}
        >
          {/* Image Upload Card */}
          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>📸 Food Photo</ThemedText>
            <ThemedText style={styles.cardSubtitle}>
              Add a photo to make your donation more appealing
            </ThemedText>
            <Pressable style={styles.imageUpload} onPress={pickImage}>
              {foodImage ? (
                <Image source={{ uri: foodImage }} style={styles.foodImage} />
              ) : (
                <ThemedView style={styles.imagePlaceholder}>
                  <ThemedText style={styles.imagePlaceholderIcon}>
                    📷
                  </ThemedText>
                  <ThemedText style={styles.imagePlaceholderText}>
                    Tap to add photo
                  </ThemedText>
                </ThemedView>
              )}
            </Pressable>
          </ThemedView>

          {/* Food Details Card */}
          <ThemedView style={styles.card}>
            <ThemedText style={styles.cardTitle}>🥘 Food Details</ThemedText>
            <ThemedText style={styles.cardSubtitle}>
              Tell us about your delicious donation
            </ThemedText>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Food Name</ThemedText>
              <TextInput
                style={styles.input}
                value={foodName}
                onChangeText={setFoodName}
                placeholder="e.g., Homemade Biryani, Fresh Vegetables"
                placeholderTextColor="#9ca3af"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Quantity</ThemedText>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="e.g., 2 kg, 5 portions, 10 servings"
                placeholderTextColor="#9ca3af"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Description</ThemedText>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your food - ingredients, preparation, any special notes..."
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>
                Best Before Date
              </ThemedText>
              <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#9ca3af"
              />
            </ThemedView>
          </ThemedView>

          {/* Impact Card */}
          <ThemedView style={styles.impactCard}>
            <ThemedText style={styles.impactTitle}>🌟 Your Impact</ThemedText>
            <ThemedText style={styles.impactText}>
              {
                "By sharing your food, you're helping reduce waste and bringing joy"
              }
              {
                "to someone's day. Every meal shared makes our community stronger!💪"
              }
            </ThemedText>
          </ThemedView>

          {/* Submit Button */}
          <Pressable style={styles.donateButton} onPress={handleDonate}>
            <ThemedText style={styles.buttonIcon}>🎉</ThemedText>
            <ThemedText style={styles.buttonText}>Share My Food</ThemedText>
            <ThemedText style={styles.buttonSubtext}>
              {"Make someone's day!"}
            </ThemedText>
          </Pressable>
        </Animated.View>

        {/* Bottom Spacer */}
        <ThemedView style={styles.bottomSpacer}>{""}</ThemedView>
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

  // Header Section - White background
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(107, 70, 193, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  backText: {
    color: "#6b46c1",
    fontWeight: "600",
    fontSize: 16,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#6b46c1",
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

  // Form Section
  formSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  // Card Styles
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#e0d4f7",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6b46c1",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },

  // Image Upload
  imageUpload: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#e0d4f7",
    borderStyle: "dashed",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafbfc",
  },
  imagePlaceholderIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
  },

  // Input Styles
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  // Impact Card
  impactCard: {
    backgroundColor: "#fef3c7",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#f59e0b",
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#92400e",
    marginBottom: 8,
    textAlign: "center",
  },
  impactText: {
    fontSize: 14,
    color: "#92400e",
    textAlign: "center",
    lineHeight: 20,
  },

  // Submit Button
  donateButton: {
    backgroundColor: "#8b5fbf",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#8b5fbf",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 20,
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "500",
  },

  bottomSpacer: {
    height: 20,
  },
});
