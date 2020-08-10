import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const historyCheck = (props) => {
	// const {data} = dataPro

	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={styles.container}
		>
			<View style={styles.divContent}>
				<Text style={(styles.titleStyle, styles.fontSize)}>
					{props.titleSubj}
				</Text>
				<Text style={styles.titleStyle}>
					Thời gian điểm danh: {props.times}
				</Text>
			</View>
			<View style={styles.mountContent}>
				<View style={styles.mountLeft}>
					{props.isCheck == true ? (
						<Text style={(styles.titleStyle, styles.colorGreen)}>
							ĐÃ ĐIỂM DANH
						</Text>
					) : (
						<Text style={(styles.titleStyle, styles.colorRed)}>
							CHƯA ĐIỂM DANH
						</Text>
					)}
					<Text style={styles.titleStyle}>Lần {props.weeks}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: 12,
		marginVertical: 4,
		marginHorizontal: 10,
		borderRadius: 14,
		elevation: 1,
	},
	divContent: {
		display: "flex",
		flexDirection: "column",
		marginVertical: 2,
	},
	rightContent: {
		flex: 1,
		marginTop: 8,
	},
	mountContent: {
		display: "flex",
		flexDirection: "row",
		borderTopWidth: 0.5,
		borderTopColor: "gray",
		paddingTop: 4,
		marginTop: 4,
	},
	mountLeft: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		// alignItems: "center",
		justifyContent: "space-between",
	},
	titleStyle: {
		fontSize: 14,
		// fontWeight: "bold",
		// color: "#fff",
	},
	fontSize: {
		fontSize: 16,
		fontWeight: "bold",
		// color: "#fff",
	},
	colorRed: {
		color: "red",
	},
	colorGreen: {
		color: "#96bb7c"
	}
});

export default historyCheck;
