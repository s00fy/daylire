import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadavreList from './components/CadavreList';
import HomeScreen from './components/Home';
import Cadavre from './components/Cadavre';
import CadavreDetails from './components/CadavreDetails';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Découvrir le cadavre exquis"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialRouteName="Home" options={{ title: 'Overview' }}>
        <Stack.Screen
          options={{
            title: 'Daylire',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        name="Daylire" component={CadavreList} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Cadavre" component={Cadavre} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}