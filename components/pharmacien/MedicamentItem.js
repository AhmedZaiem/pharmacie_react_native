import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicamentItem = ({ medicament }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{medicament.name}</Text>
            <Text>Description: {medicament.description}</Text>
            <Text>Price: {medicament.price}€</Text>
            <Text>Stock: {medicament.stock}</Text>
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
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MedicamentItem;
