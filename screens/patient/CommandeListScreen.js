import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';

export const CommandeListScreen = ({ navigation }) => {
  const { commandes, loadCommandes } = useCommandeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchCommandes = async () => {
      await loadCommandes();
    };
    fetchCommandes();
  }, [loadCommandes]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'done': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatStatus = (status) => {
    const statusMap = {
      'pending': 'En attente',
      'done': 'Terminée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter commandes for the current patient
  const patientCommandes = commandes.filter(commande => 
    `p${user.id}` === commande.patientId
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Commandes</Text>
        <Text style={styles.subtitle}>
          Patient ID: p{user.id}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{patientCommandes.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>
            {patientCommandes.filter(c => c.status === 'done').length}
          </Text>
          <Text style={styles.statLabel}>Terminées</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#F59E0B' }]}>
            {patientCommandes.filter(c => c.status === 'pending').length}
          </Text>
          <Text style={styles.statLabel}>En attente</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {patientCommandes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Aucune commande</Text>
            <Text style={styles.emptyText}>
              Vous n'avez pas encore passé de commande
            </Text>
          </View>
        ) : (
          patientCommandes.map((commande) => (
            <TouchableOpacity
              key={commande.id}
              style={styles.commandeCard}
              onPress={() => navigation.navigate("CommandeDetail", { item: commande })}
              activeOpacity={0.9}
            >
              <View style={styles.cardHeader}>
                <View style={styles.idContainer}>
                  <Ionicons name="receipt" size={16} color="#3B82F6" />
                  <Text style={styles.commandeId}>Commande #{commande.id}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(commande.status) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(commande.status) }
                  ]}>
                    {formatStatus(commande.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Ordonnance</Text>
                    <Text style={styles.infoValue}>#{commande.ordonnanceId}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Date</Text>
                    <Text style={styles.infoValue}>{formatDate(commande.dateCreation)}</Text>
                  </View>
                </View>
                
                {commande.lieuLivraison && (
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color="#64748B" />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {commande.lieuLivraison}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.viewDetailsText}>
                  Appuyer pour voir les détails
                  <Ionicons name="chevron-forward" size={14} color="#3B82F6" />
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
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
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commandeId: {
    fontSize: 16,
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
  cardBody: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
    flex: 1,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  viewDetailsText: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CommandeListScreen;