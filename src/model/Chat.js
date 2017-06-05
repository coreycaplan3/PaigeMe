/**
 * Created by Corey on 6/4/2017.
 */
import * as firebase from 'firebase';

export const createChatFromSnapshot = (snapshot) => {
    const otherId = snapshot.child("otherId").val();
    const otherUser = snapshot.child(otherId).val();
    const creatorId = snapshot.child("creatorId").val();
    const creatorUser = snapshot.child(creatorId).val();
    const chat = {
        chatId: snapshot.key,
        otherId: otherId,
        creatorId: creatorId
    };
    chat[otherId] = {
        uid: otherId,
        name: otherUser ? otherUser.name : "My Chat",
        profilePicture: otherUser ? otherUser.profilePicture : ChatScreen.defaultProfilePicture
    };
    chat[creatorId] = {
        uid: creatorId,
        name: creatorUser ? creatorUser.name : "My Chat",
        profilePicture: creatorUser ? creatorUser.profilePicture : ChatScreen.defaultProfilePicture
    };
    chat["lastMessage"] = {
        text: snapshot.child("lastMessage").child("text").val()
    };

    return chat;
};

export const getUserFromChat = (chat) => {
    const otherUser = chat[chat.otherId];
    const creatorUser = chat[chat.creatorId];
    return otherUser.uid === firebase.auth().currentUser.uid ? creatorUser : otherUser;
};