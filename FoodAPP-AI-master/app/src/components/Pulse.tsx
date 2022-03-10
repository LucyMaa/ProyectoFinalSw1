import React, {useEffect, Fragment} from 'react'
import Animated, {
    withRepeat,
    withTiming,
    useSharedValue,
    useCode,
    useAnimatedStyle,
    Easing, withDelay,
    cancelAnimation, cond, eq
} from 'react-native-reanimated';
import {View} from "react-native";


type Props = {
    delay: number,
    loading: boolean
}
export const Pulse = ({delay, loading}: Props) => {
    const anim = useSharedValue(0)
    const opacity = useSharedValue(1)

    const pulseStyle = useAnimatedStyle(() => {

        return {
            /* width: anim.value,
             height: anim.value,*/
            transform: [{
                scale: withDelay(delay, withRepeat(withTiming(anim.value, {
                    duration: 3000,
                    easing: Easing.ease
                }), -1))
            }],
            opacity: withDelay(delay, withRepeat(withTiming(opacity.value, {
                duration: 3000,
                easing: Easing.ease
            }), -1)),
        }
    })
    useCode(() => cond(eq(anim.value, 0), anim.value = 1), [])
    useCode(() => cond(eq(opacity.value, 1), opacity.value = 0), [])
    /*useEffect(() => {
        anim.value = 1;
        opacity.value = 0;

        return () => {
            cancelAnimation(anim)
            cancelAnimation(opacity)
        }
    }, [])*/

    return (
        <Animated.View style={[{
            width: 200,
            backgroundColor: '#bbdefb',
            height: 200,
            borderRadius: 100,
            position: 'absolute',
            alignSelf: 'center',
            bottom: 20,
        }, pulseStyle]}/>

    )
}
