/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as firebase from 'firebase';
import globalStyles from '../../styles/GlobalStyles';

import WelcomeScreen from '../welcome/WelcomeScreen';
import ChatScreen from '../chat/ChatScreen';
import LoadingScreen from '../load/LoadingScreen';

export default class MainScreen extends Component {

    static navigationOptions = {
        title: "PaigeMe",
        headerStyle: globalStyles.bgPrimaryColor,
    };

    constructor() {
        super();

        this.state = {
            isLoading: true,
            isAuthorized: false,
        }
    }

    componentDidMount() {
        setInterval(() => {
            firebase.auth().onAuthStateChanged((user) => {
                this.isAuthorized = user !== null;

                this.setState({
                    isLoading: false,
                    isAuthorized: this.isAuthorized,
                });
            });
        }, 1000);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingScreen/>
            );
        } else if (this.isAuthorized) {
            return (
                <ChatScreen navigation={this.props.navigation}/>
            );
        } else {
            return (
                <WelcomeScreen/>
            );
        }
    }

}