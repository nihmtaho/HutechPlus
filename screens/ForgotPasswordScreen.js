import React from 'react';
import { StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';

function ForgotPasswordScreen() {

    return (
        <WebView source={{ uri: 'http://qlcntt.hutech.edu.vn/forgot-password' }} />
    )
}

export default ForgotPasswordScreen