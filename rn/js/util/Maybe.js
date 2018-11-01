import React, { Component } from 'react';

import {
} from 'react-native';

export class Maybe extends Component<{}>
{
    constructor(props) {
        super(props);
        
        this.state = { };
    }
    
    render() {
        if (this.props.condition) {
            return this.props.children;
        } else {
            return null;
        }
    }
}