import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Constants from 'expo-constants';


function Contact(params) {
    return(
        <View style={{ display: "flex", alignItems: "center", backgroundColor: "#fff" }}>
            <View style={{ display: "flex", flexDirection: "row", width: '35%', justifyContent: "space-around", marginBottom: 14 }}>
                <TouchableOpacity>
                    <FontAwesome name="youtube-play" size={28} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="facebook-square" size={28} color="#139CF8" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="instagram" size={28} color="#000000" />
                </TouchableOpacity>
            </View>
            <Text>{`Build ${Constants.manifest.version}-beta-release`}</Text>
        </View>
    )
}

export default Contact;