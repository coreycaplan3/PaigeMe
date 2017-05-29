/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import * as Routes from './src/config/Routes';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDoFa-UtnXB9YdzZx04l93qx0UW7qPQLtg",
    authDomain: "paigeme-52db8.firebaseapp.com",
    databaseURL: "https://paigeme-52db8.firebaseio.com",
    projectId: "paigeme-52db8",
    storageBucket: "paigeme-52db8.appspot.com",
    messagingSenderId: "584938196675"
};
firebase.initializeApp(config);

AppRegistry.registerComponent('PaigeMe', () => Routes.PaigeMe);