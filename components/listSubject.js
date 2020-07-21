import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Title, Paragraph } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const listSubject = (props) => {
	return (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
			<View style={styles.detailView}>
				<Title style={{ fontSize: 16 }}>{props.name}</Title>
				<Paragraph style={{ fontSize: 12, marginTop: -4 }}>
					{props.subFaculty}
				</Paragraph>
				<Paragraph style={{ fontSize: 12, marginTop: -4 }}>
					{props.subName}
				</Paragraph>
			</View>
			<View style={styles.iconView}>
				<AntDesign name="right" size={14} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 12,
		alignItems: "center",
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

export default listSubject;
