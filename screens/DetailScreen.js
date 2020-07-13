import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Divider } from "react-native-paper";

const DetailScreen = ({ navigation }) => {
  return(
    <View style={{ flex: 1, backgroundColor: "#fffffffff" }}>
      <View style={styles.containerTop}>
        <Text> Hiển thị thông tin cần thiết </Text>
      </View>
      <Divider />
      <View style={styles.containerBottom}>
        <Button
          style={styles.button}
          mode="contained"
          uppercase={false}
          contentStyle={{ height: 54 }}
          onPress={() => { }} >Bắt đầu điểm danh</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerBottom: {
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  button: {
    marginBottom: 24
  }
})

export default DetailScreen