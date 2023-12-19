import { Text, View, Pressable, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import Header from './Header';
import CadavreList from './CadavreList';
const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

export default function HomeScreen({ navigation }) {
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