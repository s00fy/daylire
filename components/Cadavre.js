import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import React, { useState, useEffect } from 'react';

export default function Cadavre({navigation, route }) {
    const [cadavreData, setCadavreData] = useState(null);
    const { cadavre_id } = route.params;
    useEffect(() => {
        fetch(`https://jbienvenu.alwaysdata.net/loufok/api/cadavre/${cadavre_id.id}`)
            .then((response) => response.json())
            .then((responseData) => {
                setCadavreData(responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [cadavre_id]);

    const renderCadavre = () => {
        if (cadavreData) {
            return (
                <View>
                    <Text>{cadavreData.titre_cadavre}</Text>
                    <Text>{cadavreData.adr_admin}</Text>
                    <Text>{cadavreData.date_fin_cadavre}</Text>
                    <Text>{cadavreData.date_debut_cadavre}</Text>
                    <Text>{cadavreData.contributions}</Text>
                    <Text>{cadavreData.navigation}</Text>
                    <Text>{cadavreData.joueurs}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Nous n'arrivons pas à charger le cadavre exquis, veuillez nous excusez de la gêne occasionnée.</Text>
                </View>
            );
        }
    };

    return(
        <View style={{ flex: 1, }}>
            <Header />
            <ScrollView style={styles.CadavreContainer}>
                <Text style={styles.CadavreTitle}>{cadavreData.titre_cadavre}</Text>
                <Text style={styles.CadavreAdmin}>{cadavreData.adr_admin}</Text>
                <Text style={styles.CadavreDate}>{cadavreData.date_fin_cadavre}</Text>
                <Text style={styles.CadavreDate}>{cadavreData.date_debut_cadavre}</Text>
                <Text style={styles.CadavreContribs}>{cadavreData.contributions}</Text>
                <Text style={styles.CadavreAuthors}>{cadavreData.joueurs}</Text>
                <Text>NOUVEAU CADAVRE EXQUIS</Text>
            <Text>Première contribution du cadavre exquis</Text>
            {renderCadavre()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    CadavreContainer: {

    },
    CadavreTitle: {

    },
    CadavreAdmin: {

    },
    CadavreDate: {

    },
    CadavreContribs: {

    },
    CadavreAuthors: {

    },
});