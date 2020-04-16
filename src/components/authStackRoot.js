import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';

const AuthStack = createStackNavigator();

const authStackRoot = () => {
  return (
    <AuthStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen}
        options={{
          headerShown: false
        }} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
        options={{
          headerTitleAlign: 'center'
        }} />
    </AuthStack.Navigator>
  )
}

export default authStackRoot; 