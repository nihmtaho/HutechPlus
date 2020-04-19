import React from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import firebase from "firebase";

import ProflieView from "../components/profileView";
import MenuView from "../components/menuView";

import { AuthContext } from '../src/context'

const SettingScreen = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [faculty, setFaculty] = React.useState('');

    React.useEffect(() => {
        const getData = async () => {
            let idUsername;
            let fullnameUser;
            let facultyUser;
            try {
                idUsername = await AsyncStorage.getItem('username')
                fullnameUser = await AsyncStorage.getItem('fullname')
                facultyUser = await AsyncStorage.getItem('faculty')

                // firebase.database().ref('Students/' + idUsername).on('value', Snapshot => {
                //     let name = Snapshot.child('fullname').val();
                //     let idUser = Snapshot.child('username').val();
                //     let faculty = Snapshot.child('facultyId').val();
                //     firebase.database().ref('Faculty/' + faculty).on('value', Snapshot => {
                //         setFaculty(Snapshot.child('facultyName').val())
                //     })
                // })
                setFullname(fullnameUser)
                setUsername(idUsername);
                setFaculty(facultyUser)
            } catch (error) {

            }
        }
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.profileView}>
                <ProflieView name={fullname} subName={username} subFaculty={faculty} />
            </View>
            <Divider />
            <MenuView title="Thông báo" iconLeft="notification" iconRight="right" color="#0063cd" />
            <MenuView title="Trợ giúp" iconLeft="questioncircle" iconRight="right" color="blue" />
            <MenuView title="Đổi mật khẩu" iconLeft="Safety" iconRight="right" color="green" />
            <MenuView title="Báo lỗi" iconLeft="exclamationcircle" iconRight="right" color="red" />
            <Button
                contentStyle={{ height: 54 }}
                color="red"
                mode="text"
                // style={styles.button}
                onPress={() => signOut()}>Đăng xuất</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0
    },
})

export default SettingScreen