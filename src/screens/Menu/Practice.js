import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { SharedElement } from 'react-navigation-shared-element';

import { PRACTICES } from './../../config/data'

const Practice = ({ navigation }) => {
    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableOpacity
                style={styles.menuListItem}
                onPress={() => requestAnimationFrame(() => navigation.navigate(item.route, item.params))}
            >
                <SharedElement id="item.title">
                    <Text style={styles.menuListItemText}>{item.title}</Text>
                </SharedElement>
            </TouchableOpacity>
        )
    }, [])

    const keyExtractor = useCallback(item => `practice_${item.id}`, [])

    return (
        <SafeAreaView style={styles.safeContainer}>
            <FlatList
                data={PRACTICES}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </SafeAreaView>
    )
}

export default Practice

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1
    },
    menuListItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'flex-start'
    },
    menuListItemText: {
        fontSize: 30,
        fontWeight: '800'
    }
})