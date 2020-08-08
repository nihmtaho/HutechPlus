import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	AsyncStorage,
	ActivityIndicator,
	Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
	Button,
	Caption,
	Title,
	Subheading,
	Paragraph,
} from "react-native-paper";
import Constants from "expo-constants";
import HeaderComponent from "../../components/Header";

import { db } from "../../src/config/db";

const sourceCheckInFalse = "../../assets/other-icon/040-error.png";
const sourceCheckInTrue = "../../assets/other-icon/020-wifi.png";

const NavigateToDetail = ({ navigation, route }) => {
	const { subjectCode } = route.params;
	const { address } = route.params;
	const [nameClass, setNameClass] = useState("");
	const [stateCheckIn, setStateCheckIn] = useState();
	const [validCheckIn, setValidCheckIn] = useState();
	const [isLoad, setIsLoad] = useState(false);

	const [state, setState] = useState({
		subject_code: "",
		subject_name: "",
	});
	const { subject_code, subject_name } = state;

	useEffect(() => {
		_getAsyncCode();
		_fetchInfoSubject();
	}, [subjectCode]);

	const _getAsyncCode = async () => {
		setIsLoad(true);

		try {
			let nameClass_log = await AsyncStorage.getItem("nameClass");
			db.ref(
				"Subject/" + subjectCode + "/attendance/" + nameClass_log + "/"
			).on("value", (Snapshot) => {
				const object_childCheckIn = Snapshot.child("stateCheckIn").val();
				let element;
				for (
					let index = 0;
					index < Object.values(object_childCheckIn).length;
					index++
				) {
					element = Object.values(object_childCheckIn)[2];
				}
				if (element) {
					setValidCheckIn(element);
				}
			});
			setNameClass(nameClass_log);
		} catch (error) {
			console.log("error list: ", error);
		}
	};

	const _fetchInfoSubject = () => {
		db.ref("Subject/" + subjectCode + "/").once("value", (Snapshot) => {
			// let subjectCode = Snapshot.child("subjectId").val();
			// let subjectName = Snapshot.child("subjectName").val();
			let object_log = Snapshot.val();
			let subjectCode_temp;
			let subjectName_temp;
			// console.log("object", object_log);
			for (let index = 0; index < Object.values(object_log).length; index++) {
				subjectCode_temp = Object.values(object_log)[2];
				subjectName_temp = Object.values(object_log)[3];
			}
			if (subjectCode_temp && subjectName_temp) {
				setState({
					subject_code: subjectCode_temp,
					subject_name: subjectName_temp,
				});
			}
		setIsLoad(false);

		});
	};

	const _actionOnPress = () => {

	}

	return (
		<View style={styles.container}>
			<HeaderComponent title="THÔNG TIN" onPress={() => navigation.goBack()} />
			<View style={styles.content}>
				{isLoad === true ? (
					<ActivityIndicator style={{ padding: 28 }} color="#00bcd4" />
				) : (
					<>
						<Subheading style={{fontWeight: "bold"}}>Mã môn học: {subject_code}</Subheading>
						<Subheading style={{fontWeight: "bold"}}>Môn học: {subject_name}</Subheading>
						<Paragraph>Địa điểm: {address}</Paragraph>
						<Paragraph>Lớp của bạn: {nameClass}</Paragraph>
						{validCheckIn === true ? (
							<Text>Điểm danh đang mở.</Text>
						) : (
							<Text>Điểm danh đang đóng.</Text>
						)}
						<Text>{JSON.stringify(stateCheckIn)}</Text>
					</>
				)}
			</View>
			<View style={styles.contentImage}>
				{!validCheckIn ? (
					<>
						<Image
							style={styles.imgIcon}
							source={require(sourceCheckInFalse)}
						/>
						<Paragraph>Bạn chưa thể điểm danh ngay bây giờ</Paragraph>
					</>
				) : (
					<>
						<Image style={styles.imgIcon} source={require(sourceCheckInTrue)} />
						<Paragraph>Bạn đã có thể điểm danh ngay</Paragraph>
					</>
				)}
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
		// backgroundColor: "#000"
	},
	contentButton: {
		flex: 0.3,
		padding: 8,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	imgIcon: {
		width: 120,
		height: 120,
		marginBottom: 12
	},
	contentImage: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default NavigateToDetail;
