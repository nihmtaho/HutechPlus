import React from 'react'
import { StyleSheet, View, TouchableOpacity, StatusBar, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from "firebase";

//TODO: Import only Screens and Components
import Contact from '../components/Contact';

//TODO: Attribute
import { AuthContext } from '../src/context';
const imgSource = '../assets/logo.png';

function LoginScreen(props) {
    const { navigation } = props;
    const { signIn } = React.useContext(AuthContext);
    
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [request, setRequest] = React.useState(false);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentTopLayout}>
                <Image style={styles.imgLogo} source={require(imgSource)} />
                {!request ?
                    <ActivityIndicator style={{ display: 'none' }} size='small' color='#1E88E5' />
                    :
                    <ActivityIndicator style={{ position: 'absolute', bottom: 0 }} size='small' color='#1E88E5' />}
            </View>
            <View style={styles.contentMidLayout}>
                <TextInput style={{marginVertical: 5}}
                    label='ID/MSSV'
                    color="#1E88E5"
                    keyboardType='number-pad'
                    onFocus={() => setRequest(false)}
                    onChangeText={textUsername => setUsername(textUsername)} />

                <TextInput style={{ marginVertical: 5 }}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    label='Mật khẩu'
                    color="#1E88E5"
                    keyboardType='default'
                    onFocus={() => setRequest(false)}
                    onChangeText={textPassword => setPassword(textPassword)} />

                <Button
                    style={{marginVertical: 10}}
                    contentStyle={{height: 54}}
                    color="#1E88E5"
                    mode="contained"
                    onPress={
                        () => signIn(username, password) ? setRequest(true) : setRequest(false)
                    } >Đăng Nhập</Button>

                <View style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginVertical: 20 }} >
                        <Button uppercase={false} mode="outlined" color="#1E88E5" onPress={() => navigation.navigate('ForgotPassword')}>Quên mật khẩu?</Button>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: "20%" }}>
                    <Contact />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentTopLayout: {
        flex: 1,
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
    },
    imgLogo: {
        width: 154,
        height: 154,
        margin: 40,
    }
})

export default LoginScreen
