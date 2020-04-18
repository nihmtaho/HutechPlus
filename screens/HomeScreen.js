import React from 'react'
import { StyleSheet, AsyncStorage, View, StatusBar, ScrollView } from 'react-native';
import { Snackbar, Button, Text } from "react-native-paper";
import firebase from "firebase";

import Card from '../components/Card';

const HomeScreen = ({ navigation }) => {

    const [visible, setVisiable] = React.useState(false);

    const _onToggleSnackBar = () => {
        return setVisiable(true)
    }

    const _onDismissSnackBar = () => {
        return setVisiable(false)
    }

    React.useEffect(() => {
        const getUsername = async() => {
            let username;
            try {
                username = await AsyncStorage.getItem('username')
                console.log("Fetch username: ", username)
            } catch (error) {

            }
            return username;
        }
<<<<<<< Updated upstream
        getUsername();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContent}>
                <View style={{height: StatusBar.currentHeight}} ></View>
                <Card onPress={() => navigation.push('Detail')} />
            </ScrollView>
            <Button
                onPress={() => _onToggleSnackBar()}
            >
                {visible ? 'Hide' : 'Show'}
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={() => _onDismissSnackBar()}
            >
                Hey there! I'm a Snackbar.
        </Snackbar>
        </View>
    )
=======



        // const selectedTKBDay = this.state.TKB[this.state.date];
        // this.state.TKB[this.state.date] = {
        //   ...selectedTKBDay,
        //   selected: true
        // }

        // console.log('ttkb')
        // console.log(this.state.ttkb)

        // console.log(this.state.TKB[this.state.date])

        return (
            <View style={styles.container}>
                <Calendar
                    dayComponent={CalendarDayComponent}
                    markedDates={this.state.TKB}
                    onDayPress={this.onDayPress}
                    theme={{
                        monthTextColor: '#581845',
                        arrowColor: '#165c96',
                        textMonthFontWeight: 'bold',
                    }}
                    style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#fff',
                        borderBottomColor: '#5D6D7E'
                    }}
                />

                {/* {this.state.TKB[this.state.date].subjectList ? */}
                {this.state.todaySubject ?
                    <FlatList
                        data={this.state.todaySubject.subjectList}
                        renderItem={({ item, index }) => (
                            <Card timeTable={item} onPress={() => this.props.navigation.navigate('Detail')} />
                        )}
                        numColumns={1}
                    // keyExtractor={item => item.toString()}
                    /> :
                    <View style={styles.subjectEmpty}>
                        <Text style={{ fontWeight: 'bold' }}>Không có lịch học</Text>
                    </View>}
            </View>
        );
    }
>>>>>>> Stashed changes
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    textView: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttonContainer: {
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#000'
    },
    calendarContent:{
        flex: 0.7,
        borderBottomColor: "#cccccc",
        borderBottomWidth: .8,
        alignItems: "center",
        justifyContent: "center"
    },
    scrollViewContent:{
        flex: 2,
    }
})


export default HomeScreen