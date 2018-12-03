import React, { Component } from 'react';
import { Alert, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';


class WatchedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Watched Items',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };


  constructor(props){
    super(props);
    this.state ={ isLoading: true}
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    return watched = (AsyncStorage.getItem('watched') || {})
    .then((response) => {
      this.setState({
        watchedItems: JSON.parse(response),
      })
    })
    .catch((error) =>{
      console.error(error);
    });
    this.forceUpdate();
  }

  componentDidMount(){
  return watched = (AsyncStorage.getItem('watched') || {})
    .then((response) => {
      this.setState({
        isLoading: false,
        watchedItems: JSON.parse(response),
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
    if(this.state.watchedItems && Object.keys(this.state.watchedItems).length != 0){
    return(
      <View style={{flexDirection: 'column',flex: 1}}>
      <ScrollView>
        <List>
          {
            Object.entries(this.state.watchedItems).map(([i, item]) => (
              <ListItem
                key={i}
                title={item.name}
                rightIcon={<Icon name={'favorite'} size={20}/>}
                onPress={() => {
                  var alertString = item.description + "\n" + item.price;
                  Alert.alert(
                    'Awesome action',
                    'What do you want to do with this item?',
                    [
                      {text: 'Nothing...', onPress: () => null, style: 'cancel'},
                      {text: 'See it!', onPress: () => {
                        this.props.navigation.navigate('Item', {
                          items: JSON.stringify(item)
                        })  
                      }},
                      {text: 'Delete it!', onPress: async () => {
                        this.state.watchedItems
                        delete this.state.watchedItems[item.name];
                        AsyncStorage.setItem('watched', JSON.stringify(this.state.watchedItems)).then(() => {
                          this.state.watchedItems = null;
                          this.forceUpdate();
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
      
      <View style={[{ width: "95%", margin: 10, alignSelf: "flex-end"}]}>
      <Button
        onPress={() => {
          Alert.alert(
            'Watched cleaning',
            'This action will delete all amazing stuff you were watching. Are you sure you want to do this?',
            [
              {text: 'Cancel', onPress: () => null, style: 'cancel'},
              {text: 'Delete them', onPress: async () => {
                AsyncStorage.removeItem('watched').then(() => {
                  this.state.watchedItems = null;
                  this.forceUpdate();
                });
              }},
            ], {}
          );  
        }}
        title="Remove all"
      />    
      </View>

      </View>
    );
  }
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{textAlign: 'center'}}>You are not watching any items at the moment. Go shopping to change that!</Text>
    </View>
  );
  }
}

export default WatchedScreen;
