import { View, Text, Image } from 'react-native';
import { Link } from '@react-navigation/native';
import Cadavre from './Cadavre';

export default function CadavreDetails() {
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Image source={require('../assets/images/background-image.png')} />
                <Text>12</Text>
            </View>
            <Link to={{screen: 'Home'}}>
                Découvrir le cadavre exquis →
            </Link>
            <Text>Cadavre exquis titre</Text>
            <Text>Par bchaulet@mail.com</Text>
            <Text>Première contribution du cadavre exquis</Text>
            <Stack.Navigator initialRouteName="List">
                <Stack.Screen name="Cadavre" component={Cadavre} />
            </Stack.Navigator>
        </View>
    )
}