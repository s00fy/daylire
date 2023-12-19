import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import CadavreDetails from './CadavreDetails';
import Header from './Header';

export default function CadavreList({ navigation }) {
    return (
        <View style={styles.detailsScreenContainer} >
            <Header />
            <CadavreDetails />
        </View>
    );
}
const styles = StyleSheet.create({
    detailsScreenContainer: {
       flex:1,
    }
})