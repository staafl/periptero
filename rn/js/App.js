import React, { Component } from 'react';

import { Text, YellowBox } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import { Styles } from './app/Styles';

import { TitleBar } from './app/TitleBar';

import { MainScreen } from './screens/MainScreen';

// ========================================

// toast notification

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Unable to symbolicate',
    'Can\'t call setState',
    'Remote debugger is in a background tab'
]);

let _nav = null;
const navigation = { navigate: (where, props) => _nav._navigation.navigate(where, props) };

const RootStack = createStackNavigator(
    {
        MainScreen: {
            screen: MainScreen
        },
    },
    {
        initialRouteName: "MainScreen",
        navigationOptions: {
            ...Styles.navigation,
            headerTitle: (obj) => {
                const parsed = JSON.parse(obj.children);
                return (
                    <TitleBar
                        {...parsed}
                        text={parsed.title}
                        mainScreen={parsed.isMain}
                        eventCalendarScreen={parsed.isEventCalendar}
                        navigation={navigation} />
                )
            }
        }
    });

export default class App extends Component<Props> {
  render() {
    return <RootStack 
        ref={(nav) => { _nav = nav; }} />;
  }
}






























