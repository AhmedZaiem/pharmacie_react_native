import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const CommandeDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.header}>Commande Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Commande ID</Text>
          <Text style={styles.value}>{item.id}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Ordonnance ID</Text>
          <Text style={styles.value}>{item.ordonnanceId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Patient ID</Text>
          <Text style={styles.value}>{item.patientId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Pharmacien ID</Text>
          <Text style={styles.value}>{item.pharmacienID}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Lieu de Livraison</Text>
          <Text style={styles.value}>{item.lieuLivraison || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, item.status === 'pending' && styles.pending, item.status === 'done' && styles.done]}>
            {item.status}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date Creation</Text>
          <Text style={styles.value}>{new Date(item.dateCreation).toLocaleString()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CommandeDetailScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    backgroundColor: '#f5f7fb',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eef2f6',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'column',
    marginBottom: 12,
    paddingVertical: 6,
    borderBottomColor: '#f0f3f7',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
  pending: {
    color: '#b45309', 
    fontWeight: '700',
  },
  done: {
    color: '#065f46',
    fontWeight: '700',
  },
});
