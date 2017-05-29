/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableNativeFeedback, Text, ListView, TextInput} from 'react-native';
import globalStyle from '../../styles/GlobalStyles';
import * as firebase from 'firebase';

export default class CreateChatScreen extends Component {

    static navigationOptions: {
        title: "Start a New Chat",
        headerStyle: globalStyle.bgPrimaryColor,
    };

    constructor(props) {
        super(props);

        this.state.users = [];
    }

    onTextTyped(text) {
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            .cloneWithRows([]);
        this.setState({
            users: dataSource
        });

        let users = [];
        const params = text.toLowerCase();
        firebase.database().ref("userEmail").startAt(params)
            .once("child_added", (snapshot) => {
                users.push({email: snapshot.email, uid: snapshot.key});
                let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                    .cloneWithRows(users);
                this.setState({
                    users: dataSource
                });
            });
    }

    renderRow(user) {
        return (
            <TouchableNativeFeedback onPress={() => {
                const chatId = firebase.database().ref("userChats").child(firebase.auth().currentUser.uid)
                    .push(true, (error) => {
                        if (!error) {
                            this.props.navigation.navigate("ChatDetails", {chatId: chatId, uid: user.uid});
                        }
                    })
            }}>
                <View style={styles.userContainer}>
                    <Text>{user.email}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={[globalStyle.paddingTop]}>
                <TextInput placeholder="abc@lehigh.edu" onchangetext={(text) => {
                    this.onTextTyped(text);
                }}/>
                <ListView dataSource={this.state.users} renderRow={(user) => this.renderRow(user)}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    userContainer: {
        // borderTop: '#999'
    }
});