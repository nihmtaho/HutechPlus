import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Title, Divider, Paragraph } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';

const profileView = (props) => {
    return (
        <TouchableOpacity style={styles.container} >
            <View style={styles.avatarView} >
                <Avatar.Icon size={64} icon="account" style={{ backgroundColor: "#0063cd" }} />
            </View>
            <View style={styles.detailView}>
                <Title>{props.name}</Title>
                <Divider />
                <Paragraph>{props.subName}</Paragraph>
                <Paragraph>{props.subFaculty}</Paragraph>
            </View>
            <View style={styles.iconView}>
                <AntDesign name="right" size={20} />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 12,
        alignItems: "center",
    },
    avatarView: {
        flex: 0.5,
        alignItems: "center",
        marginLeft: 12
    },
    detailView: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        flex: 2,
    },
    iconView: {
        flex: 0.5,
        display: "flex",
        alignItems: "center"
    },
})

export default profileView;