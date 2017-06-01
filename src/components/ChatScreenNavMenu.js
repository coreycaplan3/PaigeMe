/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default class ChatScreenNavMenu extends Component {

    render() {
        return (
            <TouchableOpacity style={{marginRight: 16}} onPress={() => {
                this.props.navigation.navigate("CreateChat");
            }}>
                <Image source={require('../../assets/ic_add.png')}/>
            </TouchableOpacity>
        );
    }

}