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
     dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     }),
     loaded: false,
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
         dataSource: this.state.dataSource.cloneWithRows(responseData.bikes),
         loaded: true,
       });
     })
     .done();
  }

  // rendering code for ListScreen
  render() {
    if(!this.state.loaded){
      return this.loadingView();
    }

    return (
      <ListView
       dataSource={this.state.dataSource}
       renderRow={this.renderListing}
       style={styles.listView}
     />
   );
  }

    // defines views to display above
  loadingView(){
    return <Text>Shits loading</Text>
    }
  renderListing(bike){
    // const { navigate } = this.props.navigation.navigate;
    return(
      <TouchableHighlight style={styles.listingItem} onPress={()=> navigate('BikeDetails')}>
        <View style={styles.container}>
          <Text style = {styles.listingText}>{bike.owner}</Text>
          <Text style = {styles.listingText}>{bike.timeStart.slice(9,11)+":"+bike.timeStart.slice(11,13)}</Text>
          <Text style = {styles.listingText}>{bike.timeEnd.slice(9,11)+":"+bike.timeEnd.slice(11,13)}</Text>

        </View>
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
    justifyContent: 'space-around',
  },
  listingItem: {
    // flex: 1,
    backgroundColor: '#8c95a3',
    // height: 50
  },
  listingText: {
    fontSize: 24,
  },
  listView: {
   paddingTop: 20,
   backgroundColor: '#F5FCFF',
 },

});

// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
export default SimpleApp
