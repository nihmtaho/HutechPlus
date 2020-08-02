import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground,
} from "react-native";
import { Title, Paragraph } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";

let imgBackground = "../assets/background/25499.jpg";

const profileView = (props) => {
	return (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
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
					marginBottom: 14
				}}
			>
				<View style={styles.avatarView}>
					{/* <Avatar.Image
					size={54}
					style={{ backgroundColor: "#ffffff" }}
					source={require("../assets/profile-user/student-boy.png")}
				/> */}
					<Image
						style={{ width: 60, height: 60 }}
						source={require("../assets/profile-user/student-boy.png")}
					/>
				</View>

				<View style={styles.detailView}>
					<Title style={{ fontSize: 16, color: "#fff" }}>{props.name}</Title>
					<Paragraph style={{ fontSize: 12, marginTop: -4, color: "#fff" }}>
						{props.subFaculty}
					</Paragraph>
					<Paragraph style={{ fontSize: 12, marginTop: -4, color: "#fff" }}>
						{props.subName}
					</Paragraph>
				</View>
				<View style={styles.iconView}>
					<Entypo name="dot-single" size={34} color="#a2de96" />
					<Paragraph style={{ fontSize: 9, marginTop: -16, color: "#fff" }}>active</Paragraph>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
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

export default profileView;
