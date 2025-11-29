import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function MedicamentFormScreen({ navigation, route }) {
    const { addMedicament, updateMedicament } = useMedicamentStore();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const isEditing = route.params?.medicament;

    useEffect(() => {
        if (isEditing) {
            setName(isEditing.name || '');
            setDescription(isEditing.description || '');
            setPrice(isEditing.price?.toString() || '');
        }
    }, [isEditing]);

    const handleSubmit = async () => {
        if (!name || !price) {
            Alert.alert('Error', 'Please fill in name and price');
            return;
        }

        setLoading(true);
        try {
            const medicament = {
                id: isEditing ? isEditing.id : Date.now().toString(),
                name,
                description,
                price: parseFloat(price),
            };

            if (isEditing) {
                await updateMedicament(medicament.id, medicament);
                Alert.alert('Success', 'Medicament updated successfully');
            } else {
                await addMedicament(medicament);
                Alert.alert('Success', 'Medicament added successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save medicament:', error);
            Alert.alert('Error', 'Failed to save medicament');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{isEditing ? 'Edit Medicament' : 'Add New Medicament'}</Text>
            <Input
                placeholder="Medicament Name"
                value={name}
                onChangeText={setName}
            />
            <Input
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Input
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button
                title={loading ? 'Saving...' : (isEditing ? 'Update Medicament' : 'Add Medicament')}
                onPress={handleSubmit}
                disabled={loading}
            />
        </ScrollView>
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
});
