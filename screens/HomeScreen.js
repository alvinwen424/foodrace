import React, {Component, PropTypes} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  NavigatorIOS
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import FoodRunOptions from "./FoodRunOptions"

import viewMap from "./viewMap"


const styles = StyleSheet.create({
  startButton: {
    backgroundColor: "#FFBB34",
    position: 'absolute',
    bottom:0,
    left:0
  }
}) 

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
            component: StartButton,
            title: 'Food Runner App',
        }}
        style={{flex: 1}}
      />)
    }
}



export class StartButton extends Component{

static propTypes = {
    navigator: PropTypes.object.isRequired
}

_onForward = () => {
  this.props.navigator.push({
    component: LoadPictures
  })
}
render(){
    console.log("Reached the start button component")
    let pic = {
      uri: 'https://media.npr.org/assets/img/2015/06/12/aziz-ansari-c-ruvan-wijesooriya_wide-1f976b8b7991303e7e09cec02b501ef5a79acceb.jpg?s=1400'
    }
    let pic2 = {
      uri: 'https://pixel.nymag.com/imgs/daily/vulture/2017/04/27/magazine/28-aziz-ansari-3.nocrop.w710.h2147483647.2x.jpg'
    }

  return(
       <View>
      
      <Text> Wassup Fam </Text>
      <Text> Hello Things </Text>
      <Text> My Name is Aziz Ansari </Text>
      <Image source = {pic} style = {{width: 193, height: 110}}/> 
      <Image source = {pic} style = {{width: 200, height: 200}} />

         <Button
           title = "Start"
           color = "blue"
           style = {{marginTop: 50}}
           backgroundColor='#3fffff'
           onPress = {this._onForward}
        /> 

      </View>
  )
}
}



export class LoadPictures extends Component{

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }
  _onForward = () => {
    console.log("reached the on forward component")
    this.props.navigator.push({
        component: viewMap
    })
  }

render(){
  return(
    <View>
        <ScrollView>
        
        <TouchableOpacity onPress={this._onForward}>
          <Image style={{width: 400, height: 200, borderRadius: 30, marginLeft:20, marginRight:20,  marginTop:10}} source={{uri: "http://zacharys.com/wp-content/uploads/2014/04/PizzaThinTomBasil_12.jpg"}} onPress = {this._onForward}>
          
            <View style={{ paddingTop: 60, width: 320, height: 120}}>
                <Text style={{fontSize: 20, textAlign: 'center', backgroundColor: 'rgb(164,74,23)', color: 'white'}}> Pizza </Text>
            </View>
            
          </Image>
        </TouchableOpacity>
        
        
        <Image style={{width: 400, height: 200, borderRadius: 30, marginRight:20, marginLeft:20, marginTop:10}} source={{uri: "https://assets.culvers.com/menu-item-images/200/web-butter-burger-deluxe-double-bacon.jpg"}}> 
          
          <View style={{ paddingTop: 60, width: 320, height: 120}}>
            <Text style={{fontSize: 20, textAlign: 'center', backgroundColor: 'rgb(164,74,23)', color: 'white'}}> Burger </Text>
          </View>
        
        </Image>
        
        
        <Image style={{width: 400, height: 200, borderRadius: 30, marginRight:20, marginLeft:20, marginTop:10}} source={{uri: "https://visitmontgomery.com/wp-content/uploads/2015/06/Header-Art-01.jpg"}}>
            
            <View style={{ paddingTop: 60, width: 320, height: 120}}>
                <Text style={{fontSize: 20, textAlign: 'center', backgroundColor: 'rgb(164,74,23)', color: 'white'}}> Ice Cream </Text>
              </View>

        </Image>

        </ScrollView>
    </View>
  )
}}

          <View style={styles.backdropView}>
            <Text style={styles.headline}>Headline</Text>
          </View>
