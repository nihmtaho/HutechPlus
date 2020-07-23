import React from 'react'
import { StyleSheet, SafeAreaView, View, Image, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const imgSource = '../assets/logo.png'

function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContent}>
                <Image style={styles.imgLogo} source={require(imgSource)} />
                {/* <ActivityIndicator size='large' color='#E53935' /> */}
            </View>
            <View style={styles.companyContent}>
                <MaterialCommunityIcons name="material-ui" size={52} color="#E53935" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContent:{
        flex: 1,
        justifyContent: 'center'
    },
    companyContent:{
        position: 'absolute',
        bottom: 62,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: "center",
    },
    textView: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    imgLogo: {
        width: 154,
        height: 154,
        margin: 24
    }
})

export default SplashScreen