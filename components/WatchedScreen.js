import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class WatchedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Watched',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Watched Item</Text>
        <Text>Watched Item</Text>
        <Text>Watched Item</Text>
      </View>
    );
  }
}

export default createStackNavigator({ WatchedScreen }, {
    navigationOptions: {
        drawerLabel: () => "Watched"
    }
});
