import React, { useState, useEffect, Component } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	AsyncStorage,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
	SafeAreaView
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import ListSubject from "../../components/listSubject";
import * as Animatable from "react-native-animatable";
import { db } from "../../src/config/db";
import { Ionicons } from "@expo/vector-icons";
import { Title, Button, Caption, Text } from "react-native-paper";
import { ceil } from "react-native-reanimated";

const SubjectsListScreen = ({ navigation }) => {
	const [valueData, setValueData] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		// _fetchData();
		_fetchSubjectCode();
	}, []);

	const _fetchSubjectCode = async () => {
		try {
			setIsLoad(true);
			let username = await AsyncStorage.getItem("username");
			db.ref("Students/" + username + "/schedule/").on("value", (Snapshot) => {
				if (Snapshot.exists()) {
					let unique_array = [];
					let value_snapshot = Snapshot.val();
					for (let index = 0; index < value_snapshot.length; index++) {
						let element_first = Object.values(value_snapshot[index])[1];
						for (let y = 0; y < element_first.length; y++) {
							let element_second = Object.values(element_first[y])[1];
							unique_array.push(element_second);
						}
					}
					unique_array = [...new Set(unique_array)];
					let arrayInfoSubject = [];

					for (let i = 0; i < unique_array.length; i++) {
						let value_of_array = unique_array[i];
						db.ref("Subject/" + value_of_array + "/").on(
							"value",
							(Snapshot) => {
								if (Snapshot.exists()) {
									let value_subjectCode = Object.values(Snapshot.val())[2];
									let value_subjectName = Object.values(Snapshot.val())[3];
									arrayInfoSubject.push({
										subjectCode: value_subjectCode,
										subjectName: value_subjectName,
									});
								}
							}
						);
					}
					setValueData(arrayInfoSubject);
					setRefreshing(false);
					setTimeout(() => {
						setIsLoad(false);
					}, 1500);
				}
			});
		} catch (error) {}
	};

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const _onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => _fetchSubjectCode());
	}, []);

	const _renderRow = ({ item }) => {
		return (
			<ListSubject
				dataProps={item}
				onPress={() =>
					navigation.push("HistoryScreen", {
						subjectCode: item.subjectCode,
					})
				}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Animatable.View
			animation="slideInDown"
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
			</Animatable.View>
			<View style={styles.content}>
				{isLoad ? (
					<Animatable.View
					animation="bounceIn" style={styles.centerScreen}>
						<ActivityIndicator color="#f08a5d" />
						<Caption>Đang tải danh sách</Caption>
					</Animatable.View>
				) : (
					<FlatList
						style={{ marginTop: 8 }}
						data={valueData}
						renderItem={_renderRow}
						keyExtractor={(item) => item.subjectCode}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
						}
					/>
				)}
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		padding: 4,
	},
	centerScreen: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SubjectsListScreen;
