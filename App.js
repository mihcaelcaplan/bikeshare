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
  ListView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

// some global vars
var REQUEST_URL = 'https://raw.githubusercontent.com/mihcaelcaplan/bikeshare/master/data.json'

class ListScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bikes: null,
    };
  }

  static navigationOptions = {
    title: 'List of Bikes',
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
     .then((response) => response.json())
     .then((responseData) => {
       this.setState({
         bikes: responseData.bikes,
       });
     })
     .done();
  }

  // rendering code for ListScreen
  render() {
    if(!this.state.bikes){
      return this.loadingView();
    }

    var bike = this.state.bikes[0]
    return (
      this.renderListing(bike)
    );
  }

    // defines views to display above
  loadingView(){
    return <Text>Shits loading</Text>
    }
  renderListing(){
    const { navigate } = this.props.navigation;
    return(
      <TouchableHighlight style={styles.container} onPress={()=> navigate('BikeDetails')}>
        <Text style = {styles.listingText}>This is a bike</Text>
      </TouchableHighlight>
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
  container: {
    flexDirection: 'row',
    flex: 1,
  },
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
