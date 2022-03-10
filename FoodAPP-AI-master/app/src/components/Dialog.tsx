import * as React from 'react';
import {Text, View, Dimensions, TouchableWithoutFeedbackComponent} from 'react-native';
import {Modal as ModalView, Portal, Button, Provider, Dialog as Dialog1, Paragraph} from 'react-native-paper';
import {
    TouchableOpacity,
    TapGestureHandler,
    TouchableWithoutFeedback,
    TapGestureHandlerGestureEvent, ScrollView
} from "react-native-gesture-handler";
import Animated, {
    useCode,
    useAnimatedStyle,
    withSpring,
    useWorkletCallback,
    withTiming,
    useSharedValue, useAnimatedGestureHandler, runOnJS
} from "react-native-reanimated";
import {FC, useEffect} from "react";

type Props = {
    active: boolean
    setActive: (active: boolean) => void
    afterRemove: () => void
}

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;


export const Dialog: FC<Props> = ({active, setActive, children, afterRemove}) => {
    //const [visible, setVisible] = React.useState(false);

    //const showModal = () => setVisible(true);
    const hideModal = () => setActive(false);

    const [hideDialog, setHideDialog] = React.useState(false)
    const anim = useSharedValue(HEIGHT)


    const dialogStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: anim.value
            }]
        }
    })
    const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
        onStart: (event, context) => {
            console.log("pressed")
        },
        onEnd: () => {
        }
    })

    useEffect(() => {
        console.log("dialog mounted")
        //anim.value = (HEIGHT / 2) - 200;
        anim.value = !hideDialog ? withTiming((HEIGHT / 2) - 200, {duration: 500}, () => {
        }) : withSpring(0)
        return () => console.log("dialog unmounted")
    }, [])
    return (
        <Portal>
            {active && <View style={{flex: 1}}>
                <View
                    onStartShouldSetResponder={() => true}
                    onResponderGrant={() => {
                        anim.value = withTiming(HEIGHT, {duration: 500}, () => {
                            /*setTimeout(() => {
                                setActive(false);
                            }, 10);*/
                            runOnJS(afterRemove)()
                        });

                    }
                    }
                    style={{
                        flex: 1,
                        backgroundColor: 'black',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: 0.5,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 0,
                    }}>
                </View>

                <Animated.View
                    style={[{
                        backgroundColor: 'white',
                        width: WIDTH / 1.3,
                        height: 400,
                        zIndex: 2,
                        position: 'absolute',
                        alignSelf: 'center',
                        //top: (HEIGHT / 2) - 200,
                        //padding: 20,
                        borderRadius: 5,
                    }, dialogStyle]}>
                    <ScrollView style={{padding: 20}}>
                        {children}
                    </ScrollView>
                </Animated.View>
            </View>}
        </Portal>

    );
};

