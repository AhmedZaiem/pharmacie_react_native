import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getUsers } from '../../api/userService';
import { useCommandeStore } from '../../store/commandeStore';
import Input from '../../components/common/Input';

export default function CommandeCreateScreen({ route, navigation }) {
    const { item } = route.params;
    const { addCommande } = useCommandeStore();

    const [loading, setLoading] = useState(false);
    const [pharmaciens, setPharmaciens] = useState([]);
    const [selectedPharmacien, setSelectedPharmacien] = useState(null);
    const [lieuLivraison, setLieuLivraison] = useState("");

    // Load users → filter pharmaciens
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

    const handleCreateCommande = async () => {
        if (!selectedPharmacien) {
            return Alert.alert("Erreur", "Veuillez choisir un pharmacien");
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
            Alert.alert('Success', 'Commande created successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to create commande:', error);
            Alert.alert('Error', 'Failed to create commande');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Commande à Créer</Text>

            <View style={{ marginBottom: 20 }}>
                <Text>Ordonnance ID: {item.id}</Text>
                <Text>Patient ID: {item.patientId}</Text>
                <Text>Date Création: {new Date().toISOString()}</Text>

                {/* INPUT: Lieu Livraison */}
                <Input
                    label="Lieu de livraison"
                    placeholder="Entrer le lieu"
                    value={lieuLivraison}
                    onChangeText={setLieuLivraison}
                />

                {/* SELECT: Pharmacien */}
                <Text style={styles.label}>Choisir un Pharmacien</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedPharmacien}
                        onValueChange={(value) => setSelectedPharmacien(value)}
                    >
                        <Picker.Item label="-- sélectionner --" value={null} />

                        {pharmaciens.map((p) => (
                            <Picker.Item
                                key={p.id}
                                label={`${p.id} - ${p.name}`}
                                value={p.id}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <Button
                title={loading ? 'Creating...' : 'Create Commande'}
                onPress={handleCreateCommande}
                disabled={loading}
            />
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
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: "white",
    },
});
