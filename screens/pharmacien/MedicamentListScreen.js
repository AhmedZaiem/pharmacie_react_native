import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useMedicamentStore } from '../../store/medicamentStore';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function MedicamentListScreen({ navigation }) {
    const { medicaments, loadMedicaments, deleteMedicament } = useMedicamentStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicaments = async () => {
            try {
                await loadMedicaments();
            } catch (error) {
                console.error('Failed to load medicaments:', error);
                Alert.alert('Error', 'Failed to load medicaments');
            } finally {
                setLoading(false);
            }
        };
        fetchMedicaments();
    }, [loadMedicaments]);

    const handleDelete = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this medicament?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteMedicament(id);
                            Alert.alert('Success', 'Medicament deleted successfully');
                        } catch (error) {
                            console.error('Failed to delete medicament:', error);
                            Alert.alert('Error', 'Failed to delete medicament');
                        }
                    },
                },
            ]
        );
    };

    const renderMedicament = ({ item }) => (
        <TouchableOpacity
            style={styles.medicamentItem}
            onPress={() => navigation.navigate('MedicamentForm', { medicament: item })}
        >
            <View style={styles.medicamentInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.qte}>Qte: {item.qte}</Text>
                <Text style={styles.dosage}>Dosage: {item.dosage}</Text>
                <Text style={styles.forme}>Forme: {item.forme}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medicaments</Text>
            <Button
                title="Add New Medicament"
                onPress={() => navigation.navigate('MedicamentForm')}
            />
            <FlatList
                data={medicaments}
                keyExtractor={(item) => item.id}
                renderItem={renderMedicament}
                ListEmptyComponent={<Text style={styles.emptyText}>No medicaments found</Text>}
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
        marginBottom: 16,
        textAlign: 'center',
    },
    medicamentItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    medicamentInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 4,
        marginVertical: 10,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 32,
    },
    qte: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
        fontWeight: '500',
    },
    dosage: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    forme: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
        marginTop: 2,
    },
});
