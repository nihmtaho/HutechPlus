import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SettingScreen from '../../screens/SettingScreen';
import ProfileScreen from "../../screens/ProfileScreen";

const SettingStack = createStackNavigator();

const settingStack = ({ route, navigation }) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false })
  }
  else {
    navigation.setOptions({ tabBarVisible: true })
  }
  return (
    <SettingStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS
      }}>
      <SettingStack.Screen name="Setting" component={SettingScreen} options={{ title: "Tài khoản", headerShown: false }} />
      <SettingStack.Screen name="Profile" component={ProfileScreen} options={{ title: "Tài khoản", headerShown:false }} />
    </SettingStack.Navigator>
  )
}

export default settingStack;