import { Text, View, Pressable, StyleSheet, Image, ImageBackground } from 'react-native';

const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text>Daylire</Text>
        <Image alt='like' source={'../assets/images/background-image.png'} />
        <Pressable style={styles.button} onPress={() => navigation.navigate('CadavreList')}>
          <Text style={styles.text}>Découvrir le cadavre exquis →</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSecond: {
    backgroundColor: 'none',
    color: '#1e1e1e',
  },
  button: {
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color:'#1A98C0',
  },
});