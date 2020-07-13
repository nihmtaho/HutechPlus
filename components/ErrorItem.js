import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ErrorItem = (props) => {
	return (
		<View
			style={{
				paddingHorizontal: 8,
				paddingVertical: 0,
				backgroundColor: "#e84a5f",
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-start",
				alignItems: "center",
			}}
		>
			<Entypo name="dot-single" size={24} color="white" />
			<Text style={{ color: "white" }}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default ErrorItem;
