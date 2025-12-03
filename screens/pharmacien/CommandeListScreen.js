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

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending': 
        return { 
          color: '#F59E0B', 
          bgColor: '#FEF3C7',
          label: 'EN ATTENTE',
          frenchLabel: 'En attente'
        };
      case 'done': 
        return { 
          color: '#10B981', 
          bgColor: '#D1FAE5',
          label: 'TERMINÉE',
          frenchLabel: 'Terminée'
        };
      case 'cancelled': 
        return { 
          color: '#EF4444', 
          bgColor: '#FEE2E2',
          label: 'ANNULÉE',
          frenchLabel: 'Annulée'
        };
      case 'preparing':
        return { 
          color: '#3B82F6', 
          bgColor: '#DBEAFE',
          label: 'EN PRÉPARATION',
          frenchLabel: 'En préparation'
        };
      default: 
        return { 
          color: '#6B7280', 
          bgColor: '#F3F4F6',
          label: status.toUpperCase(),
          frenchLabel: status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
  };

  const getStatusColor = (status) => {
    return getStatusInfo(status).color;
  };

  const formatStatus = (status) => {
    return getStatusInfo(status).frenchLabel;
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
        ).map((commande) => {
          const statusInfo = getStatusInfo(commande.status);
          
          return (
            <TouchableOpacity
              key={commande.id}
              style={styles.commandeCard}
              onPress={() => navigation.navigate("CommandeDetail", { item: commande })}
              activeOpacity={0.9}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.commandeId}>Commande #{commande.id}</Text>
                  <Text style={styles.commandeSubtitle}>Ordonnance #{commande.ordonnanceId}</Text>
                </View>
                
              </View>
              
              <View style={styles.cardInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Patient:</Text>
                  <Text style={styles.infoValue}>#{commande.patientId}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date création:</Text>
                  <Text style={styles.infoValue}>
                    {new Date(commande.dateCreation).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Livraison:</Text>
                  <Text style={styles.infoValue}>
                    {commande.lieuLivraison || 'À préciser'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <View style={styles.footerContent}>
                  <View style={styles.statusNote}>
                    <Text style={[styles.statusNoteText, { color: statusInfo.color }]}>
                      {statusInfo.frenchLabel}
                    </Text>
                  </View>
                  <Text style={styles.viewDetailsText}>Voir détails →</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  commandeId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  commandeSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardInfo: {
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 8,
  },
  cardFooter: {
    paddingTop: 8,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusNote: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusNoteText: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  viewDetailsText: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
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