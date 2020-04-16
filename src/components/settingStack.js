import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SettingScreen from '../../screens/SettingScreen';

const SettingStack = createStackNavigator();

const settingStack = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Setting" component={SettingScreen} options={{ title: "Tài khoản" }} />
    </SettingStack.Navigator>
  )
}

export default settingStack;