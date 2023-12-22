import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import heartEmpty from '../assets/images/heart_empty.png';
import FilterBar from './FilterBar';

//change date format
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

//Display item infos 
const Item = ({ id, title, date_debut_cadavre, navigation, date_fin_cadavre, contrib, nb_jaime }) => (
    <View style={styles.item}>
        <View style={styles.likeContainer}>
          <Text style={styles.like}>{nb_jaime}</Text>
          <Image style={styles.likeIcon} source={heartEmpty} resizeMode="contain" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date_debut_cadavre}>Du {formatDate(date_debut_cadavre)} au {formatDate(date_fin_cadavre)}</Text>
        <Text style={styles.contribution}>{contrib}</Text>
        <Pressable style={styles.button}
          onPress={() =>
            navigation.navigate('Cadavre', {cadavre_id: {id}})
          }>
            <Text style={styles.buttonText}>Lire le cadavre exquis →</Text>
        </Pressable>
    </View>
  );

  export default function CadavreDetails({ navigation }) {

      const [data, setData] = useState([]);
      const [filteredData, setFilteredData] = useState([]); //data ordered by likes, dates, alphabet
      const [filter, setFilter] = useState('likes');
      const [stillLoading, setStillLoading] = useState(true);; // Track whether data has been loaded
      // Function to filter cadavres based on criterias
      const handleFilter = (criteria) => {
        setFilter(criteria);
        let sortedData = [...data];

    // likes, date and alphabet
    if (criteria === 'likes') {
      sortedData.sort((a, b) => b.nb_jaime - a.nb_jaime);  
    } else if (criteria === 'date') {
      sortedData.sort((a, b) => new Date(b.date_fin_cadavre) - new Date(a.date_fin_cadavre));
    } else if (criteria === 'alphabetical') {
      sortedData.sort((a, b) => a.titre_cadavre.localeCompare(b.titre_cadavre)); 
    }

    setFilteredData(sortedData);
  };
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://jbienvenu.alwaysdata.net/loufok/api/cadavres');
          const responseData = await response.json();
    
          // Set data and mark as loaded
          setData(responseData);
          setStillLoading(false);
    
          // Filter cadavres
          let sortedData = [...responseData];
          if (filter === 'likes') {
            sortedData.sort((a, b) => b.nb_jaime - a.nb_jaime);
          } else if (filter === 'date') {
            sortedData.sort((a, b) => new Date(b.date_fin_cadavre) - new Date(a.date_fin_cadavre));
          } else if (filter === 'alphabetical') {
            sortedData.sort((a, b) => a.titre_cadavre.localeCompare(b.titre_cadavre));
          }
    
          setFilteredData(sortedData);
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, [filter]);

  //render Item thx to const Item
  const renderItem = ({ item }) => (
    <Item
      key={item.id_cadavre}
      id={item.id_cadavre}
      title={item.titre_cadavre}
      nb_jaime={item.nb_jaime}
      date_fin_cadavre={item.date_fin_cadavre}
      date_debut_cadavre={item.date_debut_cadavre}
      contrib={item.contribution}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.cadavreComponent}>
      <FilterBar handleFilter={handleFilter} activeFilter={filter} />
      <SafeAreaView style={styles.container}>
        {stillLoading ? (
            <Text>Loading ...</Text>
        ) : (
          <FlatList
            style={styles.list}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_cadavre}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom:50,
    marginBottom:50,
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
    color:'#16A2CC',
  },
  item: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    paddingLeft: 20,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    margin:25,
    marginLeft:0,
  },
  cadavreComponent:{
    marginBottom: 200,    
  },
  header: {
    fontSize: 32,
    backgroundColor: '#EBEBEB',
  },
  title: {
    fontSize: 24,
    padding:10,
    paddingLeft:0,
    color: '#EBEBEB',
    fontFamily: 'Kurale_400Regular',
  },
  date_debut_cadavre: {
    fontSize: 16,
    paddingBottom: 15,
    color: '#A3B8B5',
    fontFamily: 'Kurale_400Regular',
  },
  contribution: {
    fontSize: 16,
    color: '#EBEBEB',
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
  likeContainer: {
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    gap: 5,
  },
  like: {
    color: '#16A2CC',
  }, 
  likeIcon: {

  }, 
});