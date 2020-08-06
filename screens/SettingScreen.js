//Import Library
import React, { useEffect, useContext, useState } from "react";
import {
	StyleSheet,
	View,
	AsyncStorage,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { Button, Divider, Subheading } from "react-native-paper";
import { db } from "../src/config/db";

//Import Components
import ProfileView from "../components/profileView";
import MenuView from "../components/menuView";
import LearnView from "../components/learnView";
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
			<View style={styles.profileView}>
				{isLoading ? (
					<ActivityIndicator
						style={{
							backgroundColor: "#00bcd4",
							height: 120,
							marginBottom: 14,
							borderBottomEndRadius: 34,
							borderBottomStartRadius: 34,
						}}
						color="#b2ebf2"
					/>
				) : (
					<ProfileView
						name={fullName}
						subName={departmentName}
						subFaculty={email}
						onPress={() => navigation.navigate("Profile")}
					/>
				)}
			</View>
			{/* <LearnView title="8" /> */}
			{/* <Divider /> */}
			<ScrollView>
				<Subheading style={{ paddingLeft: 12, fontWeight: "bold" }}>
					Lựa chọn
				</Subheading>
				<MenuView
					title="Lịch sử điểm danh"
					iconLeft="calendar"
					iconRight="arrow-right"
					color="#0063cd"
					onPress={() => navigation.navigate("SubjectList")}
				/>
				<MenuView
					title="Đổi thông tin liên lạc"
					iconLeft="customerservice"
					iconRight="arrow-right"
					color="green"
				/>
				<MenuView
					title="Đổi mật khẩu"
					iconLeft="Safety"
					iconRight="arrow-right"
					color="green"
				/>
				<Subheading style={{ marginTop: 12, paddingLeft: 12, fontWeight: "bold" }}>
					Ứng dụng
				</Subheading>
				<MenuView
					title="Trợ giúp"
					iconLeft="questioncircle"
					iconRight="arrow-right"
					color="#0063cd"
				/>
				<MenuView
					title="Báo lỗi"
					iconLeft="exclamationcircle"
					iconRight="arrow-right"
					color="red"
				/>
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
});

export default SettingScreen;
