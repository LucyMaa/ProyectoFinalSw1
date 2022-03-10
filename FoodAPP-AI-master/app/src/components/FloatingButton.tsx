import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import Animated, {
    withSpring,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    useCode,
    eq,
    cond
} from 'react-native-reanimated'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HEIGHT = Dimensions.get('screen').height;

type Props = {
    navigation: any,
    onFunc:()=>void,
}

export const FloatingButton = ({navigation,onFunc}: Props) => {
    const anim = useSharedValue(HEIGHT)

    const bStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: withTiming(anim.value, {duration: 2000})}]
        }
    })
    useCode(() => cond(anim.value, anim.value = HEIGHT - HEIGHT), [])
    return (
        <Animated.View style={[{
            width: 70,
            height: 70,
            backgroundColor: '#1565c0',
            borderRadius: 100,
            position: 'absolute',
            bottom: 50,
            right: 10,
        }, bStyle]}>
            <RectButton
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100
                }}
                onPress={onFunc}>
                <MaterialCommunityIcons name={'camera'} color={'white'} size={30}/>
            </RectButton>
        </Animated.View>
    )
}
