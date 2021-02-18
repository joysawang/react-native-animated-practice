import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { Easing } from 'react-native'

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
                    transitionSpec: {
                        open: {
                            animation: "timing",
                            config: {
                                duration: 500,
                                easing: Easing.inOut(Easing.ease)
                            }
                        },
                        close: {
                            animation: "timing",
                            config: {
                                duration: 500,
                                easing: Easing.inOut(Easing.ease)
                            }
                        }
                    },
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return {
                            cardStyle: {
                                opacity: progress
                            }
                        }
                    }
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
            <RootStack.Screen name="Sport" component={SportNavigation} />
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