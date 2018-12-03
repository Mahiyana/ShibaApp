import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View  } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements'

class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Products',
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
        dataSource: responseJson.merch,
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
        <View style={styles.activity}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
    <ScrollView style={styles.container}>
      <List>
        {
          this.state.dataSource.map((category, i) => (
            <ListItem
              key={i}
              title={category.name}
              onPress={() => {
                this.props.navigation.navigate('Category', {
                  items: JSON.stringify(category.items),
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

export default CategoriesScreen;
