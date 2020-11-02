import React from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";

//TODO: Import only Screens and Components
import Contact from "../components/Contact";

//TODO: Attribute
import { AuthContext } from "../src/context";
const imgSource = "../assets/logo.png";

function LoginScreen(props) {
	const { navigation } = props;
	const { signIn } = React.useContext(AuthContext);

	const [username, setUsername] = React.useState(null);
	const [password, setPassword] = React.useState(null);
	const [request, setRequest] = React.useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<View style={styles.contentTopLayout}>
					<Animatable.Image
						animation="fadeInDown"
						style={styles.imgLogo}
						source={require(imgSource)}
					/>
					{!request ? (
						<ActivityIndicator
							style={{ display: "none" }}
							size="small"
							color="#1E88E5"
						/>
					) : (
						<ActivityIndicator
							style={{ position: "absolute", bottom: 8 }}
							size="small"
							color="#1E88E5"
						/>
					)}
				</View>
				<Animatable.View animation="slideInUp" style={styles.contentMidLayout}>
					<TextInput
						style={{ marginVertical: 5 }}
						label="ID/MSSV"
						color="#1E88E5"
						keyboardType="number-pad"
						onFocus={() => setRequest(false)}
						onChangeText={(textUsername) => setUsername(textUsername)}
					/>

					<TextInput
						style={{ marginVertical: 5 }}
						secureTextEntry={true}
						autoCapitalize="none"
						label="Mật khẩu"
						color="#1E88E5"
						keyboardType="default"
						onFocus={() => setRequest(false)}
						onChangeText={(textPassword) => setPassword(textPassword)}
					/>

					<Button
						style={{ marginVertical: 10 }}
						contentStyle={{ height: 54 }}
						color="#1E88E5"
						mode="contained"
						onPress={() =>
							signIn(username, password) ? setRequest(true) : setRequest(false)
						}
					>
						Đăng Nhập
					</Button>

					<View style={{ display: "flex", alignItems: "flex-end" }}>
						<Button
							uppercase={false}
							mode="outlined"
							color="#1E88E5"
							onPress={() => navigation.navigate("ForgotPassword")}
						>
							Quên mật khẩu?
						</Button>
					</View>
					<View style={{marginTop: "24%"}}>
						<Contact />
					</View>
				</Animatable.View>
				<StatusBar style="auto" />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	contentTopLayout: {
		flex: 1 / 3,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: Constants.statusBarHeight,
	},
	contentMidLayout: {
		flex: 2 / 3,
		height: "100%",
		paddingTop: 20,
		paddingRight: 20,
		paddingLeft: 20,
		paddingBottom: 20,
	},
	imgLogo: {
		width: 154,
		height: 154,
		margin: 40,
	},
});

export default LoginScreen;
