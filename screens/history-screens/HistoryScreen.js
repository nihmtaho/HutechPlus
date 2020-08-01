import React, {useState} from "react";
import { View, StyleSheet, ScrollView, FlatList, AsyncStorage } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import HistoryCheck from "../../components/historyCheck";

// const renderRow = ({ item, index }) => {
// 	return <ListSubject />;
// };

const HistoryScreen = ({ navigation }) => {

//    const

	return (
		<View style={styles.container}>
			<HistoryCheck times="18/07/2020" isCheck="Đã điểm danh" weeks="1" />
			<HistoryCheck times="01/08/2020" isCheck="Chưa điểm danh" weeks="2" />
            <StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 8
	},
});

export default HistoryScreen;
