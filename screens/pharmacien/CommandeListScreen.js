import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';
import { useAuthStore } from '../../store/authStore';

export const CommandeListScreen = ({ navigation }) => {
  const { commandes, loadCommandes } = useCommandeStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const fetchCommandes = async () => {
      await loadCommandes();
    };
    fetchCommandes();
  }, [loadCommandes]);

  const handleLogout = () => {
    logout();
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Liste des Commandes</Text>
        <Button title="Voir Médicaments" onPress={() => navigation.navigate("Medicaments")} />
        {commandes.map((commande) => (
          String(user.id) === String(commande.pharmacienID) && (
            <View key={commande.id} style={styles.commandeCard}>
              <Text style={styles.commandeId}>Commande ID: {commande.id}</Text>
              <Text>Ordonnance ID: {commande.ordonnanceId}</Text>
              <Text>Status: {commande.status}</Text>
              <Button
                title="Voir les détails"
                onPress={() =>
                  navigation.navigate("CommandeDetail", { item: commande })
                }
              />
            </View>
          )
        ))}
      </ScrollView>
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // adds shadow on Android
  },
  commandeId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16, // space above logout button
  },
  logoutButton: {
    marginVertical: 8,
  },
});
