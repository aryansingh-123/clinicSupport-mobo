import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  AuthButton,
  AuthInput,
  AuthScreen,
  authStyles,
  BLUE,
} from "../Components/auth-screen";

export default function Index() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isValid = memberId.trim().length > 0 && password.length > 0;
  const handleLogin = () => {
    if (!isValid) {
      setError("Please enter your Member ID and password");
      return;
    }
    // No backend yet: any non-empty credentials are accepted
    router.replace({ pathname: "/profile", params: { memberId: memberId.trim() } });
  };

  return (
    <AuthScreen>
      <Text style={authStyles.title}>Welcome</Text>
      <Text style={authStyles.subtitle}>Login with your Member ID and password</Text>

      <AuthInput
        value={memberId}
        onChangeText={(text) => {
          setMemberId(text);
          if (error) setError("");
        }}
        placeholder="Member ID"
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="next"
        hasError={!!error && !memberId.trim()}
        accessibilityLabel="Member ID"
      />

      <AuthInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (error) setError("");
        }}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
        hasError={!!error && !password}
        accessibilityLabel="Password"
      />

      {error ? <Text style={authStyles.error}>{error}</Text> : null}

      <View style={{ alignItems: "flex-end" }}>
        <Pressable onPress={() => router.push("/forgot-password")} accessibilityRole="link">
          <Text style={authStyles.link}>Forgot password?</Text>
        </Pressable>
      </View>

      <AuthButton label="Login" onPress={handleLogin} disabled={!isValid} />

      <View style={authStyles.linkRow}>
        <Text style={authStyles.muted}>New here?</Text>
        <Pressable onPress={() => router.push("/register")} accessibilityRole="link">
          <Text style={[authStyles.link, { color: BLUE }]}>Register</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}
