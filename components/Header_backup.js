import { View, Text, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { useFonts, RougeScript_400Regular } from '@expo-google-fonts/rouge-script';
import * as SplashScreen from 'expo-splash-screen';

export default function Header() {
  console.log("la font est la ou quoiiii");

  const [loaded] = useFonts({
    RougeScript_400Regular,
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      console.log("la font est la ou quoiiii");
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log("pas de fonts");
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
      fontSize: 42,
    },
})