import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import CategoriesScreen from './components/CategoriesScreen';
import CategoryScreen from './components/CategoryScreen';
import ItemScreen from './components/ItemScreen';
import { Icon } from 'react-native-elements'


const RootStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Categories: CategoriesScreen,
    Category: CategoryScreen,
    //Item: ItemScreen,
  }//,
  //{
  //  initialRouteName: 'Home',
  //  navigationOptions: {
  //    headerStyle: {
  //      backgroundColor: '#f4511e',
  //    },
  //    headerTintColor: '#fff',
  //    headerTitleStyle: {
  //      fontWeight: 'bold',
  //    },
  //  },
  //},
);

const RootDrawer = createDrawerNavigator({ RootStack }, {
	contentOptions: {
		items: {
			Home: HomeScreen,
			Details: DetailsScreen
		}
	},
    paths: {
        Home: HomeScreen,
        Details: DetailsScreen
    }
});

const App = createAppContainer(RootStack);
export default App;
