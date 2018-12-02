import React, { Component } from 'react';
import {createStackNavigator, NavigationEvents} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View  } from 'react-native';
import { Icon } from 'react-native-elements'

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
    const navigation = this.props.navigation.dangerouslyGetParent();
    const items = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    this.forceUpdate();
  }

  render() {
    const navigation = this.props.navigation.dangerouslyGetParent();
    const items = JSON.parse(navigation.getParam('items', 'Somebody stole all our merchandise... Our team of best boyes is working on it. Come back later pls.'));
    return(
      <ScrollView style={styles.container}>
        <List>
          {
            items.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                onPress={() => {
                  this.props.navigation.navigate('Item', {
                    items: `${JSON.stringify(item)}`,
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


export default createStackNavigator({ CategoryScreen }, {
    navigationOptions: {
        drawerLabel: () => null
    }
});
