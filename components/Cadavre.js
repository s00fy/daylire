import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, Pressable } from 'react-native';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useFonts, Kurale_400Regular } from '@expo-google-fonts/kurale';
import * as SplashScreen from 'expo-splash-screen';
import heartEmpty from '../assets/images/heart_empty.png';

const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const addLike = () => {

};
export default function Cadavre({navigation, route }) {
    const [cadavreData, setCadavreData] = useState(null);
    const { cadavre_id } = route.params;
    const [loaded] = useFonts({
        Kurale_400Regular,
      });
    
      useEffect(() => {
        async function hideSplashScreen() {
          if (loaded) {
            await SplashScreen.hideAsync();
          }
        }
        hideSplashScreen();
        fetch(`https://jbienvenu.alwaysdata.net/loufok/api/cadavre/${cadavre_id.id}`)
            .then((response) => response.json())
            .then((responseData) => {
                setCadavreData(responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [cadavre_id, loaded]);

    const cadavreLike= () =>{
        if (cadavreData) {
            return cadavreData.nb_jaime;
        }
    }

    const renderCadavre = () => {
        if (cadavreData) {
            const joueursList = cadavreData.joueurs;
            const lastItem = joueursList.pop(); // Remove and get the last item
    
            const formattedJoueurs = joueursList.join(", ") + (joueursList.length > 0 ? ` et ${lastItem}` : lastItem);
    
    
            return (
                <View style={styles.cadavreDisplay}>
                    <Text style={styles.CadavreTitle}>{cadavreData.titre_cadavre}</Text>
                    <View style={styles.cadavreParams}>
                        <Text style={styles.CadavreAdmin}>Par {cadavreData.adr_admin}</Text>
                        <Text style={styles.CadavreDate}>Du {formatDate(cadavreData.date_debut_cadavre)} au {formatDate(cadavreData.date_fin_cadavre)}</Text>
                        <Text style={styles.CadavreNbContributions}>Nombre de contributions : {cadavreData.nb_contributions}</Text>
                    </View>
                    <Text style={styles.CadavreContribs}>{cadavreData.contributions}</Text>
                    <Text style={styles.CadavreAuthors}> Merci aux auteurs : {formattedJoueurs}</Text>
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
        <ScrollView style={styles.CadavreContainer}>
            <View style={styles.CadavreHeader}>
                <Header />
                <Pressable style={styles.CadavreLike} onPress={() => addLike()}>
                    <Text style={styles.CadavreLikeNumber} >{cadavreLike()}</Text>
                    <Image style={styles.CadavreLikeIcon} source={heartEmpty} resizeMode="contain" />
                </Pressable>
            </View>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                {renderCadavre()}
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    CadavreHeader:{
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        marginEnd:25,
        marginEnd:25,
    },
    CadavreLike: {
        marginTop: 50,
        height:50,
        width:50,
        display:'flex',
        gap:15,
        flexDirection:'row',
        width:50,
        justifyContent:'space-around',
    },    
    CadavreLikeNumber: {
        color:'#1A98C0',
    },
    CadavreLikeIcon: {
    },
    CadavreContainer: {

    },
    cadavreParams: {
        fontFamily: 'Kurale_400Regular',
        paddingStart:10,
    },
    CadavreTitle: {
        padding:16,
        paddingLeft:0,
        paddingBottom:10,
        fontSize:32,
        fontFamily: 'Kurale_400Regular',

    },
    CadavreAdmin: {
        fontSize:14,
        color:'#1A98C0',
        fontFamily: 'Kurale_400Regular',

    },
    CadavreDate: {
        color:'#1A98C0',
        fontFamily: 'Kurale_400Regular',

    },
    CadavreNbContributions: {
        color:'#1A98C0',
        fontFamily: 'Kurale_400Regular',
        paddingBottom:20,
    },
    CadavreContribs: {
        fontSize:18,
        fontFamily: 'Kurale_400Regular',

    },
    CadavreAuthors: {
        paddingTop: 20,
        color: '#1A98C0',
        fontFamily: 'Kurale_400Regular',
    },
    cadavreDisplay: {
        backgroundColor: '#FFF3D6',
        padding: 15,
        paddingLeft: 20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        margin:25,
        marginLeft:0,
    },
    image: {
        opacity: 1,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
      }
});