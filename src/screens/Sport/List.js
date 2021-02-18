import React, { useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, InteractionManager, ScrollView, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'

import { SPORTS } from '../../config/data'
import BackIcon from './../../components/Icon/Back'

const { width, height } = Dimensions.get('window')
const ITEM_PER_ROW = 4
const SPACING = 15
const ICON_WIDTH = (width / ITEM_PER_ROW) - (SPACING * 2)
const ICON_HEIGHT = ICON_WIDTH

const SportList = ({ navigation, route }) => {
    const { title } = route.params
    const refs = useRef([])
    const animatedItem = useRef(new Animated.Value(0)).current

    const renderSportItem = useCallback((item, index) => {
        return (
            <Animatable.View
                ref={(el) => refs.current[index] = el}
                key={`sport_${item.id}`}
                animation="fadeInRight"
                duration={100}
                delay={(index * 50)}
                iterationDelay={300}
            >
                <TouchableOpacity
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
            </Animatable.View>
        )
    }, [])

    const onGoBack = useCallback(() => {
        Promise.all(refs.current.reverse().map((ref, index) => {
            ref.stopAnimation()
            return ref.animate("fadeOutRight", 100, (index * 50))
        })).then(() => {
            animatedCard(0).start(() => {
                navigation.goBack()
            })
        })
    }, [])

    const animatedCard = (toValue, delay = 0) => {
        return Animated.timing(animatedItem, {
            toValue,
            duration: 300,
            delay,
            useNativeDriver: true
        })
    }

    useEffect(() => {
        animatedCard(1).start()
    }, [])

    const translateY = animatedItem.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0]
    })

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackIcon onPress={() => requestAnimationFrame(onGoBack)} />
                <SharedElement id="item.title">
                    <Text style={{ fontSize: 20, fontWeight: '800' }}>{title}</Text>
                </SharedElement>
            </View>
            <ScrollView>
                <Animated.View style={[styles.contentContainer, { opacity: animatedItem, transform: [{ translateY }] }]}>
                    <Text style={styles.textHeader}>Shared Element Transition</Text>
                    <Text style={styles.textTitle}>+ react navigation shared element</Text>
                    <Text style={styles.textTitle}>+ react native animatable</Text>
                    <Text style={styles.textLittle}>@joysawang</Text>
                    <Text style={styles.textLittle}>github.com/joysawang</Text>
                </Animated.View>
                <View style={styles.listItemContainer}>
                    {SPORTS.map(renderSportItem)}
                </View>
            </ScrollView>
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
    },
    contentContainer: {
        padding: SPACING,
        margin: SPACING,
        backgroundColor: '#f8de04',
        borderRadius: SPACING
    },
    textHeader: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: '800'
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    textLittle: {
        fontSize: 12,
        textAlign: 'right',
        fontWeight: '600'
    }
})