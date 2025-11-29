import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button} from "react-native";
import { useOrdonnanceStore } from "../../store/ordonnanceStore";
import { useAuthStore } from "../../store/authStore";

export default function OrdonnanceListScreen({ navigation }) {
    const { ordonnances, loadOrdonnances } = useOrdonnanceStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthStore();



    useEffect(() => {
        const fetchOrdonnances = async () => {
            try {
                setLoading(true);
                setError(null);
                await loadOrdonnances();
            } catch (error) {
                console.error("Failed to load ordonnances:", error);
                setError("Failed to load ordonnances");
            } finally {
                setLoading(false);
            }
        };

        fetchOrdonnances();
    }, [loadOrdonnances]);



    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!ordonnances || ordonnances.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No ordonnances found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ordonnance List</Text>
            <Text>Patient ID: p{user.id}</Text>
            <Button title="Voir les Commandes" onPress={() => navigation.navigate("Commandes")} />
            <FlatList
                data={ordonnances}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if (`p${user.id}` === item.patientId) {
                        return (
                            <View style={styles.ordonnanceCard}>
                                <Text style={styles.ordonnanceId}>Ordonnance ID: {item.id}</Text>
                                <Text>Patient ID: {item.patientId}</Text>
                                <Text>Doctor ID: {item.medecinId}</Text>
                                <Button
                                    title="Details"
                                    onPress={() =>
                                        navigation.navigate("OrdonnanceDetail", { item })
                                    }
                                />
                            </View>
                        );
                    }
                    return null;
                }}

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
    ordonnanceCard: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ordonnanceId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    medicamentsTitle: {
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    medicamentItem: {
        marginLeft: 8,
        marginBottom: 4,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
});