import axios from "axios";
import {GuardarComida, Ingredients, GuardarComidaRestaurant, Comida, RestaurantesPos} from "../types";

const KEY = '0d9b67698c9cc959a17810e31958e07ab08b5a86';
//const KEY = 'cbdcaa436099a9e1349534c62499f3d7c5fd0c69';
const URL = 'https://api.logmeal.es/v2/recognition/complete'
const INGREDIENTS = 'https://api.logmeal.es/v2/recipe/ingredients'

const headers = {
    'Authorization': `Bearer ${KEY}`,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
};
const headers2 = {
    'Authorization': `Bearer ${KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const longMealAPI = async (data: FormData): Promise<Ingredients> => {
    try {
        const res = await fetch(URL, {
            method: 'POST',
            headers: headers,
            body: data
        })
        if (res.status === 200) {
            const imageId = (await res.json())['imageId'];
            //const imageId = obj['imageId']
            const bodyData = new FormData();
            bodyData.append('imageId', imageId);
            const ingredients = await fetch(INGREDIENTS, {
                method: 'POST',
                headers: headers2,
                body: JSON.stringify({imageId: imageId})
            })
            return ingredients.json()
        }
        return Promise.reject(Error('Error'));
    } catch (e) {
        throw  new Error("Error")
    }
}

export const ingredientesComida = async (comida: string): Promise<any> => {
    try {
        const res = await axios.get(`http://192.168.100.7:4000/v1/ingredientescomida?nombre=${comida}`, {})
        console.log('dataing', res.data)
        return res.data
    } catch (e: any) {
        throw new Error(e.response.status)
    }
}

export const guardarComidaAPI = async (data: GuardarComida): Promise<Comida> => {
    try {
        const res = await axios.post(`http://192.168.100.7:4000/v1/guardarcomida`, data)
        return res.data
    } catch (e: any) {
        throw new Error(e.response.status)
    }
}

export const guardarComidaRestaurant = async (comidaRes: GuardarComidaRestaurant): Promise<any> => {
    try {
        const res = await axios.post(`http://192.168.100.7:4000/v1/guardarcomidares`, comidaRes)
        return res.data
    } catch (e: any) {
        throw new Error("Error")
    }
}

export const mostrarRestaurantes = async (nombrecomida: string): Promise<RestaurantesPos[]> => {
    try {
        const res = await axios.get(`http://192.168.100.7:4000/v1/restaurantescomida?nombrecomida=${nombrecomida}`)
        return res.data
    } catch (e: any) {
        console.log(e.response.data.message)
        throw new Error(e.response.data.message)
    }
}
