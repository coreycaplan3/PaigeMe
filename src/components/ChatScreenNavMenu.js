/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {Button} from 'react-native';

export default class ChatScreenNavMenu extends Component {

    render() {
        return (
            <Button title="New Chat" onPress={() => {
                this.props.navigation.navigate("CreateChat");
            }}/>
        );
    }

}