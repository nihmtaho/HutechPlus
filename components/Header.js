import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function Header(props){
    return(
        <View style={styles.content}>
            <View style={styles.itemLeft}>
            <TouchableOpacity
                    onPress={props.onPress}
                    style={{alignItems:"center", borderRadius: 999, justifyContent: "center",
                    padding: 10}}>
                    <AntDesign
                        name="arrowleft" size={24} color="#000" />
            </TouchableOpacity>
            </View>
            <View style={styles.itemMid}>
                <Text style={styles.textView}>Detail</Text>
            </View>
            <View style={styles.itemRight}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    itemLeft:{
        flex: 0.4, 
        alignItems: "center",
        justifyContent: "center",
    },
    itemMid:{
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    itemRight:{
        flex: 0.4
    },
    textView:{
        fontSize: 20,
        fontWeight: "bold"
    }
})