import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import SettingScreen from "../../screens/SettingScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SubjectsListScreen from "../../screens/history-screens/SubjectsListScreen";
import HistoryScreen from "../../screens/history-screens/HistoryScreen";
import BugScreen from "../../screens/bug-a-help-screens/BugScreen";

const SettingStack = createStackNavigator();

const settingStack = ({ route, navigation }) => {
	if (route.state && route.state.index > 0) {
		navigation.setOptions({ tabBarVisible: false });
	} else {
		navigation.setOptions({ tabBarVisible: true });
	}
	return (
		<SettingStack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<SettingStack.Screen
				name="Setting"
				component={SettingScreen}
				options={{ title: "Tài khoản", headerShown: false }}
			/>
			<SettingStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: "Tài khoản",
					headerShown: false,
					...TransitionPresets.FadeFromBottomAndroid,
				}}
			/>
			<SettingStack.Screen
				name="SubjectList"
				component={SubjectsListScreen}
				options={{
					title: "Môn học",
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
			<SettingStack.Screen
				name="HistoryScreen"
				component={HistoryScreen}
				options={{
					title: "Lịch sử điểm danh",
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
			<SettingStack.Screen
				name="BugScreen"
				component={BugScreen}
				options={{
					title: "Báo lỗi",
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
		</SettingStack.Navigator>
	);
};

export default settingStack;
