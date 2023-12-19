import { View, Text } from 'react-native';
import Header from './Header';

export default function Cadavre({navigation}) {
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Cadavre exquis titre</Text>
            <Text>NOUVEAU CADAVRE EXQUIS</Text>
            <Text>Première contribution du cadavre exquis</Text>
        </View>
    )
}