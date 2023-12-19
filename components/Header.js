import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
      <View style={styles.headerContainer} >
        <Text style={styles.headerTitle}>Daylire</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 12,
        marginTop: 50,
    },
    headerTitle: {
        fontSize: 42,
    },
})