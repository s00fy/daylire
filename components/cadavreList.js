import { View, ScrollView, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import CadavreDetails from './CadavreDetails';

export default function CadavreList({ navigation }) {
    return (
        <View style={styles.detailsScreenContainer} >
            <CadavreDetails />
        </View>
    );
}
const styles = StyleSheet.create({
    detailsScreenContainer: {
        flexGrow: 1,
    } 
})