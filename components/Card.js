import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const learnTime = [
	{
		caHoc: 1,
		tietHoc: 1,
		start: "06:45",
		end: "7:30",
	},
	{
		caHoc: 1,
		tietHoc: 2,
		start: "07:30",
		end: "08:15",
	},
	{
		caHoc: 1,
		tietHoc: 3,
		start: "08:20",
		end: "09:05",
	},
	{
		caHoc: 2,
		tietHoc: 4,
		start: "09:20",
		end: "10:05",
	},
	{
		caHoc: 2,
		tietHoc: 5,
		start: "10:05",
		end: "10:50",
	},
	{
		caHoc: 2,
		tietHoc: 6,
		start: "10:55",
		end: "11:40",
	},
	{
		caHoc: 3,
		tietHoc: 7,
		start: "12:30",
		end: "13:15",
	},
	{
		caHoc: 3,
		tietHoc: 8,
		start: "13:15",
		end: "14:00",
	},
	{
		caHoc: 3,
		tietHoc: 9,
		start: "14:05",
		end: "14:50",
	},
	{
		caHoc: 4,
		tietHoc: 10,
		start: "15:05",
		end: "15:50",
	},
	{
		caHoc: 4,
		tietHoc: 11,
		start: "15:50",
		end: "16:35",
	},
	{
		caHoc: 4,
		tietHoc: 12,
		start: "16:40",
		end: "17:25",
	},
	{
		caHoc: 5,
		tietHoc: 13,
		start: "18:00",
		end: "18:45",
	},
	{
		caHoc: 5,
		tietHoc: 14,
		start: "18:45",
		end: "19:30",
	},
	{
		caHoc: 5,
		tietHoc: 15,
		start: "19:30",
		end: "20:15",
	},
];

function Card(props) {
	const todaySubject = props.timeTable;
	const lession = todaySubject.time;
	const tietHoc = lession.split(",");

	console.log(learnTime[tietHoc-1]);
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={props.onPress}
			style={styles.container}
		>
			<View style={styles.divContent}>
				<Text style={styles.titleStyle, styles.fontSize}>{todaySubject.subject_name}</Text>
			</View>
			<View style={styles.divContent}>
				<View style={styles.rightContent}>
					<Text style={styles.titleStyle}>
						Địa điểm: {todaySubject.address}
					</Text>
				</View>
			</View>
			<View style={styles.mountContent}>
				<View style={styles.mountLeft}>
					<Text style={styles.titleStyle}>Thời gian học: </Text>
					<Text style={styles.titleStyle}>
						{learnTime[tietHoc[0]-1].start} -{" "}
						{learnTime[tietHoc[tietHoc.length - 2]].end}
					</Text>
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
	}
});

export default Card;
