import { useState, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export const NAVY = "#0B2A6F";
export const BLUE = "#0A5BD8";
export const CYAN = "#00B4F0";
export const MINT = "#12C9A0";

export function AuthScreen({ children }: { children: ReactNode }) {
  return (
    <View style={styles.background}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={require("../../assets/images/loginbg.jpg")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.78)",
          "rgba(222, 240, 255, 0.72)",
          "rgba(212, 250, 240, 0.72)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/clinic-support-logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export function AuthInput({
  hasError,
  style,
  onFocus,
  onBlur,
  ...props
}: TextInputProps & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...props}
      placeholderTextColor="#8a94a6"
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={[
        styles.input,
        focused && styles.inputFocused,
        hasError && styles.inputError,
        style,
      ]}
    />
  );
}

export function AuthButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.buttonWrap,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
      accessibilityRole="button"
    >
      <LinearGradient
        colors={[BLUE, MINT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export const authStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: NAVY,
  },
  subtitle: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 8,
  },
  error: {
    fontSize: 13,
    color: "#dc2626",
  },
  success: {
    fontSize: 14,
    color: "#047857",
    textAlign: "center",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  muted: {
    fontSize: 14,
    color: "#4b5563",
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    color: BLUE,
  },
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  logo: {
    width: 80,
    height: 60,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    padding: 24,
    gap: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(10, 91, 216, 0.12)",
    backgroundColor: "#ffffff",
    shadowColor: NAVY,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fbff",
    fontSize: 15,
    color: NAVY,
  },
  inputFocused: {
    borderColor: CYAN,
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  buttonWrap: {
    marginTop: 4,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: BLUE,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  button: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
  },
});
