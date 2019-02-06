import React, { Component } from 'react';
import { Image, ImageBackground, Alert, Button, View, Text, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import {createStackNavigator, NavigationEvents} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements'

const IMAGES = {
  shiba_de_lux: require('./img/shiba_de_lux.jpg'),
  robo_shiba: require('./img/robo_shiba.jpg'),
  nice_comb: require('./img/nice_comb.jpg'),
  nicer_comb: require('./img/nicer_comb.jpg'),
}

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
    const navigation = this.props.navigation;
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return watched = (AsyncStorage.getItem('watched') || [])
    .then((response) => {
      if (response && item.name in JSON.parse(response)){
        this.setState({
          isLoading: false,
          buttonTitle: 'Delete from watched items',
          buttonColor: 'grey',
          watchedIcon: require('./img/full_heart.png'),
        })
      } else {
       this.setState({
          isLoading: false,
          buttonTitle: 'Add to watched items',
          buttonColor: 'blue',
          watchedIcon: require('./img/empty_heart.png'),
        })
      }
    })
    .catch((error) =>{
      console.error(error);
    });
    this.forceUpdate();
  }

  componentDidMount(){
    const navigation = this.props.navigation;
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return watched = (AsyncStorage.getItem('watched') || {})
    .then((response) => {
      if (response && item.name in JSON.parse(response)){
        this.setState({
          isLoading: false,
          buttonTitle: 'Delete from watched items',
          buttonColor: 'grey',
          watchedIcon: require('./img/full_heart.png'),
        })
      } else {
       this.setState({
          isLoading: false,
          buttonTitle: 'Add to watched items',
          buttonColor: 'blue',
          watchedIcon: require('./img/empty_heart.png'),
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
    const navigation = this.props.navigation;
    const item = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.item = item;
    return (
      <View style={{flexDirection: 'column',flex: 1}}>
        <ScrollView>
        <ImageBackground 
          source={IMAGES[item.img]}
          style={{width: 400, height: 400, margin:5, position: 'relative'}}
        >
          <TouchableOpacity 
            style={{position: 'absolute', top:10, right:10}}

          onPress={ async () => {
            let watched = {};
            var makeBlue = false;
            try {
                watched = await AsyncStorage.getItem('watched') || {};
                watched = JSON.parse(watched);
                var watchedSaveKey = String(item.name);
                if (watchedSaveKey in watched){
                  makeBlue = true;
                  delete watched[watchedSaveKey]; 
                } else {
                  makeBlue = false;
                  watched[watchedSaveKey] = {"name": item.name, "price": item.price, "description": item.description, "img": item.img};
                }
                try {
                    await AsyncStorage.setItem('watched', JSON.stringify(watched));
                } catch (error) {
                }            
            } catch (error) {
                var watchedSaveKey = String(item.name);
                watched = {}
                watched[watchedSaveKey] = {"name": item.name, "price": item.price, "description": item.description, "img":item.img};
                //watched = { watchedSaveKey: {"name": item.name, "price": item.price, "description": item.description}};
                try {
                    await AsyncStorage.setItem('watched', JSON.stringify(watched));
                } catch (error) {
                }

            }
            console.log("forceUpdate");
            if (makeBlue){
              this.setState({
                isLoading: false,
                buttonTitle: 'Add to watched items',
                buttonColor: 'blue',
                watchedIcon: require('./img/empty_heart.png'),
              })
 
            } else {
              this.setState({
                isLoading: false,
                buttonTitle: 'Delete from watched items',
                buttonColor: 'grey',
                watchedIcon: require('./img/full_heart.png'),
              })
            }
            this.forceUpdate();
          }}
 

          >
            <Image
              source={this.state.watchedIcon}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={{fontSize: 15}}>{item.name}</Text>
        <Text style={{fontSize: 15}}>{item.price}$</Text>
        <Text style={{fontSize: 15}}>{item.description}</Text>
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
                  cart.push({"name": item.name, "price": item.price, "description": item.description, "img": item.img, "howmany": 1});
                } else {
                  cart[itemIndex].howmany = parseInt(cart[itemIndex].howmany) + 1;
                }
                try {
                    await AsyncStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {
                }            
            } catch (error) {
                cart = [{"name": item.name, "price": item.price, "description": item.description, "img": item.img, "howmany": 1}];
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
     </View>
    );
  }
}

export default ItemScreen;

