
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
            }
        }
    }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition( (position) => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }

        this.setState({initialPosition: initialRegion})
        this.setState({markerPosition: initialRegion})
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

        this.setState({initialPosition: lastRegion})
        this.setState({markerPosition: lastRegion})
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
        backgroundColor: 'red',
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
