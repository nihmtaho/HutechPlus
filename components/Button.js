import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

function Button(props) {
    return (
        <TouchableOpacity 
            activeOpacity={0.5}
            onPress={props.onPress}
            style={styles.buttonContent}>
            <Text style={styles.buttonText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContent: {
        backgroundColor: '#1E88E5',
        shadowColor: '#2AC062',
        shadowOpacity: 1,
        elevation: 2,

        padding: 16,
        width: ' 100%',
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})


export default Button