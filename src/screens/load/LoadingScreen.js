/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import * as Routes from '../../config/Routes';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {

    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // setTimeout(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.props.navigation.dispatch(Routes.resetToChat);
                } else {
                    this.props.navigation.dispatch(Routes.resetToLogin);
                }
            })
        // }, 1000);
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