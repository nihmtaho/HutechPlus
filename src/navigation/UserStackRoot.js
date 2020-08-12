import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import BugScreen from "../../screens/bug-a-help-screens/BugScreen";
import AttendanceSuccess from '../../screens/attendance-screens/AttendanceSuccess';
import DetailScreen from "../../screens/attendance-screens/DetailScreen";

import MainTab from "./TabStackMain";

const UserStack = createStackNavigator();

const UserStackRoot = () => {
	return (
		<UserStack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<UserStack.Screen
				name="MainTab"
				component={MainTab}
				options={{ headerShown: false }}
			/>
			<UserStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					headerShown: false,
					...TransitionPresets.FadeFromBottomAndroid,
				}}
			/>
			<UserStack.Screen
				name="BugScreen"
				component={BugScreen}
				options={{
					title: "Báo lỗi",
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
			<UserStack.Screen
				name="AttendanceSuccess"
				component={AttendanceSuccess}
				options={{ headerShown: false }}
			/>
			<UserStack.Screen
				name="Detail"
				component={DetailScreen}
				options={{
					headerShown: false,
					title: "Điểm danh",
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleAlign: "center",
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</UserStack.Navigator>
	);
};

export default UserStackRoot;
