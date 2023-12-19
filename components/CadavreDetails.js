import React, { useState, useEffect } from 'react';
import { Button, Text, View, Pressable, StyleSheet, SafeAreaView, FlatList, ImageBackground, Image } from 'react-native';
import Cadavre from './Cadavre';

const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const Item = ({ id, title, date_debut_cadavre, navigation, date_fin_cadavre, contrib }) => (

    <View style={styles.item}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date_debut_cadavre}>Du {formatDate(date_debut_cadavre)} au {formatDate(date_fin_cadavre)}</Text>
        <Text style={styles.contribution}>{contrib}</Text>
        <Button
          title="Découvrir le cadavre exquis →"
          onPress={() => navigation.navigate('Cadavre', {cadavre_id: {id} })}
        />
        <Pressable style={styles.button}
          onPress={() =>
            navigation.navigate('Cadavre', {
              cadavre_id: {id}, // Assuming item.id holds the cadavre_id
            })
          }>
            <Text style={styles.buttonText}>Découvrir le cadavre exquis →</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );

export default function CadavreDetails({ navigation }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('https://jbienvenu.alwaysdata.net/loufok/api/cadavres')
      .then((response) => response.json())
      .then((responseData) => {
          setData(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <Item
      id={item.id_cadavre}
      title={item.titre_cadavre}
      date_fin_cadavre={item.date_fin_cadavre}
      date_debut_cadavre={item.date_debut_cadavre}
      contrib={item.contribution}
      navigation={navigation}
    />
  );

  return (
      <View style={styles.cadavreHeader}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSecond: {
    backgroundColor: 'none',
    color: '#1e1e1e',
  },
  button: {
    padding: 15,
    paddingLeft: 0,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color:'#1A98C0',
  },
  item: {
    backgroundColor: '#FFF3D6',
    padding: 15,
    paddingLeft: 20,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    margin:25,
    marginLeft:0,
  },
  cadavreHeader:{
    marginBottom: 200,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    padding:10,
    paddingLeft:0,
  },
  date_debut_cadavre: {
    fontSize: 16,
    paddingBottom: 15,
    fontStyle: 'italic',
    color: '#333',
  },
  contribution: {
    fontSize: 16,
    color: '#666',
    padding: 15,
    paddingBottom: 20,
    paddingLeft: 0,
  },
  image: {
    opacity: 0.5,
    padding: 24, 
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    marginLeft: -20,
    marginTop: -15,
    marginRight: -14, 
    marginBottom: -15, 
  }
});