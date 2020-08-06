import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	AsyncStorage,
	TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import HistoryCheck from "../../components/historyCheck";
import { Ionicons } from "@expo/vector-icons";


import { Text, Title, Caption } from "react-native-paper";

// const renderRow = ({ item, index }) => {
// 	return <ListSubject />;
// };

const HistoryScreen = ({ navigation, route }) => {
	const { subjectCode } = route.params;
	return (
		<View style={styles.container}>
			<View
				style={{
					backgroundColor: "#96bb7c",
					paddingTop: Constants.statusBarHeight + 8,
					height: 110,
					borderBottomStartRadius: 32,
					borderBottomEndRadius: 32,
					display: "flex",
					justifyContent: "flex-end",
					paddingBottom: 8,
					elevation: 4,
				}}
			>
				<TouchableOpacity
					style={{
						position: "absolute",
						top: Constants.statusBarHeight,
						left: 8,
						paddingHorizontal: 16,
						paddingVertical: 12,
						borderRadius: 999,
						zIndex: 999
					}}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="md-arrow-round-back" size={26} color="#fff" />
				</TouchableOpacity>
				<Title style={{ color: "#fff", textAlign: "center" }}>
					LỊCH SỬ ĐIỂM DANH
				</Title>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					Dưới đây là nhật kí điểm danh môn
				</Caption>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					{subjectCode}
				</Caption>
			</View>
			<HistoryCheck times="18/07/2020" isCheck="Đã điểm danh" weeks="1" />
			<HistoryCheck times="01/08/2020" isCheck="Chưa điểm danh" weeks="2" />
			<Text>{subjectCode}</Text>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default HistoryScreen;
