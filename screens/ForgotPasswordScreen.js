import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

function ForgotPasswordScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.textView}>Chức năng đang hoàn thiện...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
	textView: {
		color: "#101010",
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default ForgotPasswordScreen;
