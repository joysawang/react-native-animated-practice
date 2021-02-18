import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SPORTS } from '../../config/data'
import BackIcon from './../../components/Icon/Back'

const { width, height } = Dimensions.get('window')
const ITEM_PER_ROW = 4
const SPACING = 15
const ICON_WIDTH = (width / ITEM_PER_ROW) - (SPACING * 2)
const ICON_HEIGHT = ICON_WIDTH

const SportList = ({ navigation, route }) => {
    const { title } = route.params

    const renderSportItem = useCallback((item) => {
        return (
            <TouchableOpacity
                key={`sport_${item.id}`}
                style={{
                    padding: SPACING
                }}
                onPress={() => requestAnimationFrame(() => navigation.navigate('SportDetail', { item }))}
            >
                <SharedElement id={`item.${item.id}.icon`}>
                    <FastImage
                        source={{ uri: item.image }}
                        style={{ width: ICON_WIDTH, height: ICON_HEIGHT }}
                    />
                </SharedElement>
            </TouchableOpacity>
        )
    }, [])

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackIcon onPress={() => requestAnimationFrame(() => navigation.goBack())} />
                <SharedElement id="item.title">
                    <Text style={{ fontSize: 20, fontWeight: '800' }}>{title}</Text>
                </SharedElement>
            </View>
            <View style={styles.listItemContainer}>
                {SPORTS.map(renderSportItem)}
            </View>
        </SafeAreaView>
    )
}

SportList.sharedElements = (route, otherRoute, showing) => {
    const blackList = ['SportDetail']

    return blackList.includes(otherRoute.name) ? [] : ['item.title']
}

export default SportList

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1
    },
    listItemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
})