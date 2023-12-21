import { View, StyleSheet } from 'react-native';
import CadavreDetails from './CadavreDetails';
import Header from './Header';

export default function CadavreList({ navigation }) {
    return (
        <View style={styles.detailsScreenContainer} >
            <Header />
            <CadavreDetails navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    detailsScreenContainer: {
       flex:1,
       backgroundColor:'black',
       marginBottom:15,
    }
})