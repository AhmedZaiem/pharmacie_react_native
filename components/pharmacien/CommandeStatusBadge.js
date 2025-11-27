import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommandeStatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ffa500';
            case 'confirmed':
                return '#008000';
            case 'delivered':
                return '#0000ff';
            default:
                return '#808080';
        }
    };

    return (
        <View style={[styles.badge, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.text}>{status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CommandeStatusBadge;
