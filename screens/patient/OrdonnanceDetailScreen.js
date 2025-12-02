import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import { Ionicons } from '@expo/vector-icons';

export const OrdonnanceDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { medicaments, loadMedicaments } = useMedicamentStore();

  useEffect(() => {
    loadMedicaments();
  }, [loadMedicaments]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const MedicamentCard = ({ med, medicamentDetails, index }) => (
    <View key={index} style={styles.medicamentCard}>
      <View style={styles.medHeader}>
        <View style={styles.medIcon}>
          <Ionicons name="medical" size={20} color="#3B82F6" />
        </View>
        <View style={styles.medInfo}>
          <Text style={styles.medName}>
            {medicamentDetails ? medicamentDetails.name : `Médicament ID: ${med.idMedicament}`}
          </Text>
          {medicamentDetails && (
            <Text style={styles.medType}>{medicamentDetails.forme}</Text>
          )}
        </View>
      </View>

      <View style={styles.medDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Dosage:</Text>
            <Text style={styles.detailValue}>{medicamentDetails?.dosage || 'N/A'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Durée:</Text>
            <Text style={styles.detailValue}>{med.duree} jours</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="repeat-outline" size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Qté/jour:</Text>
            <Text style={styles.detailValue}>{med.quantiteParJour}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cube-outline" size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Stock:</Text>
            <Text style={styles.detailValue}>{medicamentDetails?.qte || '0'}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={14} color="#64748B" />
            <Text style={styles.detailLabel}>Prix:</Text>
            <Text style={styles.priceValue}>{medicamentDetails?.price || '0'}€</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#3B82F6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ordonnance #{item.id}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informations Générales</Text>
          <View style={styles.divider} />
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Patient</Text>
              <Text style={styles.infoValue}>p{item.patientId}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Médecin</Text>
              <Text style={styles.infoValue}>d{item.medecinId}</Text>
            </View>
          </View>
          
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color="#64748B" />
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>
        </View>

        <View style={styles.medicamentsCard}>
          <View style={styles.medHeaderSection}>
            <Text style={styles.cardTitle}>
              <Ionicons name="medkit" size={20} color="#3B82F6" />
              {' '}Médicaments Prescrits
            </Text>
            <Text style={styles.medCount}>{item.medicaments.length} médicament(s)</Text>
          </View>
          <View style={styles.divider} />
          
          {item.medicaments.map((med, index) => {
            const medicamentDetails = medicaments.find(m => m.id == med.idMedicament);
            return (
              <MedicamentCard 
                key={index} 
                med={med} 
                medicamentDetails={medicamentDetails} 
                index={index}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("CommandeCreate", { item: item })}
          activeOpacity={0.9}
        >
          <Ionicons name="cart" size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Créer une Commande</Text>
        </TouchableOpacity>

        <View style={styles.note}>
          <Ionicons name="information-circle-outline" size={18} color="#3B82F6" />
          <Text style={styles.noteText}>
            Tous les médicaments seront inclus dans la commande
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  medicamentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  medHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medCount: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  medicamentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  medHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  medType: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  medDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
    flex: 1,
  },
  priceValue: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '700',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  noteText: {
    fontSize: 13,
    color: '#1E40AF',
    fontWeight: '500',
    flex: 1,
  },
});

export default OrdonnanceDetailScreen;