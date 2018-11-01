import React, { Component } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { Event } from '../util/Event';

export class TitleBar extends Component<{}> {

  static onStateChanged = new Event();
  static onGoBack = new Event();

  constructor(props) {
    super(props);

    this.state = {  };
  }

  setState(what) {
    super.setState(what, () => TitleBar.onStateChanged.raise(this.state, this));
  }
  
  getState() {
    return this.state;
  }

  render() {
    return (
      <View style={{flexDirection: "row", justifyContent: "space-between", flex: 1}}>

        <Text style={{fontSize: 20, color: "white", margin: 15, fontWeight: "bold"}}>{this.props.text}</Text>

      </View>
    );
  }

}