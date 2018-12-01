import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import {createStackNavigator} from 'react-navigation';

class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
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


export default DetailsScreen;
