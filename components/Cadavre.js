import { View, Text } from 'react-native';
import Header from './Header';
import React, { useState, useEffect } from 'react';

export default function Cadavre({navigation, route }) {
    const [data, setData] = useState([]);
    const { cadavre_id } = route.params;
    console.log(navigation);
    console.log(route);
  
    useEffect(() => {
        fetch('https://jbienvenu.alwaysdata.net/loufok/api/cadavre/${cadavre_id}')
        .then((response) => response.json())
        .then((responseData) => {
            setData(responseData);
            console.log(responseData);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [cadavre_id]);

    const renderCadavre = ({ cadavre }) => (
        <Cadavre
          title={cadavre.titre_cadavre}
          date_fin_cadavre={cadavre.date_fin_cadavre}
          date_debut_cadavre={cadavre.date_debut_cadavre}
          contrib={cadavre.contribution}
          navigation={navigation}
        />
      );
      console.log('AHFOJISDOIJREHIHGRIHGRHOGRHOIGROIHGROJIRGOJIGROJI');

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Header />
            <Text
            renderItem={renderItem}></Text>
            <Text>Cadavre exquis titre</Text>
            <Text>NOUVEAU CADAVRE EXQUIS</Text>
            <Text>Première contribution du cadavre exquis</Text>
        </View>
    )
}