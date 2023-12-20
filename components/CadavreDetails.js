import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, SafeAreaView, FlatList, ImageBackground, Image } from 'react-native';
import { useFonts, Kurale_400Regular } from '@expo-google-fonts/kurale';
import * as SplashScreen from 'expo-splash-screen';
import heartEmpty from '../assets/images/heart_empty.png';

//const of bg img
const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

//change date format
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

//Display item infos 
const Item = ({ id, title, date_debut_cadavre, navigation, date_fin_cadavre, contrib, nb_jaime }) => (

    <View style={styles.item}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.likeContainer}>
          <Text style={styles.like}>{nb_jaime}</Text>
          <Image style={styles.likeIcon} source={heartEmpty} resizeMode="contain" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date_debut_cadavre}>Du {formatDate(date_debut_cadavre)} au {formatDate(date_fin_cadavre)}</Text>
        <Text style={styles.contribution}>{contrib}</Text>
        <Pressable style={styles.button}
          onPress={() =>
            navigation.navigate('Cadavre', {
              cadavre_id: {id}, // Assuming item.id holds the cadavre_id
            })
          }>
            <Text style={styles.buttonText}>Lire le cadavre exquis →</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );

    //component
    export default function CadavreDetails({ navigation }) {

      const [data, setData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
      const [filter, setFilter] = useState('likes');
      const [likeLloaded, setLikeLoaded] = useState(false); // Track whether data has been loaded
        
      // Function to filter cadavres based on criterias
      const handleFilter = (criteria) => {
        setFilter(criteria);
        let sortedData = [...data];

    // likes, date and alphabet
    if (criteria === 'likes') {
      sortedData.sort((a, b) => b.nb_jaime - a.nb_jaime); // Sort by likes (most to least)
    } else if (criteria === 'date') {
      sortedData.sort((a, b) => new Date(b.date_fin_cadavre) - new Date(a.date_fin_cadavre)); // Sort by date (most recent to oldest)
    } else if (criteria === 'alphabetical') {
      sortedData.sort((a, b) => a.titre_cadavre.localeCompare(b.titre_cadavre)); // Sort alphabetically
    }

    setFilteredData(sortedData);
  };

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
  
      fetch('https://jbienvenu.alwaysdata.net/loufok/api/cadavres')
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
          setLikeLoaded(true); // Set loaded to true after fetching data
        })
        .catch((error) => {
          console.error(error);
        });
    }, [loaded]);

  //render Item thx to const Item
  const renderItem = ({ item }) => (
    <Item
      id={item.id_cadavre}
      title={item.titre_cadavre}
      nb_jaime={item.nb_jaime}
      date_fin_cadavre={item.date_fin_cadavre}
      date_debut_cadavre={item.date_debut_cadavre}
      contrib={item.contribution}
      navigation={navigation}
    />
  );

  //comp return
  return (
    <View style={styles.cadavreHeader}>
      {/* Filter bar */}
      <View style={styles.filterBar}>
        <Pressable
          style={[styles.filterButton, filter === 'likes' && styles.activeFilter]}
          onPress={() => handleFilter('likes')}>
          <Text style={styles.filterButtonText}>Likes</Text>
        </Pressable>
        <Pressable
          style={[styles.filterButton, filter === 'date' && styles.activeFilter]}
          onPress={() => handleFilter('date')}>
          <Text style={styles.filterButtonText}>Date</Text>
        </Pressable>
        <Pressable
          style={[styles.filterButton, filter === 'alphabetical' && styles.activeFilter]}
          onPress={() => handleFilter('alphabetical')}>
          <Text style={styles.filterButtonText}>Alphabetical</Text>
        </Pressable>
      </View>
        {loaded ? (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )}
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
    fontFamily: 'Kurale_400Regular',
    fontSize: 16,
    lineHeight: 21,
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
    fontFamily: 'Kurale_400Regular',
  },
  date_debut_cadavre: {
    fontSize: 16,
    paddingBottom: 15,
    color: '#333',
    fontFamily: 'Kurale_400Regular',
  },
  contribution: {
    fontSize: 16,
    color: '#666',
    padding: 15,
    fontFamily: 'Kurale_400Regular',
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
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
  },
  activeFilter: {
    borderColor: '#1A98C0',
    borderWidth: 2,

  },
  filterButtonText: {
    color: '#1A98C0',
    fontFamily: 'Kurale_400Regular',
  },
  likeContainer: {
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    gap: 5,
  },
  like: {
    color: '#1A98C0',
  }, 
  likeIcon: {

  }, 
});