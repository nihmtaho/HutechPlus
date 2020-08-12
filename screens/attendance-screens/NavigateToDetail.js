import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	AsyncStorage,
	ActivityIndicator,
	Image,
	SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Caption, Subheading, Paragraph } from "react-native-paper";
import HeaderComponent from "../../components/Header";

import { db } from "../../src/config/db";
import moment from "moment";

const sourceCheckInFalse = "../../assets/other-icon/040-error.png";
const sourceCheckInTrue = "../../assets/other-icon/020-wifi.png";

const NavigateToDetail = ({ navigation, route }) => {
	const { subjectCode } = route.params;
	const { address } = route.params;
	const { name_lecturer } = route.params;
	const { dataMoment } = route.params;
	const [nameClass, setNameClass] = useState("");
	const [nameLecturer, setNameLecturer] = useState("");
	const [validCheckIn, setValidCheckIn] = useState();
	const [dateOpen, setDateOpen] = useState();
	const [isLoad, setIsLoad] = useState(false);
	const [dateFirebase, setDateFirebase] = useState("");
	const [validHaveCheckIn, setValidHaveCheckIn] = useState(false);

	const [state, setState] = useState({
		subject_code: "",
		subject_name: "",
	});
	const { subject_code, subject_name } = state;

	const [momentState, setMomentState] = useState({
		year: "",
		month: "",
		day: "",
		timeMoment: "",
	});
	const { year, month, day } = momentState;

	useEffect(() => {
		try {
			_getAsyncCode();
			_fetchInfoSubject();
			_fetchInfoLecturer();
			_validHaveCheckIn();
			_cutString();
		} catch (error) {
			console.log("error list in useEffect: ", error);
		}
	}, []);

	const _getAsyncCode = async () => {
		setIsLoad(true);
		try {
			let nameClass_log = await AsyncStorage.getItem("nameClass");
			let mssv = await AsyncStorage.getItem("username");
			db.ref(
				"Subject/" + subjectCode + "/attendance/" + nameClass_log + "/"
			).on("value", (Snapshot) => {
				if (Snapshot.exists()) {
					const object_childCheckIn = Snapshot.child("stateCheckIn").val();
					let element;
					let element_dateOpen;
					for (
						let index = 0;
						index < Object.values(object_childCheckIn).length;
						index++
					) {
						element = Object.values(object_childCheckIn)[2];
						element_dateOpen = Object.values(object_childCheckIn)[0];
					}
					setValidCheckIn(element);
					setDateFirebase(element_dateOpen);
				}
				if (dataMoment === moment().format("YYYY-MM-DD")) {
					setDateOpen(true);
				} else {
					setDateOpen(false);
				}
			});

			setNameClass(nameClass_log);
		} catch (error) {}
	};

	const _cutString = () => {
		let year_log = dataMoment;
		let month_log = dataMoment;
		let day_log = dataMoment;
		setMomentState({
			year: year_log.substr(0, 4),
			month: month_log.substr(5, 2),
			day: day_log.substr(8, 2),
			timeMoment: moment().format("HH:mm:ss"),
		});
	};

	const _validHaveCheckIn = async () => {
		try {
			let nameClass_log = await AsyncStorage.getItem("nameClass");
			let mssv = await AsyncStorage.getItem("username");
			let year_log = dataMoment.substr(0, 4);
			let month_log = dataMoment.substr(5, 2);
			let day_log = dataMoment.substr(8, 2);
			db.ref(
				"Subject/" +
					subjectCode +
					"/attendance/" +
					nameClass_log +
					"/" +
					year_log +
					"/" +
					month_log +
					"/" +
					day_log +
					"/" +
					mssv +
					"/"
			).once("value", (Snapshot) => {
				if (Snapshot.exists()) {
					const element = Object.values(Snapshot.val())[2];
					setValidHaveCheckIn(element);
					setTimeout(() => {
						setIsLoad(false);
					}, 1200);
				} else {
					setTimeout(() => {
						setIsLoad(false);
					}, 1200);
				}
			});
		} catch (error) {}
	};

	const _fetchInfoSubject = () => {
		try {
			db.ref("Subject/" + subjectCode + "/").once("value", (Snapshot) => {
				if (Snapshot.exists()) {
					let object_log = Snapshot.val();
					let subjectCode_temp;
					let subjectName_temp;
					for (
						let index = 0;
						index < Object.values(object_log).length;
						index++
					) {
						subjectCode_temp = Object.values(object_log)[2];
						subjectName_temp = Object.values(object_log)[3];
					}
					if (subjectCode_temp && subjectName_temp) {
						setState({
							subject_code: subjectCode_temp,
							subject_name: subjectName_temp,
						});
					}
				}
			});
		} catch (error) {}
	};

	const _fetchInfoLecturer = () => {
		db.ref("Teachers/" + name_lecturer + "/").once("value", (Snapshot) => {
			if (Snapshot.exists()) {
				let value_log = Snapshot.child("fullname").val();
				setNameLecturer(value_log);
			}
		});
	};

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const _onPress = () => {
		navigation.navigate("Detail", {
			dataMoment: dataMoment,
			name_class: nameClass,
			subjectCode: subject_code,
			lecturer_code: name_lecturer,
		});
		wait(2000).then(() => navigation.goBack());
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent title="THÔNG TIN" onPress={() => navigation.goBack()} />
			<View style={styles.content}>
				{isLoad === true ? (
					<ActivityIndicator style={{ padding: 28 }} color="#00bcd4" />
				) : (
					<>
						<View style={styles.flexRow}>
							<View style={{ marginRight: 8 }}>
								<Caption>Mã môn học</Caption>
								<Subheading style={{ fontWeight: "bold" }}>
									{subject_code}
								</Subheading>
							</View>
							<View style={{ marginLeft: 8, width: "70%" }}>
								<Caption>Môn học</Caption>
								<Subheading style={{ fontWeight: "bold" }}>
									{subject_name}
								</Subheading>
							</View>
						</View>
						<View style={styles.flexRow}>
							<View style={{ marginRight: 8 }}>
								<Caption>Địa điểm</Caption>
								<Paragraph>{address}</Paragraph>
							</View>
							<View style={{ marginLeft: 8 }}>
								<Caption>Ngày học</Caption>
								<Paragraph>{dataMoment}</Paragraph>
							</View>
						</View>
						<View>
							<Caption>Giảng viên giảng dạy</Caption>
							<Paragraph>{nameLecturer}</Paragraph>
						</View>
						<View style={styles.flexRow}>
							<View style={{ marginRight: 8 }}>
								<Caption>Lớp của bạn</Caption>
								<Paragraph>{nameClass}</Paragraph>
							</View>
							<View style={{ marginLeft: 8 }}>
								<Caption>Trạng thái</Caption>
								{validCheckIn === true ? (
									<Paragraph>Điểm danh đang mở.</Paragraph>
								) : (
									<Paragraph>Điểm danh đang đóng.</Paragraph>
								)}
							</View>
						</View>
					</>
				)}
			</View>
			<View style={styles.contentImage}>
				{isLoad == true ? (
					<ActivityIndicator style={{ padding: 28 }} color="#00bcd4" />
				) : !validCheckIn ? (
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
				{isLoad == true ? (
					<ActivityIndicator style={{ padding: 28 }} color="#00bcd4" />
				) : !validCheckIn ? (
					<Caption style={{ textAlign: "center" }}>
						Giảng viên chưa mở điểm danh, quay lại sau nhé :).
					</Caption>
				) : dateOpen ? (
					validHaveCheckIn ? (
						<Caption>Bạn đã điểm danh thành công</Caption>
					) : (
						<Button
							color="#00bcd4"
							mode="contained"
							labelStyle={{ color: "#fff" }}
							contentStyle={{ height: 48 }}
							onPress={() => _onPress()}
						>
							Bắt đầu điểm danh
						</Button>
					)
				) : (
					<>
						<Caption style={{ textAlign: "center" }}>
							Có vẻ như bạn đang chọn sai ngày.
						</Caption>
						<Caption style={{ textAlign: "center" }}>
							Ngày điểm danh của bạn là:
						</Caption>
						<Caption style={{ textAlign: "center" }}>{dateFirebase}</Caption>
					</>
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
		flex: 0.7,
		padding: 8,
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
		marginBottom: 12,
	},
	contentImage: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	flexRow: {
		display: "flex",
		flexDirection: "row",
	},
});

export default NavigateToDetail;
