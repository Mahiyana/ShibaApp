import React, { Component } from 'react';
import {createStackNavigator, NavigationEvents} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View, Image  } from 'react-native';
import { Icon } from 'react-native-elements'

const IMAGES = {
  shiba_de_lux: require('./img/shiba_de_lux.jpg'),
  robo_shiba: require('./img/robo_shiba.jpg'),
  nice_comb: "http://www.coastalpet.com/media/website/ItemImages/W564_____NCL00.jpg", //require('./img/nice_comb.jpg'),
  nicer_comb: require('./img/nicer_comb.jpg'),
}

const Row = (props) => (
  <View style={{flex:1, flexDirection: 'row'}}> //Don't forget this
    <Image source={props.image}>
      <Text>{props.title}</Text>
    </Image>
  </View>
)

class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Category',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };

  constructor(props){
    super(props);
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    const navigation = this.props.navigation;
    const items = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.forceUpdate();
  }
  
  render() {
    const navigation = this.props.navigation;
    const items = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return(
      <ScrollView style={styles.container}>
        <List>
          {
            items.map((item, i) => (
              <ListItem
                key={i}
                avatar={IMAGES[item.img]}
                title={item.name}
                onPress={() => {
                  this.props.navigation.navigate('Item', {
                    items: JSON.stringify(item),
                  });
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


export default CategoryScreen;
