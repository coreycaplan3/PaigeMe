/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Text, ListView, TextInput} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import * as firebase from 'firebase';
import {resetToChatDetailsFromCreation} from "../../config/Routes";

export default class CreateChatScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Create a New Chat",
        headerStyle: globalStyles.bgPrimaryColor,
    });

    constructor(props) {
        super(props);

        this.state = {
            users: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }

    onTextTyped(text) {
        if (!text) {
            return;
        }
        console.log("Text", text);

        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            .cloneWithRows([]);
        this.setState({
            users: dataSource
        });

        let users = [];
        const params = text.toLowerCase();

        firebase.database().ref("users")
            .orderByChild("email")
            .startAt(params)
            .limitToFirst(25)
            .on("child_added", (snap) => {
                users.push({email: snap.val().email, uid: snap.key, name: snap.val().name});
                this.setState({
                    users: this.state.users.cloneWithRows(users)
                });
            }, (error) => {
                console.log("Error: ", error);
            });
    }

    createChatAndNavigate(user) {
        const updates = {};
        const currentUser = firebase.auth().currentUser;

        const chatId = firebase.database().ref("userChats").child(firebase.auth().currentUser.uid).push().key;
        const userChatObject = {};
        userChatObject[chatId] = true;
        updates["userChats/" + currentUser.uid] = userChatObject;

        const chat = {};
        chat["creatorId"] = currentUser.uid;
        chat["otherId"] = user.uid;
        chat[currentUser.uid] = {name: currentUser.displayName, profilePicture: currentUser.photoURL};

        updates["chats/" + chatId] = chat;
        firebase.database().ref().update(updates, (error) => {
            if (!error) {
                this.props.navigation.dispatch(resetToChatDetailsFromCreation(chatId));
            }
        })
    }

    renderRow(user) {
        return (
            <TouchableNativeFeedback onPress={() => {
                this.createChatAndNavigate(user);
            }} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.userContainer}>
                    <Text style={styles.emailText}>
                        {user.email}
                    </Text>
                    <Text style={styles.nameText}>
                        {user.email}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={[globalStyles.regularPadding]}>
                <TextInput placeholder="abc@lehigh.edu" onChangeText={(text) => {
                    this.onTextTyped(text);
                }}/>
                <Text style={[globalStyles.verticalMargin, styles.resultsText]}>
                    Results
                </Text>
                <ListView dataSource={this.state.users}
                          renderRow={(user, sectionID, rowID, highlightRow) => this.renderRow(user)}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    userContainer: {
        height: 48,
    },
    resultsText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    emailText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nameText: {
        fontSize: 14
    }
});