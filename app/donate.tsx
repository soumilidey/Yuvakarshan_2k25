import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DonateScreen() {
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [foodImage, setFoodImage] = useState<string | null>(null);

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

  const handleDonate = () => {
    // Add your donation submission logic here
    console.log("Donation submitted:", {
      foodName,
      quantity,
      description,
      expiryDate,
      foodImage,
    });
    router.push("/");
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Donate Food</ThemedText>
        <ThemedText>Share your surplus food with those in need</ThemedText>
      </ThemedView>

      <ThemedView style={styles.form}>
        <Pressable style={styles.imageUpload} onPress={pickImage}>
          {foodImage ? (
            <Image source={{ uri: foodImage }} style={styles.foodImage} />
          ) : (
            <ThemedText>Add Food Image</ThemedText>
          )}
        </Pressable>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Food Name</ThemedText>
          <TextInput
            style={styles.input}
            value={foodName}
            onChangeText={setFoodName}
            placeholder="Enter food name"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Quantity</ThemedText>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity (e.g., 2 kg, 5 portions)"
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter food description"
            multiline
            numberOfLines={4}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Expiry Date</ThemedText>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="DD/MM/YYYY"
          />
        </ThemedView>

        <Pressable style={styles.donateButton} onPress={handleDonate}>
          <ThemedText style={styles.buttonText}>Submit Donation</ThemedText>
        </Pressable>
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
  form: {
    padding: 20,
    gap: 20,
  },
  imageUpload: {
    height: 200,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  donateButton: {
    backgroundColor: "#A1CEDC",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
