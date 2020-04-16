import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';

import { AuthContext } from '../src/context'

function SettingScreen(props) {
    const { navigation } = props
    const { signOut } = React.useContext(AuthContext)

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="transparent" barStyle='dark-content' /> */}
            <Button color="#000" mode="outlined" onPress={() => signOut()} >Đăng xuất</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
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

export default SettingScreen