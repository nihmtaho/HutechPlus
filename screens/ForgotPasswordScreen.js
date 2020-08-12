import React from "react";
import { StyleSheet, View, ScrollView, Text, Platform, SafeAreaView } from "react-native";
import { Button, TextInput, Caption } from "react-native-paper";
import { Toast } from "react-native-root-toaster";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

function ForgotPasswordScreen({ navigation }) {
	const sendMessage = () => {
		Platform.OS == "ios"
			? Toast.show(
					"Thông tin đã được gửi \nHãy kiểm tra địa chỉ email của bạn",
					2000
			  )
			: Toast.show(
					"\n" + "Thông tin đã được gửi \nHãy kiểm tra địa chỉ email của bạn",
					2000
			  );

		setTimeout(() => {
			Platform.OS == "ios"
				? Toast.show("Tự động quay về trang Đăng nhập", 2000)
				: Toast.show("\n" + "Tự động quay về trang Đăng nhập", 2000);
		}, 2000);

		setTimeout(() => {
			navigation.navigate("Login");
		}, 2000);
	};
	return (
		<SafeAreaView style={styles.container}>
			<Caption>Vui lòng nhập ID hoặc MSSV</Caption>
			<TextInput
				style={{ marginVertical: 5 }}
				label="ID/MSSV"
				color="#1E88E5"
				keyboardType="number-pad"
			/>
			<Button
				style={{ marginVertical: 10 }}
				contentStyle={{ height: 54 }}
				color="#1E88E5"
				mode="contained"
				onPress={() => sendMessage()}
			>
				Gửi thông tin
			</Button>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
		paddingTop: Constants.statusBarHeight,
		// alignItems: "center",
		// justifyContent: "center",
		backgroundColor: "white",
	},
	textView: {
		color: "#101010",
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default ForgotPasswordScreen;
