import React from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'

import Button from '../components/Button';
import Card from '../components/Card';
// import SpaceStatusBar from '../components/SpaceStatusBar';

function HomeScreen(props) {
    const { navigation } = props
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContent}>
                <View style={{height: StatusBar.currentHeight}} ></View>
                <Card onPress={() => navigation.push('Detail')} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    textView: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttonContainer: {
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#000'
    },
    calendarContent:{
        flex: 0.7,
        borderBottomColor: "#cccccc",
        borderBottomWidth: .8,
        alignItems: "center",
        justifyContent: "center"
    },
    scrollViewContent:{
        flex: 2,
    }
})


export default HomeScreen