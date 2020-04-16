import React from 'react'
import { StyleSheet, AsyncStorage, View, TouchableOpacity, StatusBar, Image, ActivityIndicator, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import firebase from "firebase";

//TODO: Import only Screens and Components
import ButtonCus from '../components/Button';
import Input from '../components/Input';
import Contact from '../components/Contact';

//TODO: Attribute
import { AuthContext } from '../src/context';
const imgSource = '../assets/logo.png';

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

function LoginScreen(props) {
    const { navigation } = props;
    const { signIn } = React.useContext(AuthContext);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [request, setRequest] = React.useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyAZ5RVA-zXlsk92on6GTFASaRf4KEGEyDo",
        authDomain: "hutech-education.firebaseapp.com",
        databaseURL: "https://hutech-education.firebaseio.com",
        projectId: "hutech-education",
        storageBucket: "hutech-education.appspot.com",
        messagingSenderId: "501319299038",
        appId: "1:501319299038:web:bd745da80ec5bf68c7f74f",
        measurementId: "G-Q92Y4KVQ9D"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    function checkLogin(username, password) {
        if (username != '' && password != '') {
            setRequest(true);
            firebase.database().ref('Node-Students/' + username).once('value', Snapshot => {
                let data = Snapshot.val() ? Snapshot.val() : {};
                var hasPassword = Snapshot.hasChild('password');

                if (!hasPassword) {
                    Alert.alert("Error", "Account not found!", [{ text: 'OK' }])
                    setRequest(false)
                }
                else if (data.password != password) {
                    Alert.alert("Error", "Login Fail!", [{ text: 'OK' }])
                    setRequest(false)
                }
                else if (data.password === password) {
                    signIn();
                    setRequest(false)
                }
            });
        }
        else {
            Alert.alert("Error", "Username or Password missing!", [{ text: 'OK' }]);
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.contentTopLayout}>
                <Image style={styles.imgLogo} source={require(imgSource)} />
                {!request ?
                    <ActivityIndicator style={{ display: 'none' }} size='small' color='#1E88E5' />
                    :
                    <ActivityIndicator style={{ position: 'absolute', bottom: 24 }} size='small' color='#1E88E5' />}
            </View>
            <View style={styles.contentMidLayout}>
                <Input
                    placeholder='MSSV'
                    placeholderTextColor='#393e46'
                    keyboardType='number-pad'
                    onChangeText={textUsername => setUsername(textUsername)} />

                <Input
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholder='Mật khẩu'
                    placeholderTextColor='#393e46'
                    keyboardType='default'
                    onChangeText={textPassword => setPassword(textPassword)} />

                {/* <ButtonCus onPress={() => checkLogin(username, password)} title="Đăng Nhập" /> */}
                <Button color="#1E88E5" mode="contained" onPress={() => checkLogin(username, password)} >Đăng Nhập</Button>

                <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{marginVertical: 20}} >
                        <Button uppercase={false} mode="outlined" color="#1E88E5" onPress={() => navigation.navigate('ForgotPassword')}>Quên mật khẩu?</Button>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentFooterLayout}>
                <Contact />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentTopLayout: {
        flex: 1.2,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    contentMidLayout: {
        flex: 1,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'stretch'
    },
    contentFooterLayout: {
        flex: 0.5,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 20,
    },
    textView: {
        color: '#101010',
        fontSize: 22,
        fontWeight: 'bold'
    },
    imgLogo: {
        width: 174,
        height: 174,
        margin: 12,
    }
})

export default LoginScreen
