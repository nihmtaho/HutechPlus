import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AsyncStorage } from "react-native";


// TODO: Import Screen dir
import SplashScreen from '../../screens/SplashScreen';

import TabStack from '../components/mainStackRoot';
import AuthStack from "../components/authStackRoot";

import { AuthContext } from '../context';

const RootStack = createStackNavigator();



// TODO: Function render default
const RootStackNavigator = ({ navigation }) => {
    // const tokenString = "djFdo2xZosed"
    const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null);

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
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {isLoading ? (
                    <SplashScreen />
                ) :  (
                        <RootStack.Navigator headerMode="none" screenOptions={{
                            ...TransitionPresets.ScaleFromCenterAndroid
                        }}>
                            {state.userToken == null ? (
                                <RootStack.Screen name="Auth" component={AuthStack} />
                            ) : (
                                <RootStack.Screen name="Main" component={TabStack} />
                            )}
                        </RootStack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default RootStackNavigator;