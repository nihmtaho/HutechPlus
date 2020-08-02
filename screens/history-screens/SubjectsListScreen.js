import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	AsyncStorage,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ListSubject from "../../components/listSubject";
// import { AuthContext } from "../src/context";
import { db } from "../../src/config/db";
import { MaterialIcons } from "@expo/vector-icons";
import { Title, Subheading, Caption, Text } from "react-native-paper";

const listIdSubject = [];
const subjectItem = [];
let unique;
const data_log = [];

const SubjectsListScreen = ({ navigation }) => {
	const [state, setState] = useState({
		listData: [],
		listFound: [],
	});
	const { listData, listFound } = state;

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			// data_log = [];

			setIsLoading(true);
			_findSubjectLearning();
			_fetchSubjectInfo();
		})();
		return () => {
			// console.log("Out Screen...");
		};
	}, []);

	const _findSubjectLearning = async () => {
		let idUsername;
		let tempData;
		try {
			idUsername = await AsyncStorage.getItem("username");
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

	const _fetchSubjectInfo = async () => {
		for (let i = 0; i < listFound.length; i++) {
			const subjectCode_log = listFound[i];
			// Fetch info Subjects
			db.ref("Subject/" + subjectCode_log + "/").once("value", (Snapshot) => {
				let subjectCode_log = Snapshot.child("subjectId").val();
				let subjectName_log = Snapshot.child("subjectName").val();

				data_log.push({
					subjectCode: subjectCode_log,
					subjectName: subjectName_log,
				});
				// console.log(data);
				setState({ listData: data_log });
			});
		}
	};

	const _actionTest = () => {
		Alert.alert("Thông báo", "_onPress", [
			{
				text: "OK",
				style: "cancel",
			},
		]);
	};

	const _renderRow = ({ item }) => {
		return <ListSubject dataProps={item} />;
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
				}}
			>
				<TouchableOpacity
					style={{
						position: "absolute",
						top: Constants.statusBarHeight + 8,
						left: 8,
						padding: 10,
					}}
					onPress={() => navigation.goBack()}
				>
					<MaterialIcons name="arrow-back" size={26} color="#fff" />
				</TouchableOpacity>
				<Title style={{ color: "#fff", textAlign: "center" }}>
					CHỌN MÔN HỌC
				</Title>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					Chọn một môn học để xem nhật kí điểm danh
				</Caption>
			</View>
			<FlatList
				style={{ marginTop: 8 }}
				data={data_log}
				renderItem={_renderRow}
				keyExtractor={(item) => item.subjectCode}
			/>
			{/* {isLoading ? (
				<ActivityIndicator style={{ padding: 28 }} color="#f6ab6c" />
			) : (
				<FlatList
					style={{ marginTop: 8 }}
					data={data_log}
					renderItem={_renderRow}
					keyExtractor={(item) => item.subjectCode}
				/>
			)} */}
			{/* </View> */}
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
