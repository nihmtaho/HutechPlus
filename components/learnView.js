import React from "react"
import { View, StyleSheet } from "react-native"
import { Paragraph } from "react-native-paper"

const learnView = ( props ) => {
    return (
        <View style={styles.warningBlock}>
            <Paragraph style={{ marginLeft: 12, color: "#fff" }}>
                Học kì này bạn đã vắng: { props.title } buổi
                </Paragraph>
        </View>
    )
}

const styles = StyleSheet.create({
    warningBlock: {
        padding: 8,
        backgroundColor: "red"
    }
})

export default learnView;