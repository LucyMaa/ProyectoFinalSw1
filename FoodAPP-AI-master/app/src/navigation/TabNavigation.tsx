import React, {ReactElement} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View} from "react-native";
import {Home} from "../screens/Home";
import {Prueba} from '../screens/Prueba'
import {TabParamList} from "./RootStack";

type RootStackParamList = {
    Home: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const TabNavigation = (): ReactElement => {
    return (
        <Tab.Navigator initialRouteName={'Home'} shifting={true}
                       barStyle={{backgroundColor: '#1565c0'}}>
            <Tab.Screen name={'Home'} component={Home} options={{
                tabBarLabel: "Home",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={25}/>
                ),
            }}/>
            <Tab.Screen name={'Home2'} component={Prueba} options={{
                tabBarLabel: "Test",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="poll" color={color} size={25}/>
                ),
            }}/>
        </Tab.Navigator>
    )
}
