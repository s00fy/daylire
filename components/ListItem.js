import { View, Text, Image } from 'react-native';
import { Link } from '@react-navigation/native';

export default function ListItem() {
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Image source={require('../assets/images/background-image.png')} />
                <Text>12</Text>
            </View>
            <Text>Cadavre exquis titre</Text>
            <Text>Par bchaulet@mail.com</Text>
            <Text>Première contribution du cadavre exquis</Text>
            <Link to={{screen: 'Cadavre', params: { id: 100 }}}>
                Découvrir le cadavre exquis →
            </Link>
        </View>
    )
}