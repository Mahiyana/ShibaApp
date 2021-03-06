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
      cartItems = JSON.parse(response);
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
        <View>
          <ActivityIndicator/>
        </View>
      )
    }
    if(this.state.cartItems && Object.keys(this.state.cartItems).length != 0){
    var titledItems = [];
    this.state.cartItems.map((item,i) => {
        var tempItem = item;
        if (parseInt(item.howmany) == 1){
          tempItem.title = item.name;
        } else {
          tempItem.title = item.name + " x" + item.howmany;
        }
        tempItem.price = tempItem.price + '$'
        titledItems.push(tempItem);
      })
    return(
      <View style={{flexDirection: 'column',flex: 1}}>
      <ScrollView>
        <List>
          {
            titledItems.map((item, i) => (
              <ListItem
                key={i}
                title={item.title} 
                subtitle={item.price}
                rightIcon={<Icon name={'delete'} size={20}/>}
                onPress={() => {
                  Alert.alert(
                    'Delete Item?',
                    'This action will delete ' + item.name + '. Are you sure you want to do this?',
                    [
                      {text: 'Cancel', onPress: () => null, style: 'cancel'},
                      {text: 'Delete it', onPress: async () => {
                        AsyncStorage.getItem('cart').then((cart) => {
                          cart = JSON.parse(cart);
                          var index =  cart.findIndex(i => i.name === item.name);
                          cart.splice(index,1);
                          AsyncStorage.setItem('cart', JSON.stringify(cart)).then(() => {
                            this.state.cartItems = cart;
                            this.forceUpdate();
                          });
                        });
                      }},
                    ], {}
                  ); 
                }}
              />
            ))
          }
        </List>

      </ScrollView>
      <View style={[{ width: "95%", margin: 10}]}> 
      <Button
        onPress={() => {
          Alert.alert(
            'Cart cleaning',
            'This action will delete all amazing stuff you collected in your cart. Are you sure you want to do this?',
            [
              {text: 'Cancel', onPress: () => null, style: 'cancel'},
              {text: 'Delete them', onPress: async () => {
                AsyncStorage.removeItem('cart').then(() => {
                  this.state.cartItems = null;
                  this.forceUpdate();
                });
              }},
            ], {}
          );  
        }}
        title="Clear cart"
        color="#87CEEB"
      />    
      </View>
      <View style={[{ width: "95%", margin: 10}]}> 
       <Button
        onPress={() => {
           this.props.navigation.navigate('Form')
        }}
        title="Buy it all!"
      />    
      </View>
      </View>
    );
  }
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 25, textAlign: 'center'}}>Your shopping cart is empty - go fetch some awesome merch to make it full!</Text>
    </View>
  );
  }
}

export default CartScreen;
