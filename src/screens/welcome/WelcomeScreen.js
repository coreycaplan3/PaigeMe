/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import globalStyle from '../../styles/GlobalStyles';
import * as firebase from 'firebase';
import FireAuth from 'react-native-firebase-auth'

export default class WelcomeScreen extends Component {

    constructor(props) {
        super(props);
        FireAuth.init({webClientId: "paigeme-52db8", apiKey: "AIzaSyDoFa-UtnXB9YdzZx04l93qx0UW7qPQLtg"});
    }

    static loginWithGoogle() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref("users").child(user.uid).update({
                    "name": user.displayName,
                    "profilePicture": user.photoURL,
                    "email": user.email
                }, )
            }
        });
        FireAuth.googleLogin();
    }

    render() {
        return (
            <View style={[styles.container, globalStyle.bgColor, globalStyle.verticalPadding]}>
                <View style={[globalStyle.regularShadow, globalStyle.regularPadding, {backgroundColor: 'white'}]}
                      elevation={4}>
                    <Text style={styles.welcomeTitle}>Welcome to PaigeMe</Text>

                    <View style={styles.imageContainer}>
                        <Image source={require('../../../assets/paige_bitmoji.png')}/>
                    </View>
                    <View style={styles.loginContainer}>
                        <Button title={"Login with Google"} style={globalStyle.bgPrimaryColor} onPress={() => {
                            WelcomeScreen.loginWithGoogle();
                        }}/>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 20,
        color: 'black'
    },
    imageContainer: {
        marginTop: 32,
    },
    loginContainer: {
        marginTop: 32,
    }
});