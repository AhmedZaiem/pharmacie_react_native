import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Ionicons } from '@expo/vector-icons';

export default function MedicamentFormScreen({ navigation, route }) {
    const { addMedicament, updateMedicament } = useMedicamentStore();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [forme, setForme] = useState('');
    const [qte, setQte] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const isEditing = route.params?.medicament;

    useEffect(() => {
        if (isEditing) {
            setName(isEditing.name || '');
            setDosage(isEditing.dosage || '');
            setForme(isEditing.forme || '');
            setPrice(isEditing.price?.toString() || '');
            setQte(isEditing.qte?.toString() || '');
        }
    }, [isEditing]);

    const handleSubmit = async () => {
        if (!name || !price) {
            Alert.alert('Champs requis', 'Le nom et le prix sont obligatoires');
            return;
        }

        setLoading(true);
        try {
            const medicament = {
                id: isEditing ? isEditing.id : Date.now().toString(),
                name,
                dosage,
                forme,
                price: parseFloat(price),
                qte,
            };

            if (isEditing) {
                await updateMedicament(medicament.id, medicament);
                Alert.alert('Succès', 'Médicament modifié avec succès');
            } else {
                await addMedicament(medicament);
                Alert.alert('Succès', 'Médicament ajouté avec succès');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save medicament:', error);
            Alert.alert('Erreur', 'Échec de la sauvegarde du médicament');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
                style={styles.scrollContainer}
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
                    <Text style={styles.title}>
                        {isEditing ? '📝 Modifier Médicament' : '➕ Ajouter Médicament'}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Informations de Base</Text>
                        <Input
                            label="Nom du Médicament *"
                            placeholder="Ex: Paracétamol"
                            value={name}
                            onChangeText={setName}
                            icon="💊"
                        />
                        <Input
                            label="Forme"
                            placeholder="Ex: Comprimé, Sirop, Gélule"
                            value={forme}
                            onChangeText={setForme}
                            icon="⚪"
                        />
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Dosage et Quantité</Text>
                        <Input
                            label="Dosage"
                            placeholder="Ex: 500mg, 10mg/ml"
                            value={dosage}
                            onChangeText={setDosage}
                            icon="📏"
                        />
                        <Input
                            label="Quantité"
                            placeholder="Ex: 20"
                            value={qte}
                            onChangeText={setQte}
                            keyboardType="numeric"
                            icon="🔢"
                        />
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Prix</Text>
                        <Input
                            label="Prix (€) *"
                            placeholder="Ex: 12.50"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                            icon="💶"
                        />
                    </View>

                    <View style={styles.infoNote}>
                        <Ionicons name="information-circle-outline" size={18} color="#3B82F6" />
                        <Text style={styles.infoNoteText}>
                            Les champs marqués d'un * sont obligatoires
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </TouchableOpacity>
                        
                        <Button
                            title={loading ? 'Enregistrement...' : (isEditing ? 'Mettre à jour' : 'Ajouter')}
                            onPress={handleSubmit}
                            disabled={loading}
                            style={styles.submitButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
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
    formContainer: {
        padding: 20,
    },
    formSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#F1F5F9',
    },
    infoNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 24,
        marginTop: 8,
        gap: 8,
    },
    infoNoteText: {
        fontSize: 14,
        color: '#1E40AF',
        fontWeight: '500',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
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
    submitButton: {
        flex: 2,
    },
});