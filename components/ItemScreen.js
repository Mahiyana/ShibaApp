import React, { Component } from 'react';
import { Alert, Button, View, Text, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
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
    this.state ={ isLoading: true, buttonTitle: 'Default', buttonColor: 'blue'}
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    console.log("LOAD");
    const navigation = this.props.navigation.dangerouslyGetParent();
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return watched = (AsyncStorage.getItem('watched') || [])
    .then((response) => {
      if (response && item.name in JSON.parse(response)){
        this.setState({
          isLoading: false,
          buttonTitle: 'Delete',
          buttonColor: 'grey'
        })
      } else {
       this.setState({
          isLoading: false,
          buttonTitle: 'Add',
          buttonColor: 'blue'
        })
      }
    })
    .catch((error) =>{
      console.error(error);
    });
    this.forceUpdate();
  }

  componentDidMount(){
    const navigation = this.props.navigation.dangerouslyGetParent();
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return watched = (AsyncStorage.getItem('watched') || {})
    .then((response) => {
      if (response && item.name in JSON.parse(response)){
        this.setState({
          isLoading: false,
          buttonTitle: 'Delete',
          buttonColor: 'grey'
        })
      } else {
       this.setState({
          isLoading: false,
          buttonTitle: 'Add',
          buttonColor: 'blue'
        })
      }
    })
    .catch((error) =>{
      console.log("ERROR");
      console.error(error);
    });
    this.forceUpdate();
  }

  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }
    //console.log(this.state.buttonTitle);
    //console.log(this.state.buttonColor);
    const navigation = this.props.navigation.dangerouslyGetParent();
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.item = item;
    return (
      <View style={{flexDirection: 'column',flex: 1}}>
        <ScrollView>
        <Text>{item.name}</Text>
        <Text>{item.price}$</Text>
        <Text>{item.description}</Text>
        </ScrollView>
        <View style={[{ width: "95%", margin: 10, alignSelf: "flex-end"}]}>
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
                }            
            } catch (error) {
                cart = [{"name": item.name, "price": item.price, "description": item.description, "howmany": 1}];
                try {
                    await AsyncStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {
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

       <View style={[{ width: "95%", margin: 10}]}>
       <Button
          onPress={ async () => {
            let watched = {};
            try {
                watched = await AsyncStorage.getItem('watched') || {};
                watched = JSON.parse(watched);
                var watchedSaveKey = String(item.name);
                if (watchedSaveKey in watched){
                  delete watched[watchedSaveKey]; 
                } else {
                  watched[watchedSaveKey] = {"name": item.name, "price": item.price, "description": item.description};
                }
                try {
                    await AsyncStorage.setItem('watched', JSON.stringify(watched));
                } catch (error) {
                }            
            } catch (error) {
                var watchedSaveKey = String(item.name);
                watched = {}
                watched[watchedSaveKey] = {"name": item.name, "price": item.price, "description": item.description};
                //watched = { watchedSaveKey: {"name": item.name, "price": item.price, "description": item.description}};
                try {
                    await AsyncStorage.setItem('watched', JSON.stringify(watched));
                } catch (error) {
                }

            }
            this.forceUpdate(); //TODO it doesn't reload
          }}
          title={this.state.buttonTitle}
          color={this.state.buttonColor}
        />
        </View>

     </View>
    );
  }
}

export default createStackNavigator({ ItemScreen }, {
    navigationOptions: {
        drawerLabel: () => null
    }
});

