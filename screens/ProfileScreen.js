import React, { useEffect, useContext, useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	AsyncStorage,
	Alert,
} from "react-native";
import {
	Text,
	Headline,
	Paragraph,
	Divider,
	Avatar,
	Subheading,
	Caption,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { db } from "../src/config/db";
import { AuthContext } from "../src/context";

let imgB = "../assets/background/25499.jpg";
let userImage = "../assets/profile-user/student-boy.png";

const ProfileScreen = ({ navigation }, props) => {
	const { signOut } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({
		departmentName: "",
		majorName: "",
		data: [],
	});

	const { data, departmentName, majorName } = state;

	useEffect(() => {
		(async () => {
			// Load data from Firebase
			setIsLoading(true);
			_fetchData();
		})();
		return () => {
			//cleanup, don't remove return... please!!!
		};
	}, []);

	const _fetchData = async () => {
		let username = await AsyncStorage.getItem("username");
		// fetch data
		db.ref("Students/" + username).once("value", (Snapshot) => {
			if (Snapshot.exists()) {
				let departmentCode_log = Snapshot.child("departmentCode").val();
				let majorCode_log = Snapshot.child("majorCode").val();

				let yearInOut_log = Snapshot.child("yearInOut").val();
				let fullName_log = Snapshot.child("fullname").val();
				let email_log = Snapshot.child("email").val();
				let address_log = Snapshot.child("addressUser").val();
				let numberPhone_log = Snapshot.child("phoneNumber").val();
				let classUser_log = Snapshot.child("classCode").val();
				let trainingSystem_log = Snapshot.child("trainingSystem").val();

				const data_log = [];
				data_log.push(
					fullName_log,
					username,
					email_log,
					address_log,
					numberPhone_log,
					classUser_log,
					yearInOut_log,
					trainingSystem_log
				);

				db.ref("Departments/" + departmentCode_log).once(
					"value",
					(Snapshot) => {
						if (Snapshot.exists()) {
							let departmentName_log = Snapshot.child("departmentName").val();

							db.ref("Majors/" + majorCode_log).once("value", (Snapshot) => {
								let majorName_log = Snapshot.child("majorName").val();

								setState({
									departmentName: departmentName_log,
									majorName: majorName_log,
									data: data_log,
								});
								setIsLoading(false);
							});
						}
					}
				);
			}
		});
	};

	const _logOutAction = () => {
		Alert.alert("Đăng xuất", "Bạn sẽ được đăng xuất tài khoản ngay bây giờ", [
			{
				text: "Hủy",
				style: "cancel",
			},
			{
				text: "Đồng ý",
				onPress: () => {
					signOut();
				},
			},
		]);
	};

	return (
		<View style={{ backgroundColor: "#fff", flex: 1 }}>
			<View
				style={{
					display: "flex",
					backgroundColor: "#00bcd4",
					paddingTop: Constants.statusBarHeight,
					borderBottomEndRadius: 34,
					borderBottomStartRadius: 34,
					elevation: 4,
				}}
			>
				<TouchableOpacity
					style={styles.iconBack}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name="back" size={26} color="#fff" />
					<Text style={{ color: "#fff", fontSize: 11, marginTop: 4 }}>
						Trở về
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.iconLogOut}
					onPress={() => _logOutAction()}
				>
					<AntDesign name="logout" size={26} color="#fff" />
					<Text style={{ color: "#fff", fontSize: 11, marginTop: 4 }}>
						Đăng xuất
					</Text>
				</TouchableOpacity>
				<View style={styles.headerBlock}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Image
							style={{ width: 100, height: 100 }}
							source={require(userImage)}
						/>
					</View>
					{isLoading ? (
						<ActivityIndicator style={{ padding: 28 }} color="#b2ebf2" />
					) : (
						<>
							<Headline style={{ marginVertical: 8, color: "#fff" }}>
								{data[0]}
							</Headline>
							<Paragraph style={styles.custom}>{data[1]}</Paragraph>
						</>
					)}
				</View>
			</View>
			{isLoading ? (
				<ActivityIndicator style={{ padding: 28 }} color="#00bcd4" />
			) : (
				<ScrollView style={{ backgroundColor: "#fff" }}>
					<View style={styles.bodyBlock}>
						<Subheading style={{ paddingTop: 12, fontWeight: "bold" }}>
							Thông tin cơ bản
						</Subheading>
						<View style={styles.detailBlock}>
							<Caption>Lớp</Caption>
							<Text>{data[5]}</Text>
						</View>
						<View style={styles.detailBlock}>
							<Caption>Chuyên ngành</Caption>
							<Text>{majorName}</Text>
						</View>
						<View style={styles.detailBlock}>
							<Caption>Khoa/Viện</Caption>
							<Text>{departmentName}</Text>
						</View>
						<View style={styles.detailBlock}>
							<Caption>Khoá học</Caption>
							<Text>{data[6]}</Text>
						</View>
						<View style={styles.detailBlock}>
							<Caption>Hệ đào tạo</Caption>
							<Text>{data[7]}</Text>
						</View>
						<Divider style={{ marginTop: 4 }} />
						<Subheading style={{ paddingTop: 12, fontWeight: "bold" }}>
							Thông tin liên lạc
						</Subheading>
						<View style={styles.detailBlock}>
							<Caption>Email</Caption>
							<Text>{data[2]}</Text>
						</View>
						<View style={styles.detailBlock}>
							<Caption>Số điện thoại</Caption>
							<Text>{data[4]}</Text>
						</View>
						<View style={styles.detailBlock}>
							<Caption>Địa chỉ</Caption>
							<Text>{data[3]}</Text>
						</View>
					</View>
				</ScrollView>
			)}
			<StatusBar style="inverted" />
		</View>
	);
};
const styles = StyleSheet.create({
	headerBlock: {
		alignItems: "center",
		paddingTop: 16,
		paddingBottom: 16,
	},
	bodyBlock: {
		paddingHorizontal: 12,
	},
	detailBlock: {
		marginVertical: 4,
	},
	iconBack: {
		position: "absolute",
		left: 18,
		top: Constants.statusBarHeight + 12,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 999,
	},
	iconLogOut: {
		position: "absolute",
		right: 18,
		top: Constants.statusBarHeight + 12,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 998,
	},
	custom: {
		backgroundColor: "#fff",
		// width: 100,
		textAlign: "center",
		color: "#000",
		borderRadius: 5,
		paddingVertical: 2,
		paddingHorizontal: 12,
	},
});

export default ProfileScreen;
