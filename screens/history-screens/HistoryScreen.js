import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	AsyncStorage,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
	SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import HistoryCheck from "../../components/historyCheck";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { Text, Title, Caption } from "react-native-paper";
import { db } from "../../src/config/db";

const HistoryScreen = ({ navigation, route }) => {
	const { subjectCode } = route.params;
	const [data, setData] = useState();
	const [haveObj, setHaveObj] = useState();
	const [subjName, setSubjName] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [isLoad, setIsLoad] = useState(false);

	useEffect(() => {
		_fetchObject();
		return () => {};
	}, []);

	const _fetchObject = async () => {
		try {
			setIsLoad(true);
			let username = await AsyncStorage.getItem("username");
			let class_name = await AsyncStorage.getItem("nameClass");
			db.ref("Subject/" + subjectCode + "/attendance/" + class_name + "/").once(
				"value",
				(Snapshot) => {
					if (Snapshot.exists()) {
						if (Snapshot.child("2020/08").exists()) {
							let value = Object.values(Snapshot.child("2020/08").val());
							let data_log = [];
							for (let index = 0; index < value.length; index++) {
								const obj_value = value[index];
								for (const key in obj_value) {
									if (key == username) {
										let element = obj_value[key];
										data_log.push(element);
									}
								}
							}
							setData(data_log);
							setHaveObj(true);
							setRefreshing(false);
							setTimeout(() => {
								setIsLoad(false);
							}, 1500);
						} else {
							setHaveObj(false);
							setRefreshing(false);
							setTimeout(() => {
								setIsLoad(false);
							}, 1500);
						}
					} else {
						setHaveObj(false);
						setRefreshing(false);
						setTimeout(() => {
							setIsLoad(false);
						}, 1500);
					}
				}
			);
			db.ref("Subject/" + subjectCode + "/").on("value", (Snapshot) => {
				if (Snapshot.exists()) {
					let value = Snapshot.child("subjectName").val();
					setSubjName(value);
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
		wait(1000).then(() => _fetchObject());
	}, []);

	const _renderRow = ({ item, index }) => {
		return (
			<HistoryCheck
				times={item.dateCheckIn}
				isCheck={item.valueCheckIn}
				weeks={item.dateCheckIn}
				titleSubj={subjName}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentHeader}>
				<TouchableOpacity
					style={styles.customTouch}
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
			<View style={styles.content}>
				{isLoad ? (
					<Animatable.View animation="bounceIn" style={styles.centerScreen}>
						<ActivityIndicator color="#96bb7c" />
						<Caption style={{ textAlign: "center" }}>Đang tải dữ liệu</Caption>
					</Animatable.View>
				) : haveObj ? (
					<FlatList
						data={data}
						renderItem={_renderRow}
						keyExtractor={(i, k) => k.toString()}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
						}
					/>
				) : (
					<Caption style={{ textAlign: "center" }}>Not found data</Caption>
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
	contentHeader: {
		backgroundColor: "#96bb7c",
		paddingTop: Constants.statusBarHeight + 8,
		height: 110,
		borderBottomStartRadius: 32,
		borderBottomEndRadius: 32,
		display: "flex",
		justifyContent: "flex-end",
		paddingBottom: 8,
		elevation: 4,
	},
	customTouch: {
		position: "absolute",
		top: Constants.statusBarHeight,
		left: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 999,
		zIndex: 999,
	},
	content: {
		flex: 1,
	},
	centerScreen: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default HistoryScreen;
