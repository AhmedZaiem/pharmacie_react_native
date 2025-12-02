import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Ionicons } from '@expo/vector-icons';

export default function MedicamentListScreen({ navigation }) {
    const { medicaments, loadMedicaments, deleteMedicament } = useMedicamentStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicaments = async () => {
            try {
                await loadMedicaments();
            } catch (error) {
                console.error('Failed to load medicaments:', error);
                Alert.alert('Erreur', 'Impossible de charger les médicaments');
            } finally {
                setLoading(false);
            }
        };
        fetchMedicaments();
    }, [loadMedicaments]);

    const handleDelete = async (id, name) => {
        Alert.alert(
            'Confirmer la suppression',
            `Êtes-vous sûr de vouloir supprimer "${name}" ?`,
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteMedicament(id);
                            Alert.alert('Succès', 'Médicament supprimé avec succès');
                        } catch (error) {
                            console.error('Failed to delete medicament:', error);
                            Alert.alert('Erreur', 'Échec de la suppression du médicament');
                        }
                    },
                },
            ]
        );
    };

    const renderMedicament = ({ item }) => (
        <TouchableOpacity
            style={styles.medicamentCard}
            onPress={() => navigation.navigate('MedicamentForm', { medicament: item })}
            activeOpacity={0.9}
        >
            <View style={styles.cardHeader}>
                <View style={styles.medicamentIcon}>
                    <Ionicons name="medical" size={20} color="#3B82F6" />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.forme}>{item.forme}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}€</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Ionicons name="speedometer-outline" size={14} color="#64748B" />
                        <Text style={styles.detailLabel}>Dosage:</Text>
                        <Text style={styles.detailValue}>{item.dosage || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="cube-outline" size={14} color="#64748B" />
                        <Text style={styles.detailLabel}>Stock:</Text>
                        <Text style={styles.detailValue}>{item.qte || '0'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('MedicamentForm', { medicament: item })}
                >
                    <Ionicons name="pencil" size={14} color="#3B82F6" />
                    <Text style={styles.editText}>Modifier</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id, item.name)}
                >
                    <Ionicons name="trash-outline" size={14} color="#EF4444" />
                    <Text style={styles.deleteText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>📋 Liste des Médicaments</Text>
                <Text style={styles.subtitle}>
                    {medicaments.length} médicament{medicaments.length !== 1 ? 's' : ''} en stock
                </Text>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('MedicamentForm')}
                activeOpacity={0.9}
            >
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Ajouter un Médicament</Text>
            </TouchableOpacity>

            <FlatList
                data={medicaments}
                keyExtractor={(item) => item.id}
                renderItem={renderMedicament}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="medical-outline" size={64} color="#CBD5E1" />
                        <Text style={styles.emptyTitle}>Aucun médicament</Text>
                        <Text style={styles.emptyText}>
                            Commencez par ajouter votre premier médicament
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyButton}
                            onPress={() => navigation.navigate('MedicamentForm')}
                        >
                            <Text style={styles.emptyButtonText}>Ajouter un médicament</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
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
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '500',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10B981',
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 20,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 8,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    medicamentCard: {
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
        alignItems: 'center',
        marginBottom: 12,
    },
    medicamentIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    nameContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 2,
    },
    forme: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    priceContainer: {
        backgroundColor: '#10B98110',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#10B98130',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#10B981',
    },
    cardBody: {
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        gap: 16,
    },
    detailItem: {
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
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        gap: 8,
    },
    editButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF6FF',
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    editText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '600',
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2',
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    deleteText: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: '600',
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
        marginBottom: 24,
        lineHeight: 20,
    },
    emptyButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    emptyButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});