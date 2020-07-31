import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function listSubject(props) {
	const subItem = props.items;

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={props.onPress}
			style={styles.container}
		>
			<View style={styles.divContent}>
				{/* <Text style={(styles.titleStyle, styles.fontSize)}>{subjectName}</Text> */}
				<Text style={(styles.titleStyle, styles.fontSize)}> Thực tập tốt nghiệp</Text>
			</View>
			<View style={styles.mountContent}>
				<View style={styles.mountLeft}>
					{/* <Text style={styles.titleStyle}>Mã môn: {subjectID} </Text> */}
					<Text style={styles.titleStyle}>Mã môn: {subItem.idSubject} </Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#5D6D7E",
		padding: 12,
		marginVertical: 4,
		marginHorizontal: 10,
		borderRadius: 6,
	},
	divContent: {
		display: "flex",
		flexDirection: "row",
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
		borderTopColor: "#fff",
		paddingTop: 4,
		marginTop: 4,
	},
	mountLeft: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	titleStyle: {
		fontSize: 14,
		// fontWeight: "bold",
		color: "#fff",
	},
	fontSize: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#fff",
	},
});

export default listSubject;
