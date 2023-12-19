import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImageViewer from './components/ImageViewer';
import List from './components/List';
//import Button from './components/Button';
import ButtonTouchable from './components/ButtonTouchable';
//import DetailsScreen from './components/DetailsScreen';



function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Daylire Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  console.log(HomeScreen);
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} />
        </View>
        <View style={styles.footerContainer}>
          <ButtonTouchable label="Touchez" />
        </View>
        <Stack.Navigator>
        <Stack.Screen name="Daylire" component={HomeScreen} />
      </Stack.Navigator>
        <Text style={styles.textColor}>C'est Daylirre ici ouuuu</Text>
        <StatusBar style="auto" />
      </View>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  textColor: {
    backgroundColor:"#fff",
    color: '#fff',
  },
});
