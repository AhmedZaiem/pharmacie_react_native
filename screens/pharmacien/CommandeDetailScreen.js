import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';

export const CommandeDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;

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
          frenchLabel: status
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const handleUpdateStatus = async (id, status) => {
    await useCommandeStore.getState().updateCommandeStatus(id, status);
    navigation.goBack();
  };

  const dateInfo = formatDate(item.dateCreation);
  const statusInfo = getStatusInfo(item.status);

  const InfoRow = ({ label, value, icon, valueStyle }) => (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.container}>
          <View style={styles.headerCard}>
            <Text style={styles.headerTitle}>Détails de la Commande</Text>
            <Text style={styles.headerSubtitle}>ID: #{item.id}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Informations Générales</Text>
              <View style={styles.divider} />
            </View>

            <InfoRow 
              label="ID de l'Ordonnance" 
              value={item.ordonnanceId} 
              icon="📋"
            />
            
            <InfoRow 
              label="ID du Patient" 
              value={item.patientId} 
              icon="👤"
            />
            
            <InfoRow 
              label="ID du Pharmacien" 
              value={item.pharmacienID} 
              icon="💊"
            />
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Livraison</Text>
              <View style={styles.divider} />
            </View>

            <InfoRow 
              label="Lieu de Livraison" 
              value={item.lieuLivraison || 'Non spécifié'} 
              icon="📍"
              valueStyle={!item.lieuLivraison && styles.naValue}
            />
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Statut et Date</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.label}>Statut</Text>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: statusInfo.bgColor }
              ]}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: statusInfo.color }
                ]} />
                <Text style={[
                  styles.statusText, 
                  { color: statusInfo.color }
                ]}>
                  {statusInfo.label}
                </Text>
              </View>
              <Text style={styles.statusSubtitle}>{statusInfo.frenchLabel}</Text>
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateColumn}>
                <Text style={styles.label}>Date de Création</Text>
                <Text style={styles.dateValue}>{dateInfo.date}</Text>
              </View>
              <View style={styles.dateColumn}>
                <Text style={styles.label}>Heure</Text>
                <Text style={styles.timeValue}>{dateInfo.time}</Text>
              </View>
            </View>
          </View>
          
          {/* Status Update Buttons */}
          <View style={styles.buttonsContainer}>
            {(item.status !== 'done' && item.status !== 'preparing' && item.status !== 'cancelled') && (
              <View style={styles.buttonWrapper}>
                <Button 
                  title="Marquer comme En préparation" 
                  onPress={() => handleUpdateStatus(item.id, 'preparing')}
                  color="#3B82F6"
                />
                <Text style={styles.buttonNote}>Commande en cours de préparation</Text>
              </View>
            )}
            {item.status === 'preparing' && (
              <View style={styles.buttonWrapper}>
                <Button 
                  title="Marquer comme Terminée" 
                  onPress={() => handleUpdateStatus(item.id, 'done')}
                  color="#10B981"
                />
                <Text style={styles.buttonNote}>Commande prête à être livrée</Text>
              </View>
            )}
            {item.status === 'pending' && (
              <View style={styles.buttonWrapper}>
                <Button 
                  title="Marquer comme Annulée" 
                  onPress={() => handleUpdateStatus(item.id, 'cancelled')}
                  color="#EF4444"
                />
                <Text style={styles.buttonNote}>Annuler cette commande</Text>
              </View>
            )}
            {item.status === 'cancelled' && (
              <View style={styles.noteCard}>
                <Text style={styles.noteIcon}>⚠️</Text>
                <Text style={styles.noteText}>Cette commande a été annulée et ne peut plus être modifiée.</Text>
              </View>
            )}
            {item.status === 'done' && (
              <View style={styles.noteCard}>
                <Text style={styles.noteIcon}>✅</Text>
                <Text style={styles.noteText}>Cette commande est terminée et a été livrée avec succès.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  screen: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },
  container: {
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#667eea',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  divider: {
    height: 2,
    backgroundColor: '#667eea',
    borderRadius: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 8,
  },
  naValue: {
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  statusContainer: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 4,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontStyle: 'italic',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
  },
  dateColumn: {
    flex: 1,
  },
  dateValue: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
    marginTop: 4,
  },
  timeValue: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
    marginTop: 4,
    opacity: 0.9,
  },
  buttonsContainer: {
    marginTop: 16,
    gap: 16,
  },
  buttonWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonNote: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  noteCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  noteIcon: {
    fontSize: 20,
  },
  noteText: {
    fontSize: 14,
    color: '#0369A1',
    fontWeight: '500',
    flex: 1,
  },
});

export default CommandeDetailScreen;