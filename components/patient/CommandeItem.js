import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';

const CommandeItem = ({ commande }) => {
    const { updateCommandeStatus } = useCommandeStore();

    const handleStatusUpdate = async (newStatus) => {
        await updateCommandeStatus(commande.id, newStatus);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Commande ID: {commande.id}</Text>
            <Text>Patient: {commande.patientName}</Text>
            <Text>Medicaments: {commande.medicaments.join(', ')}</Text>
            <Text>Status: {commande.status}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('confirmed')}>
                    <Text style={styles.buttonText}>Confirmer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('delivered')}>
                    <Text style={styles.buttonText}>Livrer</Text>
                </TouchableOpacity>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CommandeItem;
