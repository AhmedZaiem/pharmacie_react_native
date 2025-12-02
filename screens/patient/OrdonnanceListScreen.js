import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useOrdonnanceStore } from "../../store/ordonnanceStore";
import { useAuthStore } from "../../store/authStore";
import { Ionicons } from '@expo/vector-icons';

export default function OrdonnanceListScreen({ navigation }) {
    const { ordonnances, loadOrdonnances } = useOrdonnanceStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, logout } = useAuthStore();

    useEffect(() => {
        const fetchOrdonnances = async () => {
            try {
                setLoading(true);
                setError(null);
                await loadOrdonnances();
            } catch (error) {
                console.error("Failed to load ordonnances:", error);
                setError("Impossible de charger les ordonnances");
            } finally {
                setLoading(false);
            }
        };

        fetchOrdonnances();
    }, [loadOrdonnances]);

    const handleLogout = () => {
        logout();
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short'
        });
    };

    const getMedicamentCount = (ordonnance) => {
        return ordonnance.medicaments?.length || 0;
    };

    // Filter ordonnances for the current patient
    const patientOrdonnances = ordonnances.filter(ordonnance => 
        `p${user.id}` === ordonnance.patientId
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <Ionicons name="document-text" size={48} color="#CBD5E1" />
                <Text style={styles.loadingText}>Chargement des ordonnances...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Ionicons name="alert-circle" size={48} color="#EF4444" />
                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton}
                    onPress={() => loadOrdonnances()}
                >
                    <Text style={styles.retryButtonText}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const OrdonnanceCard = ({ item }) => (
        <TouchableOpacity
            style={styles.ordonnanceCard}
            onPress={() => navigation.navigate("OrdonnanceDetail", { item })}
            activeOpacity={0.9}
        >
            <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                    <Ionicons name="document-text" size={24} color="#3B82F6" />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.ordonnanceId}>Ordonnance #{item.id}</Text>
                    <Text style={styles.dateText}>{formatDate(item.date)}</Text>
                </View>
                <View style={styles.medCount}>
                    <Ionicons name="medical" size={14} color="#10B981" />
                    <Text style={styles.medCountText}>{getMedicamentCount(item)}</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Ionicons name="person" size={12} color="#64748B" />
                        <Text style={styles.infoLabel}>Patient:</Text>
                        <Text style={styles.infoValue}>p{item.patientId}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="person" size={12} color="#64748B" />
                        <Text style={styles.infoLabel}>Médecin:</Text>
                        <Text style={styles.infoValue}>d{item.medecinId}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <Text style={styles.viewDetailsText}>
                    Voir les détails
                    <Ionicons name="chevron-forward" size={14} color="#3B82F6" />
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mes Ordonnances</Text>
                <Text style={styles.subtitle}>Patient ID: p{user.id}</Text>
            </View>

            <TouchableOpacity
                style={styles.commandesButton}
                onPress={() => navigation.navigate("Commandes")}
                activeOpacity={0.9}
            >
                <Ionicons name="cart" size={20} color="#FFFFFF" />
                <Text style={styles.commandesButtonText}>📋 Voir mes Commandes</Text>
            </TouchableOpacity>

            {patientOrdonnances.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="document-text-outline" size={64} color="#CBD5E1" />
                    <Text style={styles.emptyTitle}>Aucune ordonnance</Text>
                    <Text style={styles.emptyText}>
                        Vous n'avez pas encore d'ordonnance enregistrée
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={patientOrdonnances}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <OrdonnanceCard item={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={
                        <View style={styles.statsCard}>
                            <Text style={styles.statsText}>
                                {patientOrdonnances.length} ordonnance{patientOrdonnances.length !== 1 ? 's' : ''}
                            </Text>
                        </View>
                    }
                />
            )}

            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={20} color="#DC2626" />
                <Text style={styles.logoutButtonText}>Déconnexion</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        padding: 20,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E293B',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '500',
    },
    commandesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 20,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    commandesButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    statsCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statsText: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '600',
        textAlign: 'center',
    },
    ordonnanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardInfo: {
        flex: 1,
    },
    ordonnanceId: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 2,
    },
    dateText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    medCount: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#10B98110',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 4,
        borderWidth: 1,
        borderColor: '#10B98130',
    },
    medCountText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#10B981',
    },
    cardBody: {
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 16,
    },
    infoItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 12,
        color: '#0F172A',
        fontWeight: '600',
    },
    cardFooter: {
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 12,
    },
    viewDetailsText: {
        color: '#3B82F6',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'right',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 16,
        fontWeight: '500',
    },
    error: {
        color: '#DC2626',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#64748B',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        lineHeight: 20,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2',
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 14,
        borderRadius: 10,
        gap: 8,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    logoutButtonText: {
        color: '#DC2626',
        fontSize: 16,
        fontWeight: '600',
    },
});