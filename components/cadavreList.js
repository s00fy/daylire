import { View, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import CadavreDetails from './CadavreDetails';
import Header from './Header';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Kurale_400Regular } from '@expo-google-fonts/kurale';
  
export default function CadavreList({ navigation }) {
    const [loaded] = useFonts({
        Kurale_400Regular,
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
        <View style={styles.detailsScreenContainer} onLayout={onLayoutRootView}>
            <Header />
            <CadavreDetails navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    detailsScreenContainer: {
       flex:1,
       backgroundColor:'black',
    }
})