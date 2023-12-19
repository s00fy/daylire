import { View, Text } from 'react-native';
import ListItem from './ListItem';

export default function List() {

    /* const Item = ListItem.map((Item, index) =>{
        return (
          <Item key={index} />
        );    
    }); */

    return(
        <View>
            <ListItem />
        </View>
    )
}