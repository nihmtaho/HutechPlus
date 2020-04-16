import React from 'react';
import { TextInput, View } from 'react-native';

export default function Input(props) {
    const [isFocused, setIsFocused] = React.useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const inputStyle = {
        borderWidth: !isFocused ? 1 : 1,
        borderColor: !isFocused ? '#393e46' : 'blue',
        padding: 14,
        borderRadius: 6,
        backgroundColor: isFocused ? '#faf9f9' : '#eeeeee',
        marginBottom: 12,
        fontSize: 16,
    }
    return (
        <View>
            <TextInput
                style={inputStyle}
                {...props}
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    )
}