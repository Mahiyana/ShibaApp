import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator, createDrawerNavigator} from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import CategoriesScreen from './components/CategoriesScreen';
import CategoryScreen from './components/CategoryScreen';
import ItemScreen from './components/ItemScreen';
import CartScreen from './components/CartScreen';
import WatchedScreen from './components/WatchedScreen';
import TermsScreen from './components/TermsScreen';
import { Icon } from 'react-native-elements'


const RootStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Cart: CartScreen,
    Watched: WatchedScreen,
    Categories: CategoriesScreen,
    Category: CategoryScreen,
    Item: ItemScreen,
    Terms: TermsScreen
  },
  {
	contentOptions: {
		items: [
			'Home',
			'Details'
		]
	},
  }
);

const RootDrawer = createDrawerNavigator({ RootStack }, {
	contentOptions: {
		items: {
			Home: HomeScreen,
		}
	},
    paths: {
        Home: HomeScreen,
    }
});

const App = createAppContainer(RootStack);
export default App;
