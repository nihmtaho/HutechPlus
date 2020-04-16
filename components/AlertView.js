import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';


function AlertView(props) {
    return(
        <View
            onPress={props.onPress}
            style={styles.container}>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: StatusBar.currentHeight,
        backgroundColor: '#98d6ea',
        borderBottomColor: 'blue',
        borderBottomWidth: 4,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
})

export default AlertView;