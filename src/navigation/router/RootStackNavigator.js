import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Toast } from "react-native-root-toaster";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { AsyncStorage, Alert, YellowBox, Platform } from "react-native";
// import firebase from "firebase";
import { db } from "../../config/db";

// TODO: Import Screen dir
import SplashScreen from "../../../screens/SplashScreen";
// import TabStack from "../mainStackRoot";
import UserStack from "../UserStackRoot";
import AuthStack from "../authStackRoot";

import { AuthContext } from "../../context";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
	if (message.indexOf("Setting a timer") <= -1) {
		_console.warn(message);
	}
};

const RootStack = createStackNavigator();

// TODO: Function render default
function RootStackNavigator({ navigation }) {
	const [username, setUsername] = React.useState("");

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;
			let username;

			try {
				userToken = await AsyncStorage.getItem("userToken");
				username = await AsyncStorage.getItem("username");
			} catch (e) {
				// Restoring token failed
			}
			dispatch({ type: "RESTORE_TOKEN", token: userToken });
		};

		bootstrapAsync();

		setTimeout(() => {
			// setIsLoading(false);
		}, 1500);
	}, []);

	const getToken = () => {
		let token;
		try {
			token = AsyncStorage.getItem("userToken");
		} catch (error) {}
		return token;
	};

	const authContext = React.useMemo(
		() => ({
			signIn: async (username, password) => {
				let usernameToken;
				if (username !== null && password !== null) {
					db.ref("Students/" + username).once("value", (Snapshot) => {
						let data = Snapshot.val() ? Snapshot.val() : {};
						var hasUsername = Snapshot.child("username").val();
						setUsername(hasUsername);
						let fullName = Snapshot.child("fullname").val();
						let name_class = Snapshot.child("classCode").val();

						if (hasUsername != username) {
							Platform.OS == "ios"
								? Toast.show("Tài khoản không tồn tại", 5000)
								: Toast.show("\n" + "Tài khoản không tồn tại", 5000);
						} else {
							if (data.password != password) {
								Platform.OS == "ios"
									? Toast.show("Mật khẩu không chính xác!", 5000)
									: Toast.show("\n" + "Mật khẩu không chính xác!", 5000);
							} else if (data.password == password) {
								usernameToken = Snapshot.child("tokenLogin").val();
								// let deviceLogin = Snapshot.child("deviceAlive");
								// Snapshot.set({
								//     "deviceAlive": true
								// })
								try {
									AsyncStorage.setItem("userToken", usernameToken);
									AsyncStorage.setItem("username", hasUsername);
									AsyncStorage.setItem("fullName", fullName);
									AsyncStorage.setItem("nameClass", name_class);
								} catch (error) {}
								dispatch({ type: "SIGN_IN", token: getToken() });
							}
						}
					});
				} else {
					Platform.OS == "ios"
						? Toast.show("Vui lòng điền đầy đủ ID và Mật khẩu", 5000)
						: Toast.show("\n" + "Vui lòng điền đầy đủ ID và Mật khẩu", 5000);
				}
			},
			signOut: () => {
				try {
					AsyncStorage.removeItem("userToken");
					AsyncStorage.removeItem("username");
					AsyncStorage.removeItem("fullName");
					AsyncStorage.removeItem("nameClass");
				} catch (error) {}
				dispatch({ type: "SIGN_OUT" });
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{state.isLoading ? (
					<SplashScreen />
				) : (
					<RootStack.Navigator
						headerMode="none"
						screenOptions={{
							...TransitionPresets.ScaleFromCenterAndroid,
						}}
					>
						{state.userToken == null ? (
							<RootStack.Screen name="Auth" component={AuthStack} />
						) : (
							<RootStack.Screen name="Main" component={UserStack} />
						)}
					</RootStack.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

export default RootStackNavigator;
