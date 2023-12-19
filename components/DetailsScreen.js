import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
    return (
      <View style={styles.detailsScreenContainer} >
        <Text style={styles.detailsScreen}>Details Screen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    detailsScreen: {
        color: '#fff',
        backgroundColor: 'black',
    },
    detailsScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    } 
})