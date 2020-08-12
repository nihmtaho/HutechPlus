import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Subheading, Divider, TouchableRipple } from "react-native-paper";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const menuView = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={styles.container}>
				<View style={styles.iconView}>
					{/* <AntDesign name={props.iconLeft} size={20} color={props.color} /> */}
					<Image source={props.iconImg} style={{ width: 22, height: 22 }} />
				</View>
				<View style={styles.titleView}>
					<Subheading style={{ fontSize: 14 }}>{props.title}</Subheading>
				</View>
				<View style={styles.iconView}>
					<SimpleLineIcons name={props.iconRight} size={12} color="black" />
				</View>
			</View>
			<Divider style={{ marginLeft: 60 }} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 14,
		flexDirection: "row",
		alignItems: "center",
	},
	titleView: {
		flex: 2,
		marginLeft: 8,
	},
	iconView: {
		flex: 0.5,
		alignItems: "center",
	},
});

export default menuView;
