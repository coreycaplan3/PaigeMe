/**
 * Created by Corey on 5/28/2017.
 */
import {NavigationActions, StackNavigator} from 'react-navigation';

import LoadingScreen from "../screens/load/LoadingScreen";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import ChatDetailsScreen from "../screens/chatdetails/ChatDetailsScreen";
import CreateChatScreen from "../screens/createchat/CreateChatScreen";

export const resetToLogin = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: "Welcome"})
    ]
});

export const resetToChat = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: "Chat"})
    ]
});

export const PaigeMe = StackNavigator({
        Loading: {screen: LoadingScreen},
        Welcome: {screen: WelcomeScreen},
        Chat: {screen: ChatScreen},
        ChatDetails: {screen: ChatDetailsScreen},
        CreateChatScreen: {screen: CreateChatScreen},
    }
);