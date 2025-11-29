import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function CommandeCreateScreen({ navigation }) {
    const { addCommande } = useCommandeStore();
    const [medicament, setMedicament] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateCommande = async () => {
        if (!medicament || !quantity) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const newCommande = {
                id: Date.now().toString(),
                medicament,
                quantity: parseInt(quantity),
                status: 'pending',
                createdAt: new Date().toISOString(),
            };
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
            <Text style={styles.title}>Create New Commande</Text>
            <Input
                placeholder="Medicament Name"
                value={medicament}
                onChangeText={setMedicament}
            />
            <Input
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
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
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
});
