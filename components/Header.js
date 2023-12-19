import { View, Text, StyleSheet } from 'react-native';


export default function Header() {
    return (
        <ScrollView style={{ flexGrow: 1, margin:0,}}>
          <Header />
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text>Daylire</Text>
            <Image alt='like' source={'../assets/images/background-image.png'} />
            <Pressable style={styles.button} onPress={() => navigation.navigate('CadavreList')}>
              <Text style={styles.text}>Découvrir le cadavre exquis →</Text>
            </Pressable>
          </ImageBackground>
        </ScrollView>
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