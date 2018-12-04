import React, { Component } from 'react';
import { Image, Button, View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
//import IMAGES from './Images';

const IMAGES = {
  shiba_de_lux: require('./img/shiba_de_lux.jpg'),
  robo_shiba: require('./img/robo_shiba.jpg'),
  nice_comb: require('./img/nice_comb.jpg'),
  nicer_comb: require('./img/nicer_comb.jpg'),
}


class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Home',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  
  componentDidMount(){
  return fetch('http://10.0.0.238:8000/') //ip -h address show (i musi być w tej samej sieci!!!)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.promotion,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Image 
          source={require('./img/banner.jpg')}
          style={{width: "100%"}}
        />  
        <View style={{alignItems:"center", margin: 100}}>
        <Text style={{fontSize: 20}}>Today’s best item!</Text>
        <Text style={{fontSize: 15}}>{this.state.dataSource.name}</Text>
        <Text style={{fontSize: 15}}>{this.state.dataSource.price}</Text>
        <Image
          source={IMAGES[this.state.dataSource.img]}
          style={{width: 200}}
        /> 
        <View style={[{ width: "95%", margin: 10}]}>
        <Button
        onPress={() => {
          this.props.navigation.navigate('Item', {
            items: JSON.stringify(this.state.dataSource),
          });
        }}
        title="Check it out!"
        />
        </View>

        </View>
      </View>
    );
  }
}

export default HomeScreen;
