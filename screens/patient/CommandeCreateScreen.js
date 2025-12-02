import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getUsers } from '../../api/userService';
import { useCommandeStore } from '../../store/commandeStore';
import Input from '../../components/common/Input';
import { Ionicons } from '@expo/vector-icons';

export default function CommandeCreateScreen({ route, navigation }) {
    const { item } = route.params;
    const { addCommande } = useCommandeStore();

    const [loading, setLoading] = useState(false);
    const [pharmaciens, setPharmaciens] = useState([]);
    const [selectedPharmacien, setSelectedPharmacien] = useState(null);
    const [lieuLivraison, setLieuLivraison] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await getUsers();
                const filtered = users.filter(u => u.role === "pharmacien");
                setPharmaciens(filtered);
            } catch (err) {
                console.error("Failed to load users:", err);
            }
        };

        loadUsers();
    }, []);

    const getPharmacienName = (id) => {
        const pharmacien = pharmaciens.find(p => p.id === id);
        return pharmacien ? pharmacien.name : "Non sélectionné";
    };

    const handleCreateCommande = async () => {
        if (!selectedPharmacien) {
            return Alert.alert("Pharmacien requis", "Veuillez choisir un pharmacien pour la commande");
        }

        const newCommande = {
            id: Date.now().toString(),
            ordonnanceId: item.id,
            patientId: item.patientId,
            pharmacienID: selectedPharmacien,
            status: 'pending',
            dateCreation: new Date().toISOString(),
            lieuLivraison: lieuLivraison || null,
        };

        setLoading(true);

        try {
            await addCommande(newCommande);
            Alert.alert('Succès', 'Commande créée avec succès');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to create commande:', error);
            Alert.alert('Erreur', 'Échec de la création de la commande');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView 
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#3B82F6" />
                </TouchableOpacity>
                <Text style={styles.title}>📝 Nouvelle Commande</Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.cardTitle}>Informations de l'Ordonnance</Text>
                <View style={styles.divider} />
                
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>ID Ordonnance</Text>
                        <Text style={styles.infoValue}>#{item.id}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>ID Patient</Text>
                        <Text style={styles.infoValue}>#{item.patientId}</Text>
                    </View>
                </View>
                
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Date de Création</Text>
                    <Text style={styles.infoValue}>
                        {new Date().toLocaleDateString('fr-FR', { 
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                </View>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.cardTitle}>Détails de la Commande</Text>
                <View style={styles.divider} />

                <Input
                    label="📍 Lieu de Livraison"
                    placeholder="Ex: 123 Rue de Paris, 75001"
                    value={lieuLivraison}
                    onChangeText={setLieuLivraison}
                    icon="🏠"
                />

                <View style={styles.pickerSection}>
                    <Text style={styles.pickerLabel}>
                        <Ionicons name="person-outline" size={16} color="#64748B" />
                        {' '}Choisir un Pharmacien *
                    </Text>
                    
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedPharmacien}
                            onValueChange={(value) => setSelectedPharmacien(value)}
                            style={styles.picker}
                        >
                            <Picker.Item 
                                label="-- Sélectionner un pharmacien --" 
                                value={null} 
                                color="#94A3B8"
                            />

                            {pharmaciens.map((p) => (
                                <Picker.Item
                                    key={p.id}
                                    label={`${p.name} (ID: ${p.id})`}
                                    value={p.id}
                                    color="#0F172A"
                                />
                            ))}
                        </Picker>
                    </View>
                    
                    {selectedPharmacien && (
                        <View style={styles.selectedPharmacien}>
                            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                            <Text style={styles.selectedText}>
                                Pharmacien sélectionné : <Text style={styles.selectedName}>{getPharmacienName(selectedPharmacien)}</Text>
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.noteContainer}>
                    <Ionicons name="information-circle-outline" size={18} color="#3B82F6" />
                    <Text style={styles.noteText}>
                        La commande sera créée avec le statut "en attente"
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[
                        styles.createButton,
                        (!selectedPharmacien || loading) && styles.createButtonDisabled
                    ]}
                    onPress={handleCreateCommande}
                    disabled={!selectedPharmacien || loading}
                >
                    {loading ? (
                        <>
                            <Ionicons name="refresh" size={16} color="#FFFFFF" style={styles.spinningIcon} />
                            <Text style={styles.createButtonText}>Création en cours...</Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="add-circle" size={18} color="#FFFFFF" />
                            <Text style={styles.createButtonText}>Créer la Commande</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
    title: {
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
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    formCard: {
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
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 12,
    },
    divider: {
        height: 2,
        backgroundColor: '#F1F5F9',
        borderRadius: 1,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
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
        fontSize: 15,
        color: '#0F172A',
        fontWeight: '600',
    },
    pickerSection: {
        marginTop: 8,
    },
    pickerLabel: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 4,
    },
    pickerContainer: {
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        overflow: 'hidden',
        marginBottom: 8,
    },
    picker: {
        color: '#0F172A',
    },
    selectedPharmacien: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDF4',
        padding: 10,
        borderRadius: 8,
        gap: 8,
        marginTop: 4,
    },
    selectedText: {
        fontSize: 13,
        color: '#065F46',
        fontWeight: '500',
    },
    selectedName: {
        fontWeight: '700',
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
        gap: 8,
    },
    noteText: {
        fontSize: 13,
        color: '#1E40AF',
        fontWeight: '500',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cancelButtonText: {
        color: '#64748B',
        fontSize: 16,
        fontWeight: '600',
    },
    createButton: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        paddingVertical: 16,
        borderRadius: 10,
        gap: 8,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    createButtonDisabled: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0,
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    spinningIcon: {
        animation: 'spin 1s linear infinite',
    },
});