import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
// import HomeScreen from '../../screens/HomeScreen';
import HomeScreen from "../../screens/HomeScreenv2";
import DetailScreen from "../../screens/attendance-screens/DetailScreen";
import AttendanceSuccess from '../../screens/attendance-screens/AttendanceSuccess';
import NavigateToDetail from '../../screens/attendance-screens/NavigateToDetail';

const HomeStack = createStackNavigator();

const homeStack = ({ navigation, route }) => {
	if (route.state && route.state.index > 0) {
		navigation.setOptions({ tabBarVisible: false });
	} else {
		navigation.setOptions({ tabBarVisible: true });
	}
	return (
		<HomeStack.Navigator
			initialRouteName="Home"
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
			}}
		>
			<HomeStack.Screen
				name="Home"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<HomeStack.Screen
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
			<HomeStack.Screen
				name="NavigateToDetail"
				component={NavigateToDetail}
				options={{ headerShown: false }}
			/>
			<HomeStack.Screen
				name="AttendanceSuccess"
				component={AttendanceSuccess}
				options={{ headerShown: false }}
			/>
		</HomeStack.Navigator>
	);
};

export default homeStack;
