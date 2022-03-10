import {StatusBar} from 'expo-status-bar';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import AppNavigation from './src/navigation'
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
    return (
        <View style={styles.container}>
            <PaperProvider>
                <AppNavigation/>
            </PaperProvider>
        </View>
    );
}

const Prueba2 = () =>{
    return(
        <View>
            <Text>h</Text>
        </View>
    )
}
AppRegistry.registerComponent('custom-component', () => Prueba2);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',

    },
});
