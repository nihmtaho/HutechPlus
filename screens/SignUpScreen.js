import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

function SignUpScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.textView}>Sign Up Screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    }
})

export default SignUpScreen;