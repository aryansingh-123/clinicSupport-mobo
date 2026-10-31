import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const PROFILE = {
  name: "Aryan Sharma",
  age: 28,
  bloodGroup: "O+",
  phone: "+91 98765 43210",
  email: "aryan@example.com",
  address: "12 Park Street, Kolkata",
  conditions: ["Asthma", "Vitamin D deficiency"],
  allergies: ["Penicillin"],
  lastCheckup: "2026-09-14",
};

export default function Profile() {
  const { memberId } = useLocalSearchParams<{ memberId?: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi</Text>
        <Text style={styles.name}>{PROFILE.name}</Text>
        {memberId ? <Text style={styles.muted}>Member ID: {memberId}</Text> : null}
      </View>

      <Section title="Personal details">
        <Row label="Age" value={String(PROFILE.age)} />
        <Row label="Blood group" value={PROFILE.bloodGroup} />
        <Row label="Phone" value={PROFILE.phone} />
        <Row label="Email" value={PROFILE.email} />
        <Row label="Address" value={PROFILE.address} />
      </Section>

      <Section title="Medical">
        <Row label="Conditions" value={PROFILE.conditions.join(", ")} />
        <Row label="Allergies" value={PROFILE.allergies.join(", ")} />
        <Row label="Last checkup" value={PROFILE.lastCheckup} />
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  header: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 24,
  },
  greeting: {
    fontSize: 16,
    color: "#666",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  muted: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#f5f5f5",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  label: {
    color: "#666",
  },
  value: {
    flexShrink: 1,
    textAlign: "right",
    fontWeight: "500",
  },
});
