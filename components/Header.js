import { View, Text, StyleSheet, Image } from 'react-native';
import { useCallback } from 'react';
import { useFonts, RougeScript_400Regular } from '@expo-google-fonts/rouge-script';
import * as SplashScreen from 'expo-splash-screen';

export default function Header() {

  const [loaded] = useFonts({
    RougeScript_400Regular,
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

    return (
      <View style={styles.headerContainer} onLayout={onLayoutRootView}>
        <Text style={styles.headerTitle}>Daylire</Text>
        <Image style={styles.headerImage} source={require('../assets/whiteicon.png')}></Image>
      </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 12,
        marginTop: 50,
        flexDirection:'row',
        gap:16,
        alignItems:'center',
      },
      headerTitle: {
      color:'#fff',
      fontFamily: 'RougeScript_400Regular',
      textShadowColor: '#fff',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      fontSize: 62,
    },
    headerImage:{
      height: 46,
      width: 60,
    },
})