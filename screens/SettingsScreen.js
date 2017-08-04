
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps'

const { width, height }= Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

function inRadius(marker, position){
  if (position.latitude + .002 > marker.latitude && position.latitude - .002 < marker.latitude){
    if(position.longitude + .002 > marker.longitude && position.longitude - .002 < marker.longitude){
      return true;
    }
  }
  return false;
}

export default class viewMap extends Component {
    constructor(props){
        super(props)
        this.state ={
            initialPosition:{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            markerPosition: {
                latitude: 0,
                longitude: 0,
            },
            targetPosition:{
              latitude: 40.7050, 
              longitude: -74.0089
            },
            lines: []
        }
    }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition( (position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }

        this.setState({initialPosition: initialRegion, markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maxiumumAge: 1000 })

    this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var lastRegion ={
          latitude: lat,
          longitude: long,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA
        }
        const nextState = {initialPosition: lastRegion, markerPosition: lastRegion};
        if (inRadius(this.state.targetPosition, lastRegion)){
          nextState.lines = [...this.state.lines, this.state.targetPosition];
          nextState.targetPosition = {latitude: 40.7090, longitude: -74.0040}; 
        }

        this.setState(nextState)
    })
  }

  componentWillUnmount(){
    navigator.geolocaiton.clearWatch(this.watchID)
  }

    render(){
        return(
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.initialPosition}>
                    <MapView.Marker
                        coordinate={this.state.targetPosition}>
                    </MapView.Marker>

                    <MapView.Marker
                        coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker}>
                            </View>
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
     marker: {
        height: 20,
        width: 20,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
        borderWidth: 3,
        borderColor: 'white',
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
});

/*
                    <MapView.Polygon
                        coordinates={[
                          {latitude: 40.7070, longitude: -74.0117},
                          {latitude: 40.7058, longitude: -74.0040},
                          {latitude: 40.7078, longitude: -74.0028},
                        ]}
                        //instead of erasing the line, generate the line by having them walk to specific coordinates
                        strokeColor='red'
                        strokeWidth={5}
                    />*/

// drop marker
//if geolocation hits marker, draw line from original location to marker
//
//erase marker
//pop up new marker
