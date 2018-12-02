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


const RootStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Cart: CartScreen,
    Watched: WatchedScreen,
    Categories: CategoriesScreen,
    Category: CategoryScreen,
    Item: ItemScreen,
    Terms: TermsScreen,
    Form: FormScreen,
    FormWalidate: FormWalidateScreen,
  },
  {
	contentOptions: {
		items: [
			'Home',
            'Cart',
            'Watched',
            'Categories',
            'Category',
            'Item',
            'Terms',
            'Form',
            'FormWalidate',
		]
	},
  }
);

const RootDrawer = createDrawerNavigator({ RootStack }, {
	contentOptions: {
		items: {
        	Home: HomeScreen,
            Cart: CartScreen,
            Watched: WatchedScreen,
            Categories: CategoriesScreen,
            Category: CategoryScreen,
            Item: ItemScreen,
            Terms: TermsScreen,
            Form: FormScreen,
            FormWalidate: FormWalidateScreen,
		}
	},
    paths: {
           Home: HomeScreen,
           Cart: CartScreen,
           Watched: WatchedScreen,
           Categories: CategoriesScreen,
           Category: CategoryScreen,
           Item: ItemScreen,
           Terms: TermsScreen,
           Form: FormScreen,
           FormWalidate: FormWalidateScreen,
    }
});

const App = createAppContainer(RootStack);
export default App;
