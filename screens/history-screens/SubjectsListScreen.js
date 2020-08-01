import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, AsyncStorage } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ListSubject from "../../components/listSubject";
// import { AuthContext } from "../src/context";
import { db } from "../../src/config/db";

const listIdSubject = [];
const subjectItem = [];
let unique;

const renderRow = ({ item, index }) => {
	return <ListSubject items={item} />;
};

const SubjectsListScreen = ({ navigation }) => {
	const [state, setState] = useState({
		listData: null,
		listFound: null
	});
	const { listData, listFound } = state;

	useEffect(() => {
		const findSubjectLearning = async () => {
			let idUsername;
			let tempData;
			try {
				idUsername = await AsyncStorage.getItem("username");
				console.log(idUsername);
				db.ref("Students/" + idUsername + "/schedule/").once(
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
						listIdSubject.push(element);
					}
				}
				for (let i = 0; i < listIdSubject.length; i++) {
					const data = Object.values(listIdSubject[i])[1];
					subjectItem.push(data);
				}
				unique = [...new Set(subjectItem)];
				setState({ listFound: unique });
			} catch (error) {}
		};
		setTimeout(() => {
			findSubjectLearning();
		}, 2000);

		return () => {
			console.log("Out Screen...");
		};
	}, []);

	return (
		<View style={styles.container}>
			{/* <ListSubject onPress={() => navigation.navigate("HistoryScreen")} /> */}
			{/* <FlatList
				data={unique}
				renderItem={renderRow}
				keyExtractor={(i, k) => k.toString()}
			/> */}
			<Text>{JSON.stringify(listFound)}</Text>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 8,
	},
});

export default SubjectsListScreen;
