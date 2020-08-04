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

const listIdSubject = [];
const subjectItem = [];
let unique = [];
let dataSubject = [];
let tempData = [];

class SubjectsListScreen extends Component {
	async componentDidMount() {
		let idUsername;
		idUsername = await AsyncStorage.getItem("username");
		this.setState({ idUsername: idUsername });
		console.log("idUser", this.state.idUsername);
		unique = [];
		setTimeout(() => {
			this._findSubjectLearning();
		}, 500);
		this._findSubjectLearning();
	}

	async componentWillUnmount() {
		this._findSubjectLearning();
	}

	_findSubjectLearning = () => {
		const { idUsername } = this.state;
		db.ref("Students/" + idUsername + "/schedule/").once(
			"value",
			(Snapshot) => {
				this.setState({ tempData_log: Snapshot.val() });
				// tempData = Snapshot.val();

				const { tempData_log } = this.state;
				for (let i = 0; i < tempData_log.length; i++) {
					const element = tempData_log[i];
					const convertObject = Object.values(element)[1]; // Get value index 1
					for (let i = 0; i < convertObject.length; i++) {
						const element = convertObject[i];
						subjectItem.push(Object.values(element)[1]);
					}
				}
				unique = [...new Set(subjectItem)];
				this.setState({ listSubjectId: unique });

				const { listSubjectId } = this.state;
				dataSubject = [];
				for (let i = 0; i < listSubjectId.length; i++) {
					db.ref("Subject/" + listSubjectId[i] + "/").once(
						"value",
						(Snapshot) => {
							let subjectId_log = Snapshot.child("subjectId").val();
							let subjectName_log = Snapshot.child("subjectName").val();
							dataSubject.push({
								id: subjectId_log,
								name: subjectName_log,
							});
						}
					);
				}
			}
		);
	};

	_setListSubject = async () => {};

	constructor(props) {
		super(props);
		this.state = {
			tempData_log: [],
			listSubjectId: [],
		};
	}

	_fetchInfoSubject = () => {
		const { listSubjectId } = this.state;
		for (let i = 0; i < listSubjectId.length; i++) {
			db.ref("Subject/" + listSubjectId[i] + "/").once("value", (Snapshot) => {
				let subjectId_log = Snapshot.child("subjectId").val();
				let subjectName_log = Snapshot.child("subjectName").val();
				dataSubject.push({
					id: subjectId_log,
					name: subjectName_log,
				});
			});
		}
		console.log("info", dataSubject);
	};

	render() {
		// this._fetchInfoSubject();

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
							top: Constants.statusBarHeight,
							left: 2,
							paddingVertical: 12,
							paddingHorizontal: 18,
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
						onPress={() => this.props.navigation.goBack()}
					>
						<Ionicons name="md-arrow-round-back" size={24} color="#fff" />
					</TouchableOpacity>
					<Title style={{ color: "#fff", textAlign: "center" }}>
						CHỌN MÔN HỌC
					</Title>
					<Caption style={{ textAlign: "center", marginTop: -6 }}>
						Chọn một môn học để xem nhật kí điểm danh
					</Caption>
				</View>
				{/* <Text>{JSON.stringify(listFound)}</Text> */}
				<Text>{JSON.stringify(this.state.listSubjectId)}</Text>
				<Text>list data: {JSON.stringify(dataSubject)}</Text>
				{/* <FlatList
					style={{ marginTop: 8 }}
					data={data_log}
					renderItem={_renderRow}
					keyExtractor={(item) => item.subjectCode}
				/> */}
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
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: 8,
	},
});

export default SubjectsListScreen;
