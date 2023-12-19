import { ScrollView, StyleSheet } from 'react-native';
import CadavreDetails from './CadavreDetails';
import Header from './Header';

export default function CadavreList({ navigation }) {
    return (
        <ScrollView style={styles.detailsScreenContainer} >
            <Header />
            <CadavreDetails navigation={navigation} />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    detailsScreenContainer: {
       flex:1,
    }
})