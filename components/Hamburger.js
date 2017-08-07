
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
  if (position.latitude + .001 > marker.latitude && position.latitude - .001 < marker.latitude){
    if(position.longitude + .001 > marker.longitude && position.longitude - .001 < marker.longitude){
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
              latitude: 0, 
              longitude: 0
            },
            unMarkedPositions: [
                {latitude: 40.7105, longitude: -74.0089, id: 1},
                {latitude: 40.7068, longitude: -74.0069, id: 2}
                ],
            lines: [],
            counter: 0,

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
        var firstPosition = {
          latitude: lat,
          longitude: long,
          id: 0
        }
        if (!this.state.targetPosition.latitude && !this.state.targetPosition.longitude){
            this.state.targetPosition = this.state.unMarkedPositions[0];
            this.state.counter++;
        }
        const nextState = {initialPosition: initialRegion, markerPosition: initialRegion}
        if (!this.state.lines[0]){
          this.state.lines.push(firstPosition)
          this.state.unMarkedPositions.push({
            latitude: lat,
            longitude: long,
            id: this.state.unMarkedPositions.length
            })
        }
        this.setState(nextState)
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
          nextState.targetPosition = this.state.unMarkedPositions[this.state.counter];
          this.state.counter++; 
        }
        this.setState(nextState)
    })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }

    render(){
        let lines = this.state.lines
        return(
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.initialPosition}>
                    <MapView.Marker
                        coordinate={this.state.targetPosition}>
                    </MapView.Marker>
                    { 
                        ((this.state.counter > 1) && lines.map(line =>{
                            let nLine1 = lines.find(eline => eline.id == line.id)
                            let nLine2 = lines.find(eline => eline.id == line.id-1)
                            if (!nLine1 || !nLine2 ){
                                return (
                                <MapView.Polyline
                                    coordinates={[
                                        {latitude: 0, longitude: 0},
                                        {latitude: 0, longitude: 0},
                                    ]}                            //this part is broken
                                    strokeColor='red'
                                    strokeWidth={5}
                                />
                            )
                            }
                            console.log("line1", nLine1)
                            console.log("line2", nLine2)
                            return (
                                <MapView.Polyline
                                    coordinates={[
                                        {latitude: nLine2.latitude, longitude: nLine2.longitude},
                                        {latitude: nLine1.latitude, longitude: nLine1.longitude},
                                    ]}                            //this part is broken
                                    strokeColor='red'
                                    strokeWidth={5}
                                />
                            )
                            })
                        )
                    }
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
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
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
*/

// drop marker
//if geolocation hits marker, draw line from original location to marker
//
//erase marker
//pop up new marker
                // {latitude: 40.7096, longitude: -74.0117, id: 1},
                // {latitude: 40.7100, longitude: -74.0066, id: 2}