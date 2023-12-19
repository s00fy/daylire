import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, Pressable } from 'react-native';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useFonts, Kurale_400Regular } from '@expo-google-fonts/kurale';
import * as SplashScreen from 'expo-splash-screen';
import heartEmpty from '../assets/images/heart_empty.png';

//background img url
const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

//change date format from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

//component
export default function Cadavre({navigation, route }) {

    //function to add a like with the API, it also needs to update the localstorage
    const addLike = async () => {
        if (cadavreData) {
            try {
                const response = await fetch(`https://jbienvenu.alwaysdata.net/loufok/api/cadavre/like`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cadavre_id: cadavreData.id }), // Assuming 'id' is the identifier of your cadavre
                });

                if (response.ok) {
                    // Assuming the API returns updated cadavre data after adding a like
                    const updatedCadavre = await response.json();
                    setCadavreData(updatedCadavre);
                } else {
                    console.error('Failed to add like');
                    // Handle error scenarios here
                }
            } catch (error) {
                console.error('Error adding like:', error);
                // Handle network errors or exceptions here
            }
        }
    };

    //const 
    const [cadavreData, setCadavreData] = useState(null);
    const { cadavre_id } = route.params;
    const [loaded] = useFonts({
        Kurale_400Regular,
      });
    
      //fetch and get the font
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

    //return the number of likes
    const cadavreLike= () =>{
        if (cadavreData) {
            return cadavreData.nb_jaime;
        }
    }

    //display cadavre infos
    const renderCadavre = () => {
        if (cadavreData) {
            //formatting the 'joueurs' field
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
                    <View>
                        {cadavreData.contributions.map((contribution, index) => (
                            <Text key={index} style={styles.CadavreContribs}>
                            {contribution}
                            </Text>
                        ))}
                    </View>
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

    //comp result
    return(
        <ScrollView style={styles.CadavreContainer}>
            <Header />
            <View style={styles.CadavreHeader}>
                <Pressable style={styles.CadavreBack}
                    onPress={() =>
                        navigation.goBack()
                    }>
                    <Text style={styles.CadavreBackText}> ← Retour </Text>
                </Pressable>
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
        marginStart:10,
    },
    CadavreLike: {
        marginVertical: 10,
        marginEnd: 3,
        height:50,
        width:70,
        display:'flex',
        gap:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    CadavreBack: {

    },
    CadavreBackText: {
        fontFamily: 'Kurale_400Regular',
        fontSize: 20,
        textShadowColor:'#1A98C0',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color:'#1A98C0',
    },
    CadavreLikeNumber: {
        fontSize:18,
        textShadowColor:'#1A98C0',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
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
        paddingVertical: 25,
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
        marginBottom:100,
    },
    image: {
        opacity: 1,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
      }
});