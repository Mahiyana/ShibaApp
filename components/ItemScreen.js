import React, { Component } from 'react';
import { Alert, Button, View, Text, AsyncStorage } from 'react-native';
import {createStackNavigator, NavigationEvents} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'

class ItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Item',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };

  constructor(props){
    super(props);
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    const navigation = this.props.navigation.dangerouslyGetParent();
    const items = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.forceUpdate();
  }

  render() {
    const navigation = this.props.navigation.dangerouslyGetParent();
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.item = item;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{item.name}</Text>
        <Text>{item.price}$</Text>
        <Text>{item.description}</Text>
        <Button
          onPress={ async () => {
            let cart = [];
            try {
                cart = await AsyncStorage.getItem('cart') || [];
                cart = JSON.parse(cart);
                var itemIndex = cart.findIndex(x => x.name==item.name);
                if (itemIndex == -1){
                  cart.push({"name": item.name, "price": item.price, "description": item.description, "howmany": 1});
                } else {
                  cart[itemIndex].howmany = parseInt(cart[itemIndex].howmany) + 1;
                }
                try {
                    await AsyncStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {
                    //console.log("Saving data error");
                    //console.log(error.message);
                }            
            } catch (error) {
                //console.log("Loading data error");
                //console.log(error.message);
                cart = [{"name": item.name, "price": item.price, "description": item.description, "howmany": 1}];
                try {
                    await AsyncStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {
                    //console.log("Saving data error");
                    //console.log(error.message);
                }

            }
            Alert.alert(
            'Awesome choice!',
            'Product added to the cart. Continue shopping or go to the cart?',
            [
              {text: 'Continue shopping', onPress: () => null},
              {text: 'Go to the cart', onPress: () => this.props.navigation.navigate('Cart')},
            ], {}
          );
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

