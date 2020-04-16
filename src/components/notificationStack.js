import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import NotificationScreen from '../../screens/NotificationScreen';

const NotificationStack = createStackNavigator();

const notificationStack = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen name="Notification" component={NotificationScreen} options={{ title: "Thông báo" }} />
    </NotificationStack.Navigator>
  )
}

export default notificationStack;