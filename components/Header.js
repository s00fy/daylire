import { View, Text, StyleSheet } from 'react-native';
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
      </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 12,
        marginTop: 50,
    },
    headerTitle: {
      fontFamily: 'RougeScript_400Regular',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      fontSize: 42,
    },
})