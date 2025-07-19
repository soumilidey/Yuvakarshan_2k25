import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login attempted:", { username, password });
    router.push("/");
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ThemedText>← Back</ThemedText>
      </Pressable>

      <ThemedView style={styles.loginContainer}>
        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Email or Username</ThemedText>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter email or username"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText>Password</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </ThemedView>

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </Pressable>

        <ThemedView style={styles.registerContainer}>
          <ThemedText>{"Don't have an account? "}</ThemedText>
          <Pressable onPress={() => router.push("/signup")}>
            <ThemedText style={styles.registerLink}>Register here</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 15,
    padding: 6,
    zIndex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    gap: 12,
    marginTop: -40, // Move content up
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
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
    height: 38,
  },
  loginButton: {
    backgroundColor: "#A1CEDC",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  registerLink: {
    color: "#A1CEDC",
    fontWeight: "bold",
  },
});
