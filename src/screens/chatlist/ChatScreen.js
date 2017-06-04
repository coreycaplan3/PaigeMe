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

    static defaultProfilePicture = require('../../../assets/ic_account_circle.png');

    constructor(props) {
        super(props);
        this.state = {
            chatsDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    return JSON.stringify(r1) !== JSON.stringify(r2);
                }
            })
        }
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser;
        console.log("Current User", currentUser.email, currentUser.uid);
        firebase.database().ref("userChats").child(currentUser.uid).on("value", snapshot => {
            const chats = [];

            snapshot.forEach(child => {
                const chat = ChatScreen.createChatFromSnapshot(child);
                chats.push(chat);
            });

            this.setState({
                chatsDataSource: this.state.chatsDataSource.cloneWithRows(chats)
            });
        });
    }

    static createChatFromSnapshot(snapshot) {
        const otherId = snapshot.child("otherId").val();
        const otherUser = snapshot.child(otherId).val();
        const creatorId = snapshot.child("creatorId").val();
        const creatorUser = snapshot.child(creatorId).val();
        return {
            chatId: snapshot.key,
            otherId: otherId,
            creatorId: creatorId,
            otherUser: {
                uid: otherId,
                name: otherUser ? otherUser.name : "My Chat",
                profilePicture: otherUser ? otherUser.profilePicture : ChatScreen.defaultProfilePicture
            },
            creatorUser: {
                uid: creatorId,
                name: creatorUser ? creatorUser.name : "My Chat",
                profilePicture: creatorUser ? creatorUser.profilePicture : ChatScreen.defaultProfilePicture
            },
            lastMessage: {
                text: snapshot.child("lastMessage").child("text").val()
            }
        };
    }

    onClickRow(chat) {
        this.props.navigation.navigate("ChatDetails", {
            chatId: chat.chatId,
            otherUser: chat.otherUser,
        });
    }

    renderRow(chat) {
        let source;
        let name;
        let lastMessage;
        const otherUser = chat.otherUser;
        const creatorUser = chat.creatorUser;
        const userToRender = otherUser.uid === firebase.auth().currentUser.uid ? creatorUser : otherUser;

        name = userToRender.name;
        if (userToRender.profilePicture &&
            typeof userToRender.profilePicture === 'string'
            && userToRender.profilePicture.startsWith("http")) {
            source = {uri: userToRender.profilePicture};
        } else {
            source = ChatScreen.defaultProfilePicture;
        }
        if (chat.lastMessage && chat.lastMessage.text) {
            lastMessage = chat.lastMessage.text;
        } else {
            lastMessage = "No messages sent yet";
        }

        return (
            <TouchableNativeFeedback style={[styles.chatContainer]} onPress={() => this.onClickRow(chat)}>
                <View style={[styles.chatContainer, globalStyles.regularPadding]}>
                    <View style={styles.photoContainer}>
                        <Image style={styles.chatPhoto} source={source}/>
                    </View>
                    <View style={[styles.textContainer, globalStyles.marginLeft]}>
                        <Text style={styles.chatName} numberOfLines={1}>{name}</Text>
                        <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <ListView style={[globalStyles.marginTop, styles.container]} dataSource={this.state.chatsDataSource}
                      renderRow={this.renderRow.bind(this)}/>
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
        height: 72,
        alignItems: 'center',
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    photoContainer: {
        flex: 0.15
    },
    chatPhoto: {
        height: 36,
        width: 36,
    },
    textContainer: {
        flex: 0.85,
        alignItems: 'flex-start',
        height: 56,
    },
    chatName: {
        color: '#000',
        fontSize: 18
    },
});