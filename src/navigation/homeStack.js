import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import HomeScreen from '../../screens/HomeScreen';
import HomeScreen from '../../screens/HomeScreenv2';
import DetailScreen from '../../screens/DetailScreen';

const HomeStack = createStackNavigator();

const homeStack = ({ navigation, route }) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false })
  }
  else {
    navigation.setOptions({ tabBarVisible: true })
  }
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
      <HomeStack.Screen name="Detail" component={DetailScreen} options={{
        title: 'Điểm danh',
        headerTransparent: true,
        headerTitleStyle: {
          color: '#fff',
          fontWeight: "bold"
        },
        headerTitleAlign: "center",
        ...TransitionPresets.SlideFromRightIOS
      }} />
    </HomeStack.Navigator>
  )
}

export default homeStack;