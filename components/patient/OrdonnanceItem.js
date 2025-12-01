import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useOrdonnanceStore } from '../../store/ordonnanceStore';

const OrdonnanceItem = ({ ordonnance }) => {
    const { updateOrdonnance } = useOrdonnanceStore();

    const handleUpdate = async () => {
        // Example update, perhaps change status or something
        await updateOrdonnance(ordonnance.id, { ...ordonnance, updated: true });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ordonnance ID: {ordonnance.id}</Text>
            <Text>Patient: {ordonnance.patientName}</Text>
            <Text>Medicaments: {ordonnance.medicaments.join(', ')}</Text>
            <TouchableOpacity style={[styles.button, { marginVertical: 10 }]} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrdonnanceItem;
