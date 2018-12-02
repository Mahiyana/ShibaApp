import React, { Component } from 'react';
import { AsyncStorage, Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class CartScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Shopping Cart',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Item</Text>
        <Text>Item</Text>
        <Text>Item</Text>
        <Button
          onPress={ async () => {
            let cart = [];
            try {
                cart = await AsyncStorage.getItem('cart') || [];
                console.log("WHAT'S IN THE CART? THIS:");
                console.log(cart);
            } catch (error) {
                console.log("Loading data error");
                console.log(error.message);
            }   
          }}
          title="See it"
        />
      </View>
    );
  }
}

export default createStackNavigator({ CartScreen }, {
    navigationOptions: {
        drawerLabel: () => "Shopping Cart"
    }
});
