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
import FormScreen from './components/FormScreen';
import FormWalidateScreen from './components/FormWalidateScreen';
import { Icon } from 'react-native-elements'

function newStack(route) {
  const routes = {
    Home: HomeScreen,
    Cart: CartScreen,
    Watched: WatchedScreen,
    Categories: CategoriesScreen,
    Category: CategoryScreen,
    Item: ItemScreen,
    Terms: TermsScreen,
    Form: FormScreen,
    FormWalidate: FormWalidateScreen,
  };
  return createStackNavigator(routes,
    {
      initialRouteName: route,
      navigationOptions: routes[route].navigationOptions
    }
  );
}

const RootStack = newStack('Home');

const RootDrawer = createDrawerNavigator({
  S_Home: newStack('Home'),
  S_Cart: newStack('Cart'),
  S_Watched: newStack('Watched'),
  S_Categories: newStack('Categories'),
  S_Terms: newStack('Terms')
}, {});


const App = createAppContainer(RootDrawer);
export default App;
