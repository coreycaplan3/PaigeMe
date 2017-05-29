/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {Image} from 'react-native';

export default class ChatScreenNavMenu extends Component {

    render() {
        return (
            <Image source={require('../../assets/ic_add.png')} onPress={() => {
                this.props.navigation.navigate("CreateChat");
            }}/>
        );
    }

}