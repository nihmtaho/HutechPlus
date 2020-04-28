import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import NotificationStack from './notificationStack';
import SettingStack from './settingStack';
import HomeStack from './homeStack';

// const TabsMaterial = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();

const tabStackRoot = () => {
  return(
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'calendar';
          } else if (route.name === 'Setting') {
            iconName = 'user';
          }
          else if (route.name === 'Notification') {
            iconName = 'notification';
          }
          return <AntDesign name={iconName} size={22} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} options={{ title: 'Lịch học' }} />
      <Tabs.Screen name="Notification" component={NotificationStack} options={{ title: 'Thông báo' }} />
      <Tabs.Screen name="Setting" component={SettingStack} options={{ title: 'Tài khoản' }} />
    </Tabs.Navigator>
  )
}

// const tabStack = () => {
//   return (
//     <TabsMaterial.Navigator
//       initialRouteName="Home"
//       shifting={true}
//       sceneAnimationEnabled={false}
//       activeColor="red"
//       inactiveColor="gray"
//       barStyle={{ backgroundColor: '#ffffff' }} >
//       <TabsMaterial.Screen name="Home" component={HomeStack}
//         options={{
//           title: 'Trang chủ',
//           tabBarIcon: ({ color }) => (
//             <AntDesign name="home" size={24} color={color} />
//           ),
//         }} />
//       <TabsMaterial.Screen name="Notification" component={NotificationStack}
//         options={{
//           title: 'Thông báo',
//           tabBarIcon: ({ color }) => (
//             <AntDesign name="notification" size={24} color={color} />
//           ),
//         }} />
//       <TabsMaterial.Screen name="Setting" component={SettingStack}
//         options={{
//           title: 'Tài khoản',
//           tabBarIcon: ({ color }) => (
//             <AntDesign name="user" size={24} color={color} />
//           ),
//         }} />
//     </TabsMaterial.Navigator>
//   )
// }

export default tabStackRoot;