import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native'
import MapView, {
    Region,
    PROVIDER_GOOGLE,
    Polyline,
    Marker,
    AnimatedRegion,
    Animated as An,
    MarkerAnimated,
    OverlayAnimated, Overlay
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    TapGestureHandler,
    TapGestureHandlerGestureEvent
} from "react-native-gesture-handler";

import {
    Extrapolation,
    interpolate,
    interpolateNode,
    useAnimatedGestureHandler,
    useAnimatedStyle, useEvent,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
//import loop = Animated.loop;
import {Pulse} from "../components/Pulse";
import {RestaurantesPos} from "../types";
import {mostrarRestaurantes} from "../services";
import {RouteProp, useRoute, NavigatorScreenParams, CompositeScreenProps} from "@react-navigation/native";
import {RootStackParamList, TabParamList} from "../navigation/RootStack";
import {MaterialBottomTabScreenProps} from "@react-navigation/material-bottom-tabs";
import {StackScreenProps} from "@react-navigation/stack";


const origin = {latitude: -17.800631, longitude: -63.199440};
const destination = {latitude: -17.773680, longitude: -63.188956};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCsesEB7BHEDLLGMH2AytP_ZlQ5W1aAcjA';


type Props = CompositeScreenProps<MaterialBottomTabScreenProps<TabParamList, 'Home2'>,
    StackScreenProps<RootStackParamList>>;

export const Prueba = ({navigation, route}: Props) => {
    //const route = useRoute<Props>()
    const map = React.useRef();
    const map2 = React.useRef();
    const data = React.useRef(new AnimatedRegion({
        latitude: -17.800631, longitude: -63.199440,
        latitudeDelta: -17.800631,
        longitudeDelta: -63.199440
    })).current;

    const [cords, setCords] = React.useState<Region[]>([]);
    const [restaurantes, setRestaurantes] = React.useState<RestaurantesPos[]>([])

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: () => {
            console.log("start")
        },
        onEnd: () => {
            console.log("finisgh")
        },
        onFinish: () => {
            console.log("finish")
        }
    })

    data.addListener((val) => {
        console.log(val);
        setCords([...cords, val])

    })

    useEffect(() => {
        console.log(route.params);
        (async () => {
            if (route.params?.nombrecomida) {
                const res = await mostrarRestaurantes(route.params.nombrecomida);
                console.log('res' + res);
                setRestaurantes(res);
            }
        })()
    }, [route.params?.nombrecomida]);

    return (
        <View style={styles.container}>
            
                <View style={{flex: 1}}>
                    <MapView
                        provider={PROVIDER_GOOGLE}

                        initialCamera={{
                            zoom: 12,
                            center: {latitude: -17.804885, longitude: -63.168342},
                            altitude: 0,
                            heading: 0,
                            pitch: 0
                        }}
                        showsUserLocation={true} style={styles.map}>
                        {/*<MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                        />
*/}
                        {restaurantes.map((e, id) => {
                            return (
                                <Marker title={"Restaurant"}
                                        description={`Nombre: ${e.restaurant.nombre} \n Precio: ${e.Precio}`} key={id}
                                        coordinate={{
                                            latitude: e.restaurant.latitud,
                                            longitude: e.restaurant.longitud
                                        }}/>
                            )
                        })}

                    </MapView>
                </View>


        </View>
    )
}
const AnimatingPolylineComponent = () => {

    const [directions] = useState([{latitude: -17.800631, longitude: -63.199440},
        {latitude: -17.804020, longitude: -63.195079},
        {latitude: -17.773680, longitude: -63.188956}])
    const [polylines, setPolylines] = useState([{latitude: -17.800631, longitude: -63.199440},
        {latitude: -17.804020, longitude: -63.195079},
        {latitude: -17.773680, longitude: -63.188956}])
    useEffect(() => {
        const interval = setInterval(() => animatePolylineStart(), 70);
        return () => clearInterval(interval);
    }, []);


    const animatePolylineStart = () => {
        if (polylines.length < directions.length) {
            const Direction = directions;
            const polylinePath = [
                ...Direction.slice(0, polylines.length - 1)
            ];
            setPolylines(polylinePath)
            // this.setState({polylinePath});
        } else {
            setPolylines([])
            //this.setState({polylinePath: []})
        }
    };

    return (
        <React.Fragment>
            {
                (polylines.length > 0) &&
                <View style={{borderWidth: 0}}>
                    <Polyline
                        coordinates={polylines}
                        strokeColor="#484848"
                        strokeWidth={5}
                    />
                </View>
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
