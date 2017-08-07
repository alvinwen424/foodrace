
import React, {Component, PropTypes} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NavigatorIOS,
} from 'react-native';

export default class FourSquare extends Component{

constructor(){
super()
this.foursquare = require('react-native-foursquare-api')({
  clientID: 'TCUPGXXBH2WRKHO11RBSVSJLVYYDZYDAUCHHP3Q4CEJ2DPHE',
  clientSecret: '2A1GPUWOAP52UPRXKYIHUBUT5TTBG553LXADJJKFYGODCPDD',
  style: 'foursquare', 
  version: '20140806' 
});
this.params = {
    "ll": "40.618809, -73.984763",
    "query": "pizza"
}
this.state = {
allVenues:[]
}}

componentDidMount(){
this.foursquare.venues.getVenues(this.params)
      .then((venues) => {
        var loadedArr = [];
          venues.response.venues.map(eachVenue => {
          console.log(eachVenue.location);
          loadedArr.push(eachVenue);
          })
        this.setState({allVenues: loadedArr})
        console.log("All values in arr", this.state.allVenues);
      })
      .then(() => {
        console.log("Hello")
      })
      .catch(function(err){
        console.log(err);
      });
}

render(){
  return(
    <View>
      <ScrollView>
      <Text style = {{marginTop: 15}}>Congrats on Finishing Your Run, Here are some close ice cream parlors</Text>
      <Text></Text>
      {this.state.allVenues.map(venue => {return(<View style = {{borderColor: "black"}}><Text style = {{fontWeight: "bold", color: "blue", fontSize: 20}}>{venue.name}{"\n"}<Text style = {{fontSize: 10}}>{venue.location.address}{"\n\n"}</Text></Text></View>)})}
      </ScrollView>
    </View>
  ) 
}


}
