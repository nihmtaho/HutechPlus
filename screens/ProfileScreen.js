import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	StatusBar,
	ScrollView,
	TouchableOpacity,
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

const ProfileScreen = ({ navigation }, props) => {
	const [state, setState] = useState({
		userCode: "",
		fullName: "",
	});

	return (
		<ScrollView style={{ backgroundColor: "#fff" }}>
			<View style={{ height: StatusBar.currentHeight }} />
			<TouchableOpacity
				style={styles.iconBack}
				onPress={() => navigation.goBack()}
			>
				<AntDesign name="back" size={26} />
				<Text>Back</Text>
			</TouchableOpacity>
			<View style={styles.headerBlock}>
				<Avatar.Icon size={120} icon="account" />
				<Headline style={{ marginVertical: 8 }}>Truong Minh Thao</Headline>
				<Paragraph style={styles.custom}>1611060383</Paragraph>
			</View>
			<Divider />
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
	);
};
const styles = StyleSheet.create({
	headerBlock: {
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 20,
	},
	bodyBlock: {
		paddingHorizontal: 12,
	},
	detailBlock: {
		marginVertical: 4,
	},
	iconBack: {
		position: "absolute",
		top: StatusBar.currentHeight + 12,
		left: 18,
	},
	custom: {
		backgroundColor: "green",
		width: 100,
		textAlign: "center",
		color: "#fff",
		borderRadius: 5,
		paddingVertical: 2,
	},
});

export default ProfileScreen;
