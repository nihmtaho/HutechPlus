import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { Button } from 'react-native-paper';

import { AuthContext } from '../src/context'

function NotificationScreen(props) {
  const { navigation } = props
  const { signOut } = React.useContext(AuthContext)
  const { value, setValue } = React.useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.textView}>Comming soon...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textView: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})

export default NotificationScreen