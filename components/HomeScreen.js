import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Home',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Me doin a welcome!</Text>
        <Button
          title="Let's shop!"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export default createStackNavigator({ HomeScreen });