import { Text, View, Pressable, StyleSheet, SafeAreaView, FlatList, ImageBackground } from 'react-native';

const image = {uri: 'https://ucarecdn.com/9514f9b1-3bf9-4b7c-b31d-9fb8cd6af8bf/'};

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Titre du cadavre exquis',
      author: 'bchaulet@mail.com',
      contrib: 'dsuhfoizejifenjfeoijvlonvvisdoj,vpidsncfiesqj,dpoej,',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Titre du cadavre exquis',
      author: 'bchaulet@mail.com',
      contrib: 'dsuhfoizejifenjfeoijvlonvvisdoj,vpidsncfiesqj,dpoej,',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Titre du cadavre exquis',
      author: 'bchaulet@mail.com',
      contrib: 'dsuhfoizejifenjfeoijvlonvvisdoj,vpidsncfiesqj,dpoej,',
    },
  ];
  
  const Item = ({ title, author, contrib }) => (
    <View style={styles.item}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>Par {author}</Text>
        <Text style={styles.contribution}>{contrib}</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('CadavreDetails')}>
            <Text style={styles.buttonText}>Découvrir le cadavre exquis →</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
export default function CadavreDetails({ navigation }) {
  return (
    <View style={styles.cadavreHeader}>
      <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => 
                    <Item
                        title={item.title}
                        author={item.author}
                        contrib={item.contrib}
                    />}
                    keyExtractor={item => item.id}
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
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color:'#1A98C0',
  },
  cadavreHeader: {
    alignItems: 'start',
    justifyContent: 'start',
    padding: 15,
    paddingLeft: 0,
    margin:25,
    marginLeft:0,
    
  },
  cadavreHeaderTitle: {
    fontSize: 28,
  },
  cadavreHeaderSubtitle: {
    fontSize: 16,
    paddingBottom:5,
  },
  cadavreHeaderContrib: {

  },
  item: {
    backgroundColor: '#FFF3D6',
    padding: 20,
    paddingLeft: 20,
    marginVertical: 8,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  author: {
    fontSize: 16,
    paddingBottom:5,
    fontStyle: 'italic',
    color: '#333', // Change this color as needed
  },
  contribution: {
    fontSize: 16,
    color: '#666', // Change this color as needed
  },
  image: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 24, // Adjust as needed
    borderRadius: 15,
    marginLeft: -24, // Negative margin to compensate for border-radius
    marginTop: -24, // Negative margin to compensate for border-radius
    marginRight: -24, 
    marginBottom: -24, 
  }
});