import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const OrdonnanceDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ordonnance Details</Text>

        <Text style={styles.label}>Ordonnance ID:</Text>
        <Text style={styles.value}>{item.id}</Text>

        <Text style={styles.label}>Patient ID:</Text>
        <Text style={styles.value}>{item.patientId}</Text>

        <Text style={styles.label}>Doctor ID:</Text>
        <Text style={styles.value}>{item.medecinId}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>

        <Text style={styles.medicamentsTitle}>Medicaments:</Text>

        {item.medicaments.map((med, index) => (
          <View key={index} style={styles.medicamentCard}>
            <Text style={styles.medicamentItem}>• {med.idMedicament}</Text>
            <Text style={styles.medicamentDetail}>Quantity per day: {med.quantiteParJour}</Text>
            <Text style={styles.medicamentDetail}>Duration: {med.duree} days</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
    color: "#555",
  },

  value: {
    fontSize: 16,
    color: "#333",
  },

  medicamentsTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },

  medicamentCard: {
    backgroundColor: "#fafafa",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  medicamentItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  medicamentDetail: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
});

export default OrdonnanceDetailScreen;