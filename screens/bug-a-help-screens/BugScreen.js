import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Caption, Title } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import HeaderComponent from "../../components/Header";

const BugScreen = ({ navigation, route }) => {
	return (
		<View style={styles.container}>
			<HeaderComponent
				title="BÁO LỖI"
				subTitle="Cung cấp chi tiết thông tin lỗi xảy ra"
				onPress={() => navigation.goBack()}
			/>
			<View style={styles.content}>
				<Image
					style={styles.image}
					source={require("../../assets/011-sandclock.png")}
				/>
				<Title style={{color: "#222831"}}>Coming-Soon</Title>
			</View>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	content: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		width: 120,
		height: 120,
		resizeMode: "center"
	}
});

export default BugScreen;
