import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useCommandeStore } from '../../store/commandeStore';
import CommandeItem from '../../components/patient/CommandeItem';

export default function CommandeListScreen() {
    const { commandes, loadCommandes } = useCommandeStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                setLoading(true);
                setError(null);
                await loadCommandes();
            } catch (error) {
                console.error('Failed to load commandes:', error);
                setError('Failed to load commandes');
            } finally {
                setLoading(false);
            }
        };

        fetchCommandes();
    }, [loadCommandes]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading commandes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!commandes || commandes.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No commandes found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Commande List</Text>
            <FlatList
                data={commandes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CommandeItem commande={item} />}
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
    error: {
        color: 'red',
        fontSize: 16,
    },
});
