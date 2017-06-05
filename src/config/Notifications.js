/**
 * Created by Corey on 6/4/2017.
 */
import * as PushNotification from 'react-native-push-notification';
import {AsyncStorage} from "react-native";
import * as firebase from 'firebase';

const STORAGE_KEY = "notificationToken";

export const configureNotifications = () => {
    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            token = token.token;
            firebase.auth().onAuthStateChanged(user => {
                AsyncStorage.getItem(STORAGE_KEY)
                    .then((oldToken) => {
                        const userId = user.uid;
                        if (oldToken && oldToken !== token) {
                            firebase.database().ref("userTokens").child(userId).child(oldToken)
                                .remove(error => {
                                    if (!error) {
                                        saveTokenToStorageAndFirebase(token, user.uid);
                                    }
                                });
                        } else if (!oldToken) {
                            saveTokenToStorageAndFirebase(token, user.uid);
                        }
                    });
            })
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);

            PushNotification.localNotification({
                // Cross platform
                message: notification.text,

                // Android
                vibrate: true,
                vibration: 200,

                // iOS
            });
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "584938196675",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true,
    });
};

function saveTokenToStorageAndFirebase(token, userId) {
    AsyncStorage.setItem(STORAGE_KEY, token);

    const object = {};
    object[token] = true;
    firebase.database().ref("userTokens").child(userId).set(object);
}