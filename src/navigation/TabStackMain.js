import React from "react";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import {Image} from 'react-native';

import NotificationStack from "./notificationStack";
import SettingStack from "./settingStack";
import HomeStack from "./homeStack";

// const Tabs = createBottomTabNavigator();
const Tabs = createMaterialBottomTabNavigator();

const home_iconIsFocus = require("../../assets/home/isFocus-home.png");
const user_iconIsFocus = require("../../assets/user/isFocus-user.png");

const home_icon = require("../../assets/home/007-home.png");
const user_icon = require("../../assets/user/040-user.png");

const tabStackRoot = () => {
	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, focused }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? home_iconIsFocus : home_icon;
					} else if (route.name === "Setting") {
						iconName = focused ? user_iconIsFocus : user_icon;
					}
          return <Image source={iconName} style={{width: 24, height: 24}} />
				},
			})}
      shifting={true}
      barStyle={{backgroundColor: "#fefefe"}}
		>
			<Tabs.Screen
				name="Home"
				component={HomeStack}
				options={{ tabBarLabel: "Lịch học" }}
			/>
			<Tabs.Screen
				name="Setting"
				component={SettingStack}
				options={{ tabBarLabel: "Tài khoản" }}
			/>
		</Tabs.Navigator>
	);
};

export default tabStackRoot;
