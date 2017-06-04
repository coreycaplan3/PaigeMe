/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import globalStyles from "../../styles/GlobalStyles";
import {GiftedChat} from "../../giftedchat/GiftedChat";
import * as firebase from 'firebase';
import moment from "moment";

export default class ChatDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.otherUser.name,
        headerStyle: globalStyles.bgPrimaryColor,
    });

    constructor(props) {
        super(props);
        this.onSend.bind(this);

        this.state = {
            messages: [],
            chatId: this.props.navigation.state.params.chatId
        };
    }

    componentDidMount() {
        firebase.database().ref(`chats/${this.chatId}`).on("value", snapshot => {
            const messages = [];
            snapshot.forEach(childSnapshot => {
                console.log("Child", childSnapshot);
                messages.push({
                    _id: childSnapshot.key,
                    createdAt: childSnapshot.child("time").val(),
                    text: childSnapshot.child("text").val(),
                    sound: childSnapshot.child("sound").val(),
                    image: childSnapshot.child("img").val(),
                });
            });
        });
    }

    onSend(messages) {
        const message = messages[messages.length - 1];
        const currentUid = firebase.auth().currentUser.uid;

        firebase.database().ref(`userMessages/${currentUid}/${this.state.chatId}`).push().update({
            uid: currentUid,
            time: moment().format("x"),
            text: message.text,
            sound: null,
            img: message.image ? message.image : null,
        })
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: firebase.auth().currentUser.uid,
                }}
            />
        );
    }

}