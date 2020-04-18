import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AsyncStorage, Alert, YellowBox } from "react-native";
import firebase from "firebase";

// TODO: Import Screen dir
import SplashScreen from '../../screens/SplashScreen';
import TabStack from '../components/mainStackRoot';
import AuthStack from "../components/authStackRoot";

import { AuthContext } from '../context';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const RootStack = createStackNavigator();

// TODO: Function render default
const RootStackNavigator = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
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
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let username;

            try {
                // userToken = await AsyncStorage.removeItem('userToken')
                userToken = await AsyncStorage.getItem('userToken');
                username = await AsyncStorage.getItem('username');
                console.log("user token: ", userToken);
                console.log("username: ", username);
                if (userToken != null) {
                    console.log("Your have a token")
                } else {
                    console.log("Your token was remove")
                }
            } catch (e) {
                // Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    const getToken = () => {
        let token;
        try {
            token = AsyncStorage.getItem('userToken')
        } catch (error) {
            
        }
        return token;
    }

    const authContext = React.useMemo(
        () => ({
            signIn: async (username, password) => {
                let usernameToken;
                if (username !== null && password !== null){
                    firebase.database().ref('Students/' + username).once('value', Snapshot => {
                        let data = Snapshot.val() ? Snapshot.val() : {};
                        var hasUsername = Snapshot.child('username').val();

                        if (hasUsername != username) {
                            Alert.alert("Error", "Tài khoản không tồn tại", [{ text: 'OK' }]);
                        }
                        else{
                            if (data.password != password) {
                                Alert.alert("Error", "Mật khẩu không chính xác!", [{ text: 'OK' }])
                            }
                            else if (data.password == password) {
                                usernameToken = Snapshot.child('tokenLogin').val();
                                try {
                                    AsyncStorage.setItem('userToken', usernameToken)
                                    AsyncStorage.setItem('username', hasUsername)
                                } catch (error) {

                                }
                                dispatch({ type: 'SIGN_IN', token: getToken() });
                            }
                        }
                    });
                }
                else{
                    Alert.alert("Error", "Vui lòng điền đầy đủ ID và Mật khẩu", [{ text: 'OK' }]);
                }
            },
            signOut: () => {
                try {
                    AsyncStorage.removeItem('userToken')
                    AsyncStorage.removeItem('username')
                } catch (error) {

                }
                dispatch({ type: 'SIGN_OUT' })
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading
                    ? (
                        <SplashScreen />
                    )
                    : (
                        <RootStack.Navigator headerMode="none" screenOptions={{
                            ...TransitionPresets.ScaleFromCenterAndroid
                        }}>
                            {state.userToken == null
                                ? (
                                    <RootStack.Screen name="Auth" component={AuthStack} />
                                )
                                : (
                                    <RootStack.Screen name="Main" component={TabStack} />
                                )}
                        </RootStack.Navigator>
                    )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default RootStackNavigator;