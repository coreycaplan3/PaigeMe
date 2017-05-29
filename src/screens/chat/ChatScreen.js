/**
 * Created by Corey on 5/28/2017.
 */
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';

export default class ChatScreen extends Component {

    static navigationOptions = {
        title: "PaigeMe",
        headerStyle: globalStyles.bgPrimaryColor
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello Chat</Text>
                <Button title="Go to Chat" onPress={() => {
                    this.props.navigation.navigate("ChatDetails")
                }}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});