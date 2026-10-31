import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  AuthButton,
  AuthInput,
  AuthScreen,
  authStyles,
} from "../Components/auth-screen";

export default function ForgotPassword() {
  const [memberId, setMemberId] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const handleSend = () => {
    if (!memberId.trim()) {
      setError("Please enter your Member ID");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <AuthScreen>
      <Text style={authStyles.title}>Forgot password</Text>
      <Text style={authStyles.subtitle}>
        Enter your Member ID and we will send a reset link to your registered mobile number
      </Text>

      {sent ? (
        <Text style={authStyles.success}>
          A reset link has been sent for Member ID {memberId.trim().toUpperCase()}.
        </Text>
      ) : (
        <>
          <AuthInput
            value={memberId}
            onChangeText={(text) => {
              setMemberId(text);
              if (error) setError("");
            }}
            placeholder="Member ID"
            autoCapitalize="characters"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSend}
            hasError={!!error}
            accessibilityLabel="Member ID"
          />
          {error ? <Text style={authStyles.error}>{error}</Text> : null}
          <AuthButton label="Send reset link" onPress={handleSend} />
        </>
      )}

      <View style={authStyles.linkRow}>
        <Pressable onPress={() => router.back()} accessibilityRole="link">
          <Text style={authStyles.link}>Back to login</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}
