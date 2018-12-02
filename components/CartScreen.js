import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';


class CartScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Shopping Cart',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };


  constructor(props){
    super(props);
    this.state ={ isLoading: true}
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    return cart = (AsyncStorage.getItem('cart') || [])
    .then((response) => {
      this.setState({
        cartItems: JSON.parse(response),
      })
    })
    .catch((error) =>{
      console.error(error);
    });
    this.forceUpdate();
  }

  componentDidMount(){
  return cart = (AsyncStorage.getItem('cart') || [])
    .then((response) => {
      this.setState({
        isLoading: false,
        cartItems: JSON.parse(response),
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
    <ScrollView style={styles.container}>
      <List>
        {
          this.state.cartItems.map((item, i) => (
            <ListItem
              key={i}
              title={item.name}
              onPress={() => {
                Alert.alert(item.description);
              }}
            />
          ))
        }
      </List>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    flex: 1,
    padding: 20,
  }
})

export default createStackNavigator({ CartScreen }, {
    navigationOptions: {
        drawerLabel: () => "Shopping Cart"
    }
});
