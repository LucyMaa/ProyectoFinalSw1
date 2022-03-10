import React, {ReactElement} from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {TabNavigation} from "./TabNavigation";
import Camera from '../screens/Camera'
import {RootStackParamList} from "./RootStack";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = (): ReactElement => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Tab'}>
                <Stack.Screen name={'Tab'} component={TabNavigation}/>
                <Stack.Screen name={'Camera'} component={Camera}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;
