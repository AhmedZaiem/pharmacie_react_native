import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'done': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste des Commandes</Text>
        <Text style={styles.subtitle}>Bonjour, Pharmacien #{user.id}</Text>
      </View>

      <TouchableOpacity 
        style={styles.medicamentButton}
        onPress={() => navigation.navigate("Medicaments")}
      >
        <Text style={styles.medicamentButtonText}>📦 Voir Médicaments</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {commandes.filter(commande => 
          String(user.id) === String(commande.pharmacienID)
        ).map((commande) => (
          <TouchableOpacity
            key={commande.id}
            style={styles.commandeCard}
            onPress={() => navigation.navigate("CommandeDetail", { item: commande })}
            activeOpacity={0.9}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.commandeId}>Commande #{commande.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(commande.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(commande.status) }]}>
                  {formatStatus(commande.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.cardInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ordonnance:</Text>
                <Text style={styles.infoValue}>#{commande.ordonnanceId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date:</Text>
                <Text style={styles.infoValue}>
                  {new Date(commande.dateCreation).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <Text style={styles.viewDetailsText}>Appuyer pour voir les détails →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>🚪 Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  medicamentButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  medicamentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  commandeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  commandeId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  viewDetailsText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});