import React, { useState, useEffect, Component } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	AsyncStorage,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	ToastAndroid,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ListSubject from "../../components/listSubject";
// import { AuthContext } from "../src/context";
import { db } from "../../src/config/db";
import { Ionicons } from "@expo/vector-icons";
import { Title, Button, Caption, Text } from "react-native-paper";
import { ceil } from "react-native-reanimated";

const listIdSubject = [];
const subjectItem = [];
let unique = [];
let dataSubject = [];
let tempData = [];

const SubjectsListScreen = ({ navigation }) => {
	const [dataRoom, setDataRoom] = useState([]);
	const [test, setTest] = useState({
		subjectCode: "",
		subjectName: "",
	});
	const [listFound, setListFound] = useState(undefined);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		_fetchData();
		return () => {};
	}, []);

	const _fetchData = async () => {
		let idUsername;
		idUsername = await AsyncStorage.getItem("username");
		db.ref("Students/" + idUsername + "/schedule/").on(
			"value",
			(Snapshot) => {
				tempData = Snapshot.val();
			}
		);

		for (let i = 0; i < tempData.length; i++) {
			const element = tempData[i];
			const convertObject = Object.values(element)[1]; // Get value index 1
			for (let i = 0; i < convertObject.length; i++) {
				const element = convertObject[i];
				subjectItem.push(Object.values(element)[1]);
			}
		}
		unique = [];
		unique = [...new Set(subjectItem)];
		// setListFound({ ...unique });

		let subjectId_log;
		let subjectName_log;
		dataSubject = [];
		for (let i = 0; i < unique.length; i++) {
			const subjectCode_log = unique[i];
			// console.log(subjectCode_log);
			// Fetch info Subjects
			db.ref("Subject/" + subjectCode_log + "/").on("value", (Snapshot) => {
				subjectId_log = Snapshot.child("subjectId").val();
				subjectName_log = Snapshot.child("subjectName").val();
				// console.log(subjectId_log, subjectName_log);
				dataSubject.push({
					subjectCode: Snapshot.child("subjectId").val(),
					subjectName: Snapshot.child("subjectName").val(),
				});
				// console.log("dataSubject", dataSubject);
				setDataRoom(dataSubject);
			});
		}
		// setIsLoading(false);
	};

	const _actionTest = () => {
		// Alert.alert("Thông báo", "_onPress", [
		// 	{
		// 		text: "OK",
		// 		style: "cancel",
		// 	},
		// ]);
	};

	const _renderRow = ({ item }) => {
		return (
			<ListSubject
				dataProps={item}
				onPress={() =>
					navigation.navigate("HistoryScreen", {
						subjectCode: item.subjectCode,
					})
				}
			/>
		);
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					backgroundColor: "#f08a5d",
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
						zIndex: 999,
					}}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="md-arrow-round-back" size={26} color="#fff" />
				</TouchableOpacity>
				<Title style={{ color: "#fff", textAlign: "center" }}>
					CHỌN MÔN HỌC
				</Title>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					Chọn một môn học để xem nhật kí điểm danh
				</Caption>
			</View>
			<Caption
				style={{
					paddingHorizontal: 8,
					textAlign: "center",
				}}
			>
				Vui lòng khởi động lại ứng dụng nếu bạn đã đăng nhập bằng tài khoản khác
			</Caption>
			<FlatList
				style={{ marginTop: 8 }}
				data={dataSubject}
				renderItem={_renderRow}
				keyExtractor={(item) => item.subjectCode}
				refreshing={isLoading}
				onRefresh={_fetchData}
			/>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: 8,
	},
});

export default SubjectsListScreen;
