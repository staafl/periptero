import React, { Component } from 'react';
import {
  AsyncStorage,

  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Styles } from '../app/Styles';

import { TitleBar } from '../app/TitleBar';

// ========================================

type Props = {};

export class MainScreen extends Component<Props> {

  static navigationOptions = {
    title: JSON.stringify({ title: 'Periptero', isMain: true })
  };
  
  constructor(props) {
    super(props);

    this.state = { };
  }
  
  render() {
    return (
      <View style={Styles.container}>
        <Text style={{color: 'white'}}>{"Hi there!"}</Text>
      </View>
      )
  }
}