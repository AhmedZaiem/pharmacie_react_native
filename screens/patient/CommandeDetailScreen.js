import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CommandeDetailScreen = ({ route }) => {
  const { item } = route.params;

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "#F59E0B",
          icon: "⏳",
          label: "En attente",
          bgColor: "#FEF3C7",
        };
      case "done":
        return {
          color: "#10B981",
          icon: "✅",
          label: "Terminée",
          bgColor: "#D1FAE5",
        };
      case "preparing":
        return {
          color: "#d137b5ff",
          icon: "⏳",
          label: "préparation",
          bgColor: "#FEE2E2",
        };
      case "cancelled":
        return {
          color: "#EF4444",
          icon: "❌",
          label: "Annulée",
          bgColor: "#FEE2E2",
        };
      default:
        return {
          color: "#6B7280",
          icon: "📋",
          label: status,
          bgColor: "#F3F4F6",
        };
    }
  };

  const statusInfo = getStatusInfo(item.status);
  const formattedDate = new Date(item.dateCreation).toLocaleDateString(
    "fr-FR",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const DetailRow = ({ label, value, icon, isStatus = false }) => (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.rowIcon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View
        style={[
          styles.valueContainer,
          isStatus && { backgroundColor: statusInfo.bgColor },
        ]}
      >
        <Text
          style={[
            styles.value,
            isStatus && { color: statusInfo.color, fontWeight: "700" },
          ]}
        >
          {isStatus ? `${statusInfo.icon} ${statusInfo.label}` : value}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Détails de la Commande</Text>
          <Text style={styles.headerSubtitle}>ID: #{item.id}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informations Générales</Text>

          <DetailRow
            label="ID de l'Ordonnance"
            value={`#${item.ordonnanceId}`}
            icon="📋"
          />

          <DetailRow
            label="ID du Patient"
            value={`#${item.patientId}`}
            icon="👤"
          />

          <DetailRow
            label="ID du Pharmacien"
            value={`#${item.pharmacienID}`}
            icon="💊"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Livraison</Text>

          <DetailRow
            label="Lieu de Livraison"
            value={item.lieuLivraison || "Non spécifié"}
            icon="📍"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Statut et Date</Text>

          <DetailRow
            label="Statut"
            value={item.status}
            icon="📊"
            isStatus={true}
          />

          <View style={styles.dateRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.rowIcon}>📅</Text>
              <Text style={styles.label}>Date de Création</Text>
            </View>
            <Text style={styles.dateValue}>{formattedDate}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommandeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  screen: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  valueContainer: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "flex-end",
  },
  value: {
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "600",
    textAlign: "right",
  },
  dateRow: {
    paddingVertical: 12,
  },
  dateValue: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
    marginTop: 6,
    textAlign: "right",
    lineHeight: 20,
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  noteText: {
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "500",
    flex: 1,
  },
});
