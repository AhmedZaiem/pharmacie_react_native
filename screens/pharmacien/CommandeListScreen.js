import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';
import { useAuthStore } from '../../store/authStore';

export const CommandeListScreen = ({ navigation }) => {
  const { commandes, loadCommandes } = useCommandeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchCommandes = async () => {
      await loadCommandes();
    };
    fetchCommandes();
  }, [loadCommandes]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Liste des Commandes</Text>
      {commandes.map((commande) => (

        String(user.id) === String(commande.pharmacienID) && (
          <View key={commande.id} style={styles.commandeCard}>
            <Text style={styles.commandeId}>Commande ID: {commande.id}</Text>
            <Text>Ordonnance ID: {commande.ordonnanceId}</Text>
            <Text>Status: {commande.status}</Text>
            <Button
              title="Voir les détails"
              onPress={() =>
                navigation.navigate("CommandeDetail", {
                  item: commande,
                })
              }
            />
          </View>
        )
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  commandeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  commandeId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});