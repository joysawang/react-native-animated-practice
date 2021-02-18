import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { Easing } from 'react-native'

import { cardFade } from './transition'

import MenuPracticeScreen from './../screens/Menu/Practice'

import SportListScreen from '../screens/Sport/List'
import SportDetailScreen from '../screens/Sport/Detail'

const StackSport = createSharedElementStackNavigator()
const RootStack = createSharedElementStackNavigator()

const SportNavigation = () => {
    return (
        <StackSport.Navigator
            initialRouteName="SportList"
            headerMode="none"
        >
            <StackSport.Screen name="SportList" component={SportListScreen} />
            <StackSport.Screen
                name="SportDetail"
                component={SportDetailScreen}
                options={{
                    gestureEnabled: false,
                    ...cardFade(500)
                }}
            />
        </StackSport.Navigator>
    )
}

const RootNavigation = () => {
    return (
        <RootStack.Navigator
            initialRouteName="MenuPractice"
            headerMode="none"
        >
            <RootStack.Screen name="MenuPractice" component={MenuPracticeScreen} />
            <RootStack.Screen
                name="Sport"
                component={SportNavigation}
                options={{
                    gestureEnabled: false,
                    ...cardFade(300)
                }}
            />
        </RootStack.Navigator>
    )
}

export default () => {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    )
}