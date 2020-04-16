import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Card(props) {
    return(
        <TouchableOpacity 
            activeOpacity={0.5}
            onPress={props.onPress}
            style={styles.container}>
            <View style={styles.dateContent}>
                <View style={styles.mountLeft}>
                    <Text style={styles.titleStyle}>Thứ:</Text>
                    <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: 'bold', color: '#393e46' }}>5</Text>
                </View>
                <View style={styles.mountLeft}>
                    <Text style={styles.titleStyle}>Ngày:</Text>
                    <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: 'bold', color: '#393e46' }}>03/04/2020</Text>
                </View>
            </View>
            <View style={styles.divContent}>
                <View style={styles.leftContent}>
                    <Text style={styles.titleStyle}>Tên học phần</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.subStyle}>Phát triển phần mềm mã nguồn mở phát nguồn mở</Text>
                </View>
            </View>
            <View style={styles.divContent}>
                <View style={styles.leftContent}>
                    <Text style={styles.titleStyle}>Phòng học</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.subStyle}>B.12-03</Text>
                </View>
            </View>
            <View style={styles.divContent}>
                <View style={styles.leftContent}>
                    <Text style={styles.titleStyle}>Giảng viên</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.subStyle}>Bla Bla</Text>
                </View>
            </View>
            <View style={styles.mountContent}>
                <View style={styles.mountLeft}>
                    <Text style={styles.titleStyle}>Số tiết:</Text>
                    <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: 'bold', color: '#393e46' }}>5</Text>
                </View>
                <View style={styles.mountLeft}>
                    <Text style={styles.titleStyle }>Tiết bắt đầu:</Text>
                    <Text style={{ marginLeft: 4, fontSize: 16, fontWeight: 'bold', color: '#393e46' }}>1</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        padding: 12,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 6,
        shadowColor: '#2AC062',
        shadowOpacity: 1,
        elevation: 1,
    },
    divContent:{
        display: "flex",
        flexDirection: "row",
        marginVertical: 2,
    },
    leftContent:{
        width: 120,
    },
    rightContent:{
        flex: 1,
    },
    mountContent:{
        display: "flex",
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        paddingTop: 4,
        marginTop: 4
    },
    dateContent:{
        display: "flex",
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingBottom: 4,
        marginBottom: 4
    },
    mountLeft:{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    titleStyle:{
        fontSize: 16,
        fontWeight: "bold",
        color: '#222831'
    },
    subStyle:{
        fontSize: 16,
        fontWeight: "bold",
        color: '#393e46'
    }
})

export default Card;