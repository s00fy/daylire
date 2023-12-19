import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImageViewer from './components/ImageViewer';
import List from './components/List';
import Button from './components/Button';
import ButtonTouchable from './components/ButtonTouchable';
import DetailsScreen from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} />
        </View>
        <View style={styles.footerContainer}>
          <ButtonTouchable label="Touchez" />
        </View>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
        <Text style={{ color: '#fff' }}>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
