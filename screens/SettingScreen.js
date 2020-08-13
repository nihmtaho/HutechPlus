//Import Library
import React, { useEffect, useContext, useState } from "react";
import {
	StyleSheet,
	View,
	AsyncStorage,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Title, Divider, Subheading, Paragraph } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { db } from "../src/config/db";

//Import Components
import MenuView from "../components/menuView";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { AuthContext } from "../src/context";

const SettingScreen = ({ navigation }) => {
	const { signOut } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	const [state, setState] = useState({
		fullName: "",
		departmentName: "",
		email: "",
	});

	const { departmentName, fullName, email } = state;

	useEffect(() => {
		((async) => {
			setIsLoading(true);
			fetchStudent();
		})();

		return () => {};
	}, []);

	const fetchStudent = async () => {
		let emailUser;
		let idUsername;
		let fullNameUser;
		let departmentName;
		try {
			idUsername = await AsyncStorage.getItem("username");
			// fullNameUser = await AsyncStorage.getItem('fullName')
			db.ref("Students/" + idUsername).once("value", (Snapshot) => {
				emailUser = Snapshot.child("email").val();
				fullNameUser = Snapshot.child("fullname").val();
				let departmentCode = Snapshot.child("departmentCode").val();

				db.ref("Departments/" + departmentCode).once("value", (Snapshot) => {
					departmentName = Snapshot.child("departmentName").val();
					setState({
						fullName: fullNameUser,
						email: emailUser,
						departmentName: departmentName,
					});
					setIsLoading(false);
				});
			});
		} catch (error) {}
	};

	return (
		<View style={styles.container}>
			{/* <ProfileView
				name={fullName}
				subName={departmentName}
				subFaculty={email}
				onPress={() => navigation.push("Profile")}
			/> */}
			<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
				<View
					style={{
						backgroundColor: "#f08a5d",
						display: "flex",
						flexDirection: "row",
						paddingVertical: 12,
						alignItems: "center",
						paddingTop: Constants.statusBarHeight,
						borderBottomEndRadius: 34,
						borderBottomStartRadius: 34,
						marginBottom: 14,
						height: 120,
						justifyContent: "center",
					}}
				>
					{isLoading ? (
						<ActivityIndicator color="#f6ab6c" />
					) : (
						<>
							<Animatable.View animation="fadeIn" style={styles.avatarView}>
								<Image
									style={{ width: 60, height: 60 }}
									source={require("../assets/profile-user/student-boy.png")}
								/>
							</Animatable.View>

							<Animatable.View animation="fadeIn" style={styles.detailView}>
								<Title style={{ fontSize: 16, color: "#fff" }}>
									{fullName}
								</Title>
								<Paragraph
									style={{ fontSize: 12, marginTop: -4, color: "#fff" }}
								>
									{email}
								</Paragraph>
								<Paragraph
									style={{ fontSize: 12, marginTop: -4, color: "#fff" }}
								>
									{departmentName}
								</Paragraph>
							</Animatable.View>
							<Animatable.View animation="fadeIn" style={styles.iconView}>
								<Entypo name="dot-single" size={34} color="#a2de96" />
								<Paragraph
									style={{ fontSize: 9, marginTop: -16, color: "#fff" }}
								>
									active
								</Paragraph>
							</Animatable.View>
						</>
					)}
				</View>
			</TouchableOpacity>
			<ScrollView>
				<Animatable.View animation="fadeIn">
					<Subheading style={{ paddingLeft: 12, fontWeight: "bold" }}>
						Lựa chọn
					</Subheading>
					<MenuView
						title="Lịch sử điểm danh"
						iconRight="arrow-right"
						iconImg={require("../assets/calendar/015-calendar.png")}
						onPress={() => navigation.navigate("SubjectList")}
					/>
					<MenuView
						title="Đổi thông tin liên lạc"
						iconRight="arrow-right"
						iconImg={require("../assets/help/004-ticket.png")}
					/>
					<MenuView
						title="Đổi mật khẩu"
						iconRight="arrow-right"
						iconImg={require("../assets/password/002-protection.png")}
					/>
					<Subheading
						style={{ marginTop: 12, paddingLeft: 12, fontWeight: "bold" }}
					>
						Ứng dụng
					</Subheading>
					<MenuView
						title="Trợ giúp"
						iconRight="arrow-right"
						iconImg={require("../assets/help/015-loupe.png")}
					/>
					<MenuView
						title="Báo lỗi"
						iconRight="arrow-right"
						iconImg={require("../assets/other-icon/040-error.png")}
						onPress={() => navigation.navigate("BugScreen")}
					/>
					<MenuView
						title="Giới thiệu"
						iconRight="arrow-right"
						iconImg={require("../assets/other-icon/045-medal.png")}
						onPress={() => navigation.navigate("BugScreen")}
					/>
				</Animatable.View>
			</ScrollView>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	button: {
		position: "absolute",
		bottom: 24,
		left: 0,
		right: 0,
	},
	avatarView: {
		flex: 0.6,
		alignItems: "center",
		marginLeft: 12,
	},
	detailView: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		flex: 2,
	},
	iconView: {
		flex: 0.5,
		display: "flex",
		alignItems: "center",
	},
});

export default SettingScreen;
