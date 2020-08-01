import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	ImageBackground
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
import {StatusBar} from 'expo-status-bar';

let imgB = "../assets/background/25499.jpg";
let userImage = "../assets/profile-user/student-boy.png";

const ProfileScreen = ({ navigation }, props) => {
	const [state, setState] = useState({
		userCode: "",
		fullName: "",
	});

	return (
		<View style={{ backgroundColor: "#fff", flex: 1 }}>
			<ImageBackground
				source={require(imgB)}
				style={{display: "flex", resizeMode: "cover", paddingTop: Constants.statusBarHeight}}
			>
				<TouchableOpacity
					style={styles.iconBack}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name="back" size={26} color="#fff" />
					<Text style={{color: "#fff"}}>Back</Text>
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
					<Headline style={{ marginVertical: 8, color: "#fff" }}>Truong Minh Thao</Headline>
					<Paragraph style={styles.custom}>1611060383</Paragraph>
				</View>
			</ImageBackground>
			<Divider />
			<ScrollView style={{ backgroundColor: "#fff" }}>
				<View style={styles.bodyBlock}>
					<Subheading style={{ paddingTop: 12, fontWeight: "bold" }}>
						Thông tin cơ bản
					</Subheading>
					<View style={styles.detailBlock}>
						<Caption>Chuyên ngành</Caption>
						<Text>Công nghệ thông tin</Text>
					</View>
					<View style={styles.detailBlock}>
						<Caption>Khoa/Viện</Caption>
						<Text>Viện công nghệ Việt - Nhật</Text>
					</View>
					<View style={styles.detailBlock}>
						<Caption>Khoá học</Caption>
						<Text>2016 - 2020</Text>
					</View>
					<View style={styles.detailBlock}>
						<Caption>Hệ đào tạo</Caption>
						<Text>Đại học chính quy (chuẩn Nhật Bản)</Text>
					</View>
					<Divider style={{ marginTop: 4 }} />
					<Subheading style={{ paddingTop: 12, fontWeight: "bold" }}>
						Thông tin liên lạc
					</Subheading>
					<View style={styles.detailBlock}>
						<Caption>Email</Caption>
						<Text>thaotruogg@gmail.com</Text>
					</View>
					<View style={styles.detailBlock}>
						<Caption>Số điện thoại</Caption>
						<Text>0389999999</Text>
					</View>
					<View style={styles.detailBlock}>
						<Caption>Địa chỉ</Caption>
						<Text>TP.HCM</Text>
					</View>
				</View>
			</ScrollView>
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
		// top: Constants.statusBarHeight + 12,
		left: 18,
		bottom: 12,
	},
	custom: {
		backgroundColor: "#c4fb6d",
		width: 100,
		textAlign: "center",
		color: "#000",
		borderRadius: 5,
		paddingVertical: 2,
	},
});

export default ProfileScreen;
