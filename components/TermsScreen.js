import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class TermsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
	  title: 'Terms of Use',
      headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.toggleDrawer() } />
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
        <Text>1. Wake up in an orderly fashion every day to fill my empty bowl. I will serve as your alarm clock and reminder if you fail to do so.</Text>
        <Text>2. Bathroom time is together time.</Text>
        <Text>3. You must give me a nibble of every piece of food you eat…unless it’s a vegetable. You can keep those.</Text>
        <Text>4. Don’t come home smelling of other dogs. I will be checking your collar for slobber stains.</Text>
        <Text>5. Let me inside or outside at my request, no matter how many times I’ve asked already. I would do the same for you if I had opposable thumbs and you didn’t, okay?</Text>
        <Text>6. I can sleep anywhere I please, whether it be my bed, your bed, or in your clean basket of laundry.</Text>
        <Text>7. Please appreciate when I alert you of noises I hear outside. I’ve saved your life hundreds of times already.</Text>
        <Text>8. If it lands on the floor, it’s mine. No five-second rule. And to be honest, the five-second rule is kind of gross, don’t you think?</Text>
        <Text>9. Take me on one visit per day to see the magical creature called Squirrel and his buddy, Raccoon.</Text>
        <Text>10. Cuddle with me at least four times a day. While doing it you must tell me how cute and soft I am.</Text>
        <Text>11. I get shotgun every time, regardless of whether I remember to call it or not.</Text>
        <Text>12. Leave one pair of stinky shoes out per day for me to chew on. Stinky socks and underwear will do, too.</Text>
        <Text>13. Do not dress me as you please. I prefer to be naked. Unlike you humans, I’m actually proud of my body.</Text>
        <Text>14. Banish the ridiculous plastic headpiece that you sometimes make me wear.</Text>
        <Text>15. And water torture is ILLEGAL. Is this not America??</Text>
        <Text>16. I may use whatever furniture I please, even if you’re already sitting on it.</Text>
        <Text>17. We shall never be apart, and I will always be by your side.</Text>
        <Text>18. Be good to me and I’ll be good to you.</Text>
        <Text>19. Rate this app as awesome. I spent a lot of time making it!</Text>
        <Text>20. Drincc Bepis and eat Prongles! Don’t forget to share it with your frens. </Text>
      </View>
    )  
  }
}

export default TermsScreen;
