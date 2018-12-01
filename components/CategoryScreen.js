import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View  } from 'react-native';

class CategoryScreen extends Component {
  static navigationOptions = {
    title: 'Category',
  };
  render() {
    const { navigation } = this.props;
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


export default CategoryScreen;
