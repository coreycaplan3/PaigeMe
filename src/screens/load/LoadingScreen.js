/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';

export default class LoadingScreen extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={[styles.loginContainer, globalStyles.bgColor]}>
                <Image source={require('../../../assets/paige_bitmoji.png')}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});