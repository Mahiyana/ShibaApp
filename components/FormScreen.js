import React, { Component } from 'react';
import {createStackNavigator, NavigationEvents} from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
import { Alert, Platform, Button, StyleSheet, ScrollView, ActivityIndicator, Text, View  } from 'react-native';
import GenerateForm from 'react-native-form-builder';
import { Icon } from 'react-native-elements'

const styles = {
  wrapper: {
    flex: 1,
    paddingBottom: 250,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};

function validate(field) {
  let error = false;
  let errorMsg = '';
  if (!(field.value && field.value.trim())) {
    error = true;
    errorMsg = 'Field required';
  }
  return { error, errorMsg };
}
 
const fields = [
  {
    type: 'text',
    name: 'name',
    required: true,
    label: 'Name and Surname',
    customValidation: validate,
  },
  {
    type: 'text',
    name: 'city',
    required: true,
    label: 'City',
  },
  {
    type: 'number',
    name: 'cityCode',
    required: true,
    label: 'City Code',
  },
  {
    type: 'text',
    name: 'street',
    required: true,
    label: 'Street',
  },
  {
    type: 'number',
    name: 'streetNumber',
    required: true,
    label: 'House Number',
  },

  {
    type: 'email',
    name: 'email',
    required: true,
    label: 'Email',
  },
  {
    type: 'number',
    name: 'phoneNumber',
    required: true,
    label: 'Phone Number',
  },
  {
    type: 'picker',
    name: 'shipping',
    mode: 'dialog',
    label: 'Shipping',
    defaultValue: 'Inpost (12$)',
    options: ['InPost (12$)', 'UPS (20$)', 'DHL (15$)', 'Polish Post (10$) '],
  },
];

class FormScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Shipping Form',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View style={styles.submitButton}>
        <Button
          onPress={() => { 
            const formValues = this.formGenerator.getValues();
            if (Object.values(formValues).includes('')){
              Alert.alert('All fields are required. Please fill them in.')
            } else {
              this.props.navigation.navigate('FormWalidate', {
                formData: JSON.stringify(formValues),
              });
            }
          }}
        title="Next"
        />
        <Text>By clicking Next you accept Terms of Service (avaliable in drawer menu if you actually want to read it).</Text>
        </View>
      </View>
    );
  }
}

export default FormScreen;
