import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import {
	Button,
	Headline,
	Subheading,
	Divider,
	Text,
	Caption,
} from "react-native-paper";
import { db } from "../../src/config/db";
import * as Animatable from "react-native-animatable";
import moment from "moment";

const sourceImg = "../../assets/success.png";

const AttendanceSuccess = ({ navigation, route }) => {
	const [date, setDate] = useState(null);
	const [state, setState] = useState({
		logIsSuccess: "",
		status: "Bạn đã điểm danh thành công!",
	});
	const { logIsSuccess, status } = state;

	useEffect(() => {
		(async () => {
			setDate(moment().format("DD-MM-YYYY HH:mm"));
		})();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentImg}>
				<Animatable.Image
					animation="bounceIn"
					style={styles.successIcon}
					source={require(sourceImg)}
				/>
				<Headline>Xin chào {route.params.username[0]}</Headline>
				<Subheading>{status}</Subheading>
			</View>
			<View style={styles.contentMain}>
				<Divider style={{ marginTop: 6 }} />
				<View
					style={{
						marginVertical: 12,
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}
				>
					<View>
						<Text>Thời gian điểm danh:</Text>
						<Text>Trạng thái điểm danh:</Text>
					</View>
					<View>
						<Text>{date}</Text>
						<Text>{logIsSuccess}</Text>
					</View>
				</View>
				<Button
					style={{ marginTop: 20 }}
					mode="contained"
					uppercase={true}
					contentStyle={{ height: 54 }}
					color="#1E88E5"
					onPress={() => navigation.popToTop()}
				>
					Xác nhận và Quay về trang chủ
				</Button>
				<Caption style={{ textAlign: "center" }}>
					Bạn cần xác nhận bước này để điểm danh thành công
				</Caption>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
		// justifyContent: "center",
		backgroundColor: "#F7F7F7",
	},
	successText: {
		fontSize: 18,
		paddingVertical: 0,
	},
	successIcon: {
		width: 150,
		height: 150,
		marginBottom: 16,
	},
	contentImg: {
		flex: 0.8,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	contentMain: {
		// flex: 0.4,
	},
});

export default AttendanceSuccess;
