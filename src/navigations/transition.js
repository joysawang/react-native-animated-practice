import { Easing } from 'react-native'

export function cardFade(duration = 500) {
    return {
        transitionSpec: {
            open: {
                animation: "timing",
                config: {
                    duration: duration,
                    easing: Easing.inOut(Easing.ease)
                }
            },
            close: {
                animation: "timing",
                config: {
                    duration: duration,
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
    }
}