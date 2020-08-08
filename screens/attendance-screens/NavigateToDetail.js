import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Caption } from "react-native-paper";
import Constants from "expo-constants";
import HeaderComponent from "../../components/Header";

import { db } from "../../src/config/db";

const NavigateToDetail = ({ navigation, route }) => {
	const { subjectCode } = route.params;
	const { address } = route.params;
	const [nameClass, setNameClass] = useState("");
	const [stateCheckIn, setStateCheckIn] = useState({});
	const [validCheckIn, setValidCheckIn] = useState();

	const [state, setState] = useState({
		subject_code: "",
		subject_name: "",
	});
	const { subject_code, subject_name } = state;

	useEffect(() => {
		setTimeout(() => {
			_fetchInfoSubject();
			_getStateCheckIn();
		}, 500);
		_fetchInfoSubject();
		_getStateCheckIn();
		_getValidCheckIn();
	}, [subjectCode]);

	const _getAsyncCode = async () => {
		try {
			let nameClass = await AsyncStorage.getItem("nameClass");
			setNameClass(nameClass);
		} catch (error) {}
	};

	const _fetchInfoSubject = () => {
		db.ref("Subject/" + subjectCode + "/").on("value", (Snapshot) => {
			let subjectCode = Snapshot.child("subjectId").val();
			let subjectName = Snapshot.child("subjectName").val();

			setTimeout(() => {
				setState({ subject_code: subjectCode, subject_name: subjectName });
			}, 200);
		});
		_getAsyncCode();
	};

	const _getStateCheckIn = () => {
		db.ref("Subject/" + subjectCode + "/attendance" + nameClass + "/").on(
			"value",
			(Snapshot) => {
				Snapshot.forEach((element) => {
					setStateCheckIn(element.child("stateCheckIn").val());
					let state = element.child("stateCheckIn").val();
					let value_temp;
					for (let i = 0; i < Object.values(state).length; i++) {
						value_temp = Object.values(state)[2];
					}
					console.log(value_temp);
					setValidCheckIn(value_temp);
				});
			}
		);
	};

	const _getValidCheckIn = () => {
		// let element = Object.values(stateCheckIn)[2];
	};

	return (
		<View style={styles.container}>
			<HeaderComponent title="THÔNG TIN" onPress={() => navigation.goBack()} />
			<View style={styles.content}>
				<Text>subject id: {subject_code}</Text>
				<Text>subject name: {subject_name}</Text>
				<Text>subject address: {address}</Text>
				<Text>name class: {nameClass}</Text>
				{validCheckIn ? <Text>valid</Text> : <Text>un valid</Text>}
			</View>
			<View style={styles.contentButton}>
				{!validCheckIn ? (
					<Caption style={{ textAlign: "center" }}>
						Giảng viên chưa mở điểm danh, vui lòng quay lại sau.
					</Caption>
				) : (
					<Button
						mode="contained"
						onPress={() => navigation.navigate("Detail")}
					>
						Bắt đầu điểm danh
					</Button>
				)}
			</View>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 0.7,
		padding: 8,
	},
	contentButton: {
		flex: 0.3,
		padding: 8,
	},
});

export default NavigateToDetail;
