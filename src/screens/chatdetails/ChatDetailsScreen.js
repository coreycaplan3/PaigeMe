/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import globalStyles from "../../styles/GlobalStyles";

export default class ChatDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.otherUser.name,
        headerStyle: globalStyles.bgPrimaryColor,
    });

    render() {
        const chatId = this.props.navigation.state.params.chatId;
        return (
            <View>
                <Text>Hello Chat Details - {chatId}</Text>
            </View>
        );
    }

}