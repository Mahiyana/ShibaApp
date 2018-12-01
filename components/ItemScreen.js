import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
        <Text>{item.description}</Text>
        <Button
          title="Add to cart"
          onPress={() => this.props.navigation.navigate('Home')}
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

