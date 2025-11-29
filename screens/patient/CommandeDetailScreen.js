import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CommandeItem from '../../components/patient/CommandeItem';

export default function CommandeDetailScreen() {
    const route = useRoute();
    const { commande } = route.params;

    if (!commande) {
        return (
            <View style={styles.center}>
                <Text>No commande data available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Commande Details</Text>
            <CommandeItem commande={commande} />
            {/* Additional details can be added here if needed */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
});
