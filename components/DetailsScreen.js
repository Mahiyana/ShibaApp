import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Details',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Categories"
          onPress={() => this.props.navigation.navigate('Categories')}
        />
        <Button
          title="See item"
          onPress={() => this.props.navigation.navigate('Item')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}


export default createStackNavigator({ DetailsScreen });
