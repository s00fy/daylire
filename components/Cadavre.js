import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Kurale_400Regular } from '@expo-google-fonts/kurale';
import * as SplashScreen from 'expo-splash-screen';
import heartEmpty from '../assets/images/heart_empty.png';
import heartFull from '../assets/images/heart_full.png';
import * as Font from 'expo-font';

// Inside your component
const loadFonts = async () => {
  await Font.loadAsync({
    Kurale_400Regular: require('@expo-google-fonts/kurale'),
    // Add other fonts if needed
  });
};

//change date format from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

//component
export default function Cadavre({navigation, route }) {

    //function to add a like with the API, it also needs to update the localstorage
    const addLike = async () => {;

        cadavreAlreadyLiked = await AsyncStorage.getItem(cadavre_id.id.toString());

        if(!cadavreAlreadyLiked) {
            if (cadavreData) {
                try {
                    loadFonts();
                    const response = await fetch(`https://jbienvenu.alwaysdata.net/loufok/api/cadavre/like`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idCadavre: cadavreData.id_cadavre }), // Assuming 'id' is the identifier of your cadavre
                    });

                    if (response.ok) {
                        // Assuming the API returns updated cadavre data after adding a like

                        AsyncStorage.setItem(
                            cadavre_id.id.toString(),
                            'true',
                        );

                        cadavreData.nb_jaime++;
                        cadavreLike();

                        setIsLiked(true);
                        console.log(isLiked);

                        // setCadavreData(updatedCadavre);
                    } else {
                        console.error('Failed to add like');
                        // Handle error scenarios here
                    }

                } catch (error) {
                    console.error('Error adding like:', error);
                    // Handle network errors or exceptions here
                }
            }
            setIsLiked(true);
            console.log(isLiked);
        }

    };

    

    //const 
    const [cadavreData, setCadavreData] = useState(null);
    const { cadavre_id } = route.params;
    const [loaded] = useFonts({
        Kurale_400Regular,
      });

    const [isLiked, setIsLiked] = useState(false);


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
            //get the number of contributions
            const contributionsLength = cadavreData.contributions.length;
            //formatting the 'joueurs' field
            const joueursList = cadavreData.joueurs;
            const lastItem = joueursList.pop(); // Remove and get the last item
            const formattedPlayers = joueursList.join(", ") + (joueursList.length > 0 ? ` et ${lastItem}` : lastItem);
            return (
                <View style={styles.cadavreDisplay}>
                    <Text style={styles.CadavreTitle}>{cadavreData.titre_cadavre}</Text>
                    <View style={styles.cadavreParams}>
                        <Text style={styles.CadavreAdmin}>Par {cadavreData.adr_admin}</Text>
                        <Text style={styles.CadavreDate}>Du {formatDate(cadavreData.date_debut_cadavre)} au {formatDate(cadavreData.date_fin_cadavre)}</Text>
                        <Text style={styles.CadavreNbContributions}>Nombre de contributions : {contributionsLength} </Text>
                    </View>
                    <View>
                        {cadavreData.contributions.map((contribution, index) => (
                            <Text key={index} style={styles.CadavreContribs}>
                            {contribution}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.CadavreAuthors}> Merci aux auteurs : {formattedPlayers}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
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
                <Pressable style={styles.CadavreLike} onPress={() => addLike()} disabled={isLiked}>
                    <Text style={styles.CadavreLikeNumber} >{cadavreLike()}</Text>
                    <Image style={styles.CadavreLikeIcon} source={ isLiked ? heartFull : heartEmpty} resizeMode="contain" />
                </Pressable>
            </View>
            {renderCadavre()}
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
        textShadowColor:'#16A2CC',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color:'#16A2CC',
    },
    CadavreLikeNumber: {
        fontSize:18,
        textShadowColor:'#16A2CC',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color:'#16A2CC',
    },
    CadavreLikeIcon: {
    },
    CadavreContainer: {
        backgroundColor:'black',
    },
    cadavreParams: {
        fontFamily: 'Kurale_400Regular',
        paddingStart:10,
    },
    CadavreTitle: {
        padding:16,
        color: '#EBEBEB',
        paddingLeft:0,
        paddingBottom:10,
        fontSize:32,
        fontFamily: 'Kurale_400Regular',

    },
    CadavreAdmin: {
        color: '#A3B8B5',
        fontSize:14,
        fontFamily: 'Kurale_400Regular',

    },
    CadavreDate: {
        color: '#A3B8B5',
        fontFamily: 'Kurale_400Regular',

    },
    CadavreNbContributions: {
        color:'#16A2CC',
        fontFamily: 'Kurale_400Regular',
        paddingBottom:20,
    },
    CadavreContribs: {
        fontSize:18,
        color:'#EBEBEB',
        fontFamily: 'Kurale_400Regular',

    },
    CadavreAuthors: {
        paddingVertical: 25,
        color: '#16A2CC',
        fontFamily: 'Kurale_400Regular',
    },
    cadavreDisplay: {
        backgroundColor: '#1E1E1E',
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
