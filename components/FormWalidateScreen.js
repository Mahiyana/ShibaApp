import React, { Component } from 'react';
import {createStackNavigator, NavigationEvents} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { Alert, Button, AsyncStorage, StyleSheet, ScrollView, ActivityIndicator, Text, View  } from 'react-native';
import { Icon } from 'react-native-elements'

class FormWalidateScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Shipping Form Walidation',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };

  constructor(props){
    super(props);
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    const navigation = this.props.navigation;
    const items = JSON.parse(navigation.getParam('formData', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.forceUpdate();
  }
  
  render() {
    const navigation = this.props.navigation;
    const items = JSON.parse(navigation.getParam('formData', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return(
      <View style={{flexDirection: 'column',flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>Your merch will be sent using following data:</Text>
        <Text style={{ fontSize: 20 }}>{items.name}</Text>
        <Text style={{ fontSize: 20 }}>{items.city}</Text>
        <Text style={{ fontSize: 20 }}>{items.cityCode}</Text>
        <Text style={{ fontSize: 20 }}>{items.street}</Text>
        <Text style={{ fontSize: 20 }}>{items.streetNumber}</Text>
        <Text style={{ fontSize: 20 }}>{items.email}</Text>
        <Text style={{ fontSize: 20 }}>{items.phoneNumber}</Text>
        <Text style={{ fontSize: 20 }}>{items.shipping}</Text>
        </View>

        <View style={[{ width: "95%", margin: 10, alignSelf: "flex-end"}]}>
        <Button
        onPress={() => {
          Alert.alert(
            'Almost Sold',
            'This action will finalize transaction and send you an email with payment details. Is that cool?',
            [
              {text: 'Not Cool', onPress: () => null, style: 'cancel'},
              {text: 'Cool', onPress: async () => {
                AsyncStorage.getItem('cart').then((cart) => {
                  var bodyJSON = JSON.stringify({"userData": items, "cartData": cart});
                  console.log(bodyJSON);
                  fetch('http://10.0.0.238:8000/', {
                    method: 'POST',
                    headers: { 
                             'Accept': 'application/json',
                             'Content-Type': 'application/json' 
                             },
                    body: bodyJSON
                  })                  
                }).then(() => {
                  AsyncStorage.removeItem('cart')
                }).then(() => {
                  Alert.alert('Await our glorious email and we will await your moneys.');
                  this.props.navigation.navigate('Home');                
                })
              }},
            ]
          );
        }}
        title="It's correct"
        containerViewStyle={{width: '100%'}}
      />
      </View>
      <View style={[{ width: "95%", margin: 10, alignSelf: "flex-end"}]}>
      <Button
        onPress={() => {
           this.props.navigation.goBack(); 
        }}
        title="I need to change something"
        containerViewStyle={{width: '100%'}}
        color="#4682B4"
      />
      </View>

      </View>
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


export default FormWalidateScreen;
