import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const historyCheck = (props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={props.onPress}
			style={styles.container}
		>
			<View style={styles.divContent}>
				{/* <Text style={(styles.titleStyle, styles.fontSize)}>{subjectName}</Text> */}
				<Text style={(styles.titleStyle, styles.fontSize)}>
					Thực tập tốt nghiệp
				</Text>
				<Text style={styles.titleStyle}>Thời gian điểm danh: {props.times}</Text>
			</View>
			<View style={styles.mountContent}>
				<View style={styles.mountLeft}>
					{/* <Text style={styles.titleStyle}>Mã môn: {subjectID} </Text> */}
					<Text style={styles.titleStyle}>{props.isCheck}</Text>
					<Text style={styles.titleStyle}>Tuần {props.weeks}</Text>
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
        borderRadius: 6,
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
        justifyContent: "space-between"
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
});

export default historyCheck;
