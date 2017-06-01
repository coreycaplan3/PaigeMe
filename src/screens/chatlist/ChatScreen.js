/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, ListView, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import ChatScreenNavMenu from "../../components/ChatScreenNavMenu";
import * as firebase from 'firebase';

export default class ChatScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "PaigeMe",
        headerStyle: globalStyles.bgPrimaryColor,
        headerRight: <ChatScreenNavMenu navigation={navigation}/>
    });

    constructor(props) {
        super(props);
        this.state = {
            chatIds: [],
            chats: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref("userChats").child(currentUser.uid).on("child_added", (chatId) => {
            let chats = [];
            firebase.database().ref("chats").child(chatId.key).on("child_added", (snapshot) => {
                const otherUser = snapshot[snapshot.otherId];
                const chat = {
                    chatId: chatId,
                    otherId: snapshot.child("otherId").val(),
                    creatorId: snapshot.child("creatorId").val(),
                    otherUser: {
                        name: otherUser ? otherUser.name : "My Chat",
                        source: otherUser ? otherUser.profilePicture : require('../../../assets/ic_account_circle.png')
                    }
                };
                chats.push(chat);
                this.setState({
                    chats: this.state.chats.cloneWithRows(chats)
                });
            });
        });
    }

    renderRow(chat) {
        let source;
        let name;
        let otherUser = chat[chat.otherId];
        if (otherUser && otherUser.profilePicture) {
            source = {uri: otherUser.profilePicture},
                name = otherUser.name;
        } else {
            source = require('../../../assets/ic_account_circle.png');
            name = "My Chat";
        }
        return (
            <View style={styles.chatContainer}>
                <Image source={source} style={styles.chatPhoto}/>
                <Text style={styles.chatName}>{name}</Text>
            </View>
        );
    }

    render() {
        return (
            <ListView style={[globalStyles.regularMarginSmall, styles.container]} dataSource={this.state.chats}
                      renderRow={(chat, sectionID, rowID, highlightRow) =>
                          this.renderRow(chat)}/>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        alignItems: 'stretch',
        alignContent: 'stretch',
    },
    chatPhoto: {
        flex: 0.,
        alignSelf: 'stretch'
    },
    chatName: {
        flex: 0.8,
    }
});