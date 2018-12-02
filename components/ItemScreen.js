import React, { Component } from 'react';
import { Alert, Button, View, Text, AsyncStorage } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'

class ItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Item',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  render() {
    const navigation = this.props.navigation.dangerouslyGetParent();
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.item = item;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
        <Text>{item.description}</Text>
        <Button
          onPress={ async () => {
            let cart = [];
            try {
                cart = await AsyncStorage.getItem('cart') || [];
                cart = JSON.parse(cart);
                cart.push({"name": item.name, "price": item.price, "description": item.description, "howmany": 1});
                try {
                    await AsyncStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {
                    console.log("Saving data error");
                    console.log(error.message);
                }            
            } catch (error) {
                console.log("Loading data error");
                console.log(error.message);
            }
            Alert.alert('Product added to cart!');
          }}
          title="Buy"
        />        
     </View>
    );
  }
}

export default createStackNavigator({ ItemScreen }, {
    navigationOptions: {
        drawerLabel: () => null
    }
});

