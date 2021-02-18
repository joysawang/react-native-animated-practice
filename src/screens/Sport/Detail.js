import React, { useCallback, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text, FlatList, ScrollView, Animated } from 'react-native';
import FastImage from 'react-native-fast-image'
import { SharedElement } from 'react-navigation-shared-element';
import { SafeAreaView } from 'react-native-safe-area-context'

import { SPORTS } from './../../config/data'
import BackIcon from './../../components/Icon/Back'

const { width, height } = Dimensions.get('window')
const ITEM_PER_ROW = 6
const SPACING = 15
const ICON_WIDTH = (width / ITEM_PER_ROW) - (SPACING * 2)
const ICON_HEIGHT = ICON_WIDTH

const SportDetail = ({ navigation, route }) => {
    const { item } = route.params
    const ref = useRef()
    const selectedItemIndex = SPORTS.findIndex((index) => index.id === item.id)
    const mountedAnimated = useRef(new Animated.Value(0)).current
    const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current
    const activeIndexAnimation = useRef(new Animated.Value(selectedItemIndex)).current

    const renderNavSportItem = useCallback((item, index) => {
        const inputRange = [(index - 1), index, (index + 1)]
        const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
        })

        return (
            <TouchableOpacity
                key={`sport_${item.id}`}
                style={{
                    padding: SPACING
                }}
                onPress={() => {
                    activeIndex.setValue(index)
                    ref.current.scrollToIndex({
                        index,
                        animated: true
                    })
                }}
            >
                <Animated.View style={{ alignItems: 'center', width: ICON_WIDTH, opacity }}>
                    <SharedElement id={`item.${item.id}.icon`}>
                        <FastImage
                            source={{ uri: item.image }}
                            style={{ width: ICON_WIDTH, height: ICON_HEIGHT }}
                        />
                    </SharedElement>
                    <Animated.Text style={{ fontSize: 10, marginTop: 5, opacity: mountedAnimated }} numberOfLines={1}>{item.title}</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }, [])

    const keyExtractor = useCallback((item) => `sport_${item.id}`, [])

    const renderSportItem = useCallback(({ item }) => {
        return (
            <ScrollView
                style={{
                    width: width - SPACING * 2,
                    margin: SPACING,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    borderRadius: 16
                }}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={{ padding: SPACING }}>
                    <Text>{Array(50).fill(`${item.title} inner text \n`)}</Text>
                </View>
            </ScrollView>
        )
    }, [])

    const getItemLayout = useCallback((data, index) => {
        return {
            length: width,
            offset: width * index,
            index
        }
    }, [])

    const onMomentumScrollEnd = useCallback(event => {
        const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width)

        activeIndex.setValue(newIndex)
    }, [])

    const animation = (toValue, delay) => {
        return Animated.timing(mountedAnimated, {
            toValue,
            duration: 300,
            delay,
            useNativeDriver: true
        })
    }

    useEffect(() => {
        Animated.parallel([
            Animated.timing(activeIndexAnimation, {
                toValue: activeIndex,
                duration: 300,
                useNativeDriver: true
            }),
            animation(1, 500)
        ]).start()
    }, [])

    const size = ICON_WIDTH + SPACING * 2
    const translateY = mountedAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0]
    })
    const translateX = activeIndexAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [size, 0, -size]
    })

    return (
        <SafeAreaView style={styles.safeContainer}>
            <BackIcon onPress={() => requestAnimationFrame(() => {
                animation(0).start(() => {
                    navigation.goBack()
                })
            })} />
            <Animated.View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    marginTop: SPACING,
                    marginLeft: width / 2 - ICON_WIDTH / 2 - SPACING,
                    transform: [{ translateX }]
                }}
            >
                {SPORTS.map(renderNavSportItem)}
            </Animated.View>
            <Animated.FlatList
                style={{ opacity: mountedAnimated, transform: [{ translateY }] }}
                ref={ref}
                data={SPORTS}
                keyExtractor={keyExtractor}
                renderItem={renderSportItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                initialScrollIndex={selectedItemIndex}
                getItemLayout={getItemLayout}
                pagingEnabled
                nestedScrollEnabled
            />
        </SafeAreaView>
    )
}

SportDetail.sharedElements = (route, otherRoute, showing) => {
    return SPORTS.map((item) => `item.${item.id}.icon`)
}

export default SportDetail

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1
    }
})