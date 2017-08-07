import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  NavigatorIOS
} from 'react-native';

export default class Congrats extends Component {
    static propTypes = {
    navigator: PropTypes.object.isRequired
}
    render(){
        return (
            <View>
            <Text></Text>
                        <Text></Text>

            <Text></Text>

            <Text></Text>

            <Text></Text>

            <Text></Text>

            <Text></Text>

            <Text>Yo!</Text>
            </View>
        )
    }
}