/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import globalStyles from "../../styles/GlobalStyles";
import {GiftedChat} from "../../giftedchat/GiftedChat";
import * as firebase from 'firebase';
import moment from "moment";
import {formatUnixDateToUtc} from "../../config/DateFormatter";

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
            chat: this.props.navigation.state.params.chat
        };
    }

    componentDidMount() {
        firebase.database().ref("chats").child(this.state.chat.chatId).orderByChild("time").on("value", snapshot => {
            let messages = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.key !== 'chatMembers') {
                    const userId = childSnapshot.child("uid").val();
                    const message = {
                        _id: childSnapshot.key,
                        createdAt: formatUnixDateToUtc(childSnapshot.child("time").val()),
                        text: childSnapshot.child("text").val(),
                        sound: childSnapshot.child("sound").val(),
                        image: childSnapshot.child("img").val(),
                        user: {
                            _id: userId,
                            name: this.state.chat[userId].name,
                            avatar: this.state.chat[userId].profilePicture,
                        },
                    };
                    messages = [message].concat(messages);
                }
            });

            this.setState({
                messages: messages
            });
        }, error => {
            console.log("Error", error);
        });
    }

    componentWillUnmount() {
        firebase.database().ref("chats").child(this.state.chat.chatId).off();
    }

    onSend(messages) {
        const message = messages[messages.length - 1];
        const currentUid = firebase.auth().currentUser.uid;

        firebase.database().ref(`userMessages/${currentUid}/${this.state.chat.chatId}`).push().update({
            uid: currentUid,
            time: parseInt(moment().format("x")),
            text: message.text,
            sound: null,
            img: message.image ? message.image : null,
        }, error => {
            if (error) {
                console.log("ERROR", error);
            }
        });
    }

    render() {
        const userId = firebase.auth().currentUser.uid;
        const user = {
            _id: userId,
            name: this.props.navigation.state.params.chat[userId].name,
            avatar: this.props.navigation.state.params.chat[userId].avatar,
        }
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={user}
            />
        );
    }

}