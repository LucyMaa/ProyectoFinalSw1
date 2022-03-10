import React, {Fragment, ReactElement, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Dimensions, Image, Alert} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import Animated, {
    withSpring,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    useCode,
    eq,
    cond,
    runOnUI,
    runOnJS
} from 'react-native-reanimated'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {RootStackParamList, TabParamList} from "../navigation/RootStack";
import {Dialog} from '../components/Dialog'
import {manipulateAsync} from "expo-image-manipulator";
import {longMealAPI, ingredientesComida, guardarComidaAPI, guardarComidaRestaurant} from "../services";
import {FloatingButton} from "../components/FloatingButton";
import {Pulse} from "../components/Pulse";
import {Ingredients, Ingrediente, GuardarComida} from "../types";
import {StackScreenProps} from "@react-navigation/stack";
import {MaterialBottomTabScreenProps} from "@react-navigation/material-bottom-tabs";
import {CompositeScreenProps} from "@react-navigation/native";


const HEIGHT = Dimensions.get('screen').height;
//type Props = NativeStackScreenProps<RootStackParamList, 'Tab'>;
type Props = CompositeScreenProps<MaterialBottomTabScreenProps<TabParamList, 'Home'>,
    StackScreenProps<RootStackParamList>>;
export const Home = ({navigation, route}: Props) => {

    const anim = useSharedValue(HEIGHT)
    const [img, setImg] = useState<string>('https://images2.alphacoders.com/100/1003810.jpg')
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false);
    const [ingredients, setingredients] = useState<Ingredients | null>(null)
    const [modalGuardarComida, setModalGuardarComida] = useState(false);


    const requestImage = async (uri: string) => {
        const f = Dimensions.get('screen').width;
        const img2 = await manipulateAsync(uri, [{
            resize: {
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height
            }
        }])
        console.log('img2', img2.uri)
        let uriParts = img2.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        console.log(uriParts)
        console.log(uri)
        //const data = await longMealAPI(photo.uri)
        const formData = new FormData();
        formData.append('image', JSON.parse(
            JSON.stringify({
                uri: img2.uri,
                type: 'image/' + fileType,
                name: "image." + fileType,
            })
        ));
        console.log(formData)
        try {

            setLoading(true);
            /*await (new Promise(resolve => {
                setTimeout(() => {
                    resolve(1);
                }, 5000);
            }));*/
            const data = await longMealAPI(formData)
            //const data = "arroz con cebolla"
            //const ingredientes = await ingredientesComida(data)
            //console.log(ingredientes)
            await verificarIngredientesComida(data)
            console.log('after verificar ingre', data)
            setingredients(data)
            //setActive(true);
            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    const verificarIngredientesComida = async (comida: Ingredients) => {
        try {
            await ingredientesComida(comida.foodName)
            setActive(true);
            setLoading(false);
        } catch (e: any) {
            console.log("error")
            console.log(e.message)
            if (e.message == 401) {
                guardarComidaAlert(comida)
            }
        }
    }


    const guardarComidaAlert = (comida: Ingredients) =>
        Alert.alert(
            "Comida no encontrada",
            "Desea Guardar la comida y sus ingredientes?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed")
                        setActive(true);
                        setLoading(false);
                    },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        console.log("OK Pressed")
                        try {
                            await guardarComida(comida)
                            setActive(true);
                            setLoading(false);
                        } catch (e) {

                        }
                    }
                }
            ]
        );

    const guardarComida = async (comida: Ingredients) => {
        const ingredientes: Ingrediente[] = []
        for (let ingredient of comida.recipe) {
            ingredientes.push({nombre: ingredient.name})
        }
        console.log('ingrediemtes ', ingredientes)
        try {
            const comidadata = await guardarComidaAPI({nombrecomida: comida.foodName, ingredientes})
            console.log(comidadata)
            const idrestaurant = Math.random() * (3 - 0) + 0;
            const comidares = await guardarComidaRestaurant({
                idcomida: comidadata.id,
                restaurantes: [{id: 1, precio: 25}]
            });
            console.log(comidares);
        } catch (e: any) {
            console.log(e.message)
        }
    }


    useEffect(() => {
        console.log("enter")
        //anim.value = withTiming(HEIGHT - HEIGHT, {duration: 2000})
        if (route.params?.img) {
            setImg(route.params.img);
            (async () => await requestImage(route.params.img as string))()
        }
        return () => console.log("exit")
    }, [route.params?.img])

    const afterRemove = () => {
        setActive(false);
        navigation.navigate('Home2', {nombrecomida: ingredients?.foodName})
    }


    return (
        <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            {active &&
            <Dialog active={active} afterRemove={afterRemove} setActive={setActive}>
                <Text style={{
                    fontWeight: '600',
                    fontSize: 17,
                    color: '#1565c0',
                    marginBottom: 5
                }}>Informacion de la comida:</Text>
                <View>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 17,
                        marginVertical: 5,
                    }}>Nombre: {ingredients?.foodName}</Text>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 17,
                        marginVertical: 5,
                    }}>Ingredientes:</Text>
                    {ingredients?.recipe?.map((e, key) => (
                        <Text key={key} style={{
                            fontWeight: '400',
                            fontSize: 17,
                            marginVertical: 5,
                            marginLeft: 10
                        }}>- {e.name}</Text>
                    ))}
                </View>
            </Dialog>}
            <View style={{width: '100%', height: '100%'}}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, flex: 1}}
                       source={{uri: img}}/>

                <View style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                }}>
                    {loading ? (
                        <Fragment>
                            <Pulse loading={loading} delay={250}/>
                            <Pulse loading={loading} delay={1250}/>
                            <Pulse loading={loading} delay={2250}/>
                        </Fragment>) : null}
                </View>
            </View>
            {!loading && <FloatingButton onFunc={async () => {
                navigation.navigate('Camera')
            }} navigation={navigation}/>}
        </View>
    )
}
