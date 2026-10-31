import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  AuthButton,
  AuthInput,
  AuthScreen,
  authStyles,
} from "../Components/auth-screen";

const MOBILE_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 6;

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isValid =
    name.trim().length > 0 &&
    mobile.length === MOBILE_LENGTH &&
    password.length >= MIN_PASSWORD_LENGTH &&
    password === confirmPassword;

  const clearError = () => {
    if (error) setError("");
  };

  const handleRegister = () => {
    if (!name.trim()) {
      setError("Please enter your full name");
    } else if (mobile.length !== MOBILE_LENGTH) {
      setError(`Please enter a valid ${MOBILE_LENGTH}-digit mobile number`);
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // No backend yet: go back to login once the account is "created"
      router.replace("/");
      return;
    }
  };

  return (
    <AuthScreen>
      <Text style={authStyles.title}>Create account</Text>
      <Text style={authStyles.subtitle}>Register to get your Member ID</Text>

      <AuthInput
        value={name}
        onChangeText={(text) => {
          setName(text);
          clearError();
        }}
        placeholder="Full name"
        autoCapitalize="words"
        returnKeyType="next"
        accessibilityLabel="Full name"
      />

      <AuthInput
        value={mobile}
        onChangeText={(text) => {
          setMobile(text.replace(/\D/g, "").slice(0, MOBILE_LENGTH));
          clearError();
        }}
        placeholder="10-digit mobile number"
        keyboardType="number-pad"
        maxLength={MOBILE_LENGTH}
        returnKeyType="next"
        accessibilityLabel="Mobile number"
      />

      <AuthInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          clearError();
        }}
        placeholder={`Password (min ${MIN_PASSWORD_LENGTH} characters)`}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        accessibilityLabel="Password"
      />

      <AuthInput
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          clearError();
        }}
        placeholder="Confirm password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={handleRegister}
        accessibilityLabel="Confirm password"
      />

      {error ? <Text style={authStyles.error}>{error}</Text> : null}

      <AuthButton label="Register" onPress={handleRegister} disabled={!isValid} />

      <View style={authStyles.linkRow}>
        <Text style={authStyles.muted}>Already have an account?</Text>
        <Pressable onPress={() => router.back()} accessibilityRole="link">
          <Text style={authStyles.link}>Login</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}
