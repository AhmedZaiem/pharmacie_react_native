import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export const CommandeDetailScreen = ({ route }) => {
  const { item } = route.params;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'done': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status) => {
    switch (status) {
      case 'pending': return '#FEF3C7';
      case 'done': return '#D1FAE5';
      case 'cancelled': return '#FEE2E2';
      default: return '#F3F4F6';
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

  const dateInfo = formatDate(item.dateCreation);

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
                { backgroundColor: getStatusBackground(item.status) }
              ]}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: getStatusColor(item.status) }
                ]} />
                <Text style={[
                  styles.statusText, 
                  { color: getStatusColor(item.status) }
                ]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value, icon, valueStyle }) => (
  <View style={styles.row}>
    <View style={styles.labelContainer}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

export default CommandeDetailScreen;

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
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    backgroundColor: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
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
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 6,
    gap: 6,
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
});