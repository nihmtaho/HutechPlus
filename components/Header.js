import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Text, Caption, Title } from "react-native-paper";

export default function Header(props) {
	return (
		<View style={styles.content}>
			<TouchableOpacity style={styles.itemLeft} onPress={props.onPress}>
				<Ionicons name="md-arrow-round-back" size={26} color="#fff" />
			</TouchableOpacity>
			<Title style={{ color: "#fff", textAlign: "center" }}>
				{props.title}
			</Title>
			<Caption style={{ textAlign: "center", marginTop: -6 }}>
				{props.subTitle}
			</Caption>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#f08a5d",
		paddingTop: Constants.statusBarHeight + 8,
		height: 110,
		borderBottomStartRadius: 32,
		borderBottomEndRadius: 32,
		display: "flex",
		justifyContent: "flex-end",
		paddingBottom: 8,
		elevation: 4,
	},
	itemLeft: {
		position: "absolute",
		top: Constants.statusBarHeight,
		left: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 999,
		zIndex: 999,
	},
	itemMid: {
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
	},
});
