import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';
import { db } from "../src/config/db";

const AttendanceSuccess = () => {

  const [svName, setSVName] = useState();

  useEffect(() => {
    let svName = await AsyncStorage.getItem("fullName");
    setSVName(svName);

    try {
			// send checkin status to DB
		} catch (error) {}
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.successIcon}
        source={require('./assets/success.png')}
      />
      <Text style={styles.successText}>
        Xin chào {svName}
        </Text>
      <Text style={styles.successText}>
        Điểm danh thành công
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F7F7F7",
  },
  successText: {
    fontSize: 18,
    paddingTop: 15,
  },
  successIcon: {
    width: 150,
    height: 150,
  }
})

export default AttendanceSuccess