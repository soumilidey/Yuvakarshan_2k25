import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState(""); // New state for city
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // Add your signup logic here
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Signup attempted:", { email, username, city, password });
    router.push("/");
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ThemedText>← Back</ThemedText>
      </Pressable>

      <ThemedView style={styles.signupContainer}>
        <ThemedText type="title" style={styles.title}>
          Create Account
        </ThemedText>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Username</ThemedText>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Choose a username"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>City</ThemedText>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Password</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Confirm Password</ThemedText>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />
        </ThemedView>

        <Pressable style={styles.signupButton} onPress={handleSignup}>
          <ThemedText style={styles.buttonText}>Create Account</ThemedText>
        </Pressable>

        <ThemedView style={styles.loginContainer}>
          <ThemedText>Already have an account? </ThemedText>
          <Pressable onPress={() => router.push("/login")}>
            <ThemedText style={styles.loginLink}>Login here</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
    padding: 6,
    zIndex: 1,
  },
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    gap: 12,
    marginTop: -40, // Added negative margin to move content up
  },
  title: {
    textAlign: "center",
    marginBottom: 12, // Reduced margin below title
    fontSize: 24,
  },
  inputGroup: {
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    height: 38, // Slightly reduced height
  },
  signupButton: {
    backgroundColor: "#A1CEDC",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12, // Slightly reduced margin
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20, // Increased margin for more space at bottom
    marginBottom: 20, // Added bottom margin
  },
  buttonText: {
    fontSize: 14, // Reduced font size
    fontWeight: "bold",
  },
  loginLink: {
    color: "#A1CEDC",
    fontWeight: "bold",
    fontSize: 14, // Reduced font size
  },
});
