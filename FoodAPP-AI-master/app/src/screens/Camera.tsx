import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Camera, PermissionStatus} from 'expo-camera';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList} from "../navigation/RootStack";

import * as FileSystem from 'expo-file-system';
import {longMealAPI} from "../services";
import {manipulateAsync, FlipType, SaveFormat, ActionResize} from 'expo-image-manipulator';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function App({navigation}: Props) {
    const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const camera = useRef<any>(null)



    const takePicture = async () => {
        const photo = await camera.current.takePictureAsync({quality: 0, skipProcessing: true});
        //console.log(photo)

        navigation.navigate({name: 'Home', params: {img: photo.uri}});
    }

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === PermissionStatus.GRANTED);
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera ref={ref => {
                camera.current = ref
            }} style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            /*setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );*/
                            await takePicture()
                        }}>
                        <MaterialCommunityIcons name={'camera-outline'} size={40}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: 'white',
        marginBottom: 20,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
