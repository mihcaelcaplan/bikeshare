import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class ListScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: null,
    };
  }

  static navigationOptions = {
    title: 'List of Bikes',
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TouchableHighlight style={styles.listingItem} onPress={()=> navigate('BikeDetails')}>
        <Text style = {styles.listingText}>This is a bike</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Leave'
  };
  render(){
    return(
    <View>
      <Text>Bike Details</Text>
    </View>
  );
  }
}

const SimpleApp = StackNavigator({
  BikeList: { screen: ListScreen },
  BikeDetails: {screen: DetailScreen}
},
// try and fix header on android
  {
   cardStyle: {
     paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
   }
  });

const styles = StyleSheet.create({
  listingItem: {
    // flex: 1,
    backgroundColor: '#8c95a3',
    // height: 50
  },
  listingText: {
    fontSize: 26
  },

});

// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
export default SimpleApp
