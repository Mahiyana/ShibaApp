import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
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
          title="Let's shop!"
          onPress={() => this.props.navigation.navigate('Buy')}
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
