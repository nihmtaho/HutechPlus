import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar, AsyncStorage } from 'react-native'
import { Calendar } from 'react-native-calendars';
import moment from 'moment'
import Card from '../components/Card';
import CalendarDayComponent from '../components/CalendarDay'
import firebase from "firebase";

let calendarDate = moment();
class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: calendarDate.format('YYYY-MM-DD'),
            TKB: {},
            ttkb: [],
            mssv: '',
            todaySubject: {},
        };

        this.onDayPress = this.onDayPress.bind(this);

    }

    async componentDidMount() {
        let mssv = await AsyncStorage.getItem("username")
        this.setState({ mssv })
        console.log(mssv)
    }

    onDayPress(date) {

        calendarDate = moment(date.dateString).format('YYYY-MM-DD')

        // this.setState({
        //   date: calendarDate
        // });

        // this.state.date = calendarDate

        this.removeMarkedDate()

        let arr = this.state.ttkb

        let obj = arr.find(o => o.date === calendarDate)

        if (obj) {
            // console.log('day clicked:')
            // console.log(obj);

            this.setState({
                todaySubject: obj
            })

        }

        const tempTKB = this.state.TKB
        const selectedTKBDay = tempTKB[calendarDate]
        tempTKB[calendarDate] = {
            ...selectedTKBDay,
            selected: true
        }

        this.setState({
            TKB: tempTKB
        })


    }

    convertArrayToObject() {
        // console.log('haitta')
        let markObject = {}
        let arr = this.state.ttkb
        if (arr) {
            arr.forEach(element => {
                markObject[element.date] = {
                    subject: element.subjectList.length,
                    subjectList: element.subjectList
                }
            });
            this.setState({
                TKB: markObject
            })

            // setConvertTKB(markObject)
        } else {
            // console.log('Lỗi data từ firebase')
        }
    }

    removeMarkedDate() {

        // remove previous selected key
        for (var key in this.state.TKB) {
            // skip loop if the property is from prototype
            if (!this.state.TKB.hasOwnProperty(key)) continue;

            var obj = this.state.TKB[key];
            for (var subKey in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(subKey)) continue;

                // your code
                if (subKey === 'selected') {
                    delete obj[subKey]
                }
            }

            // const selectedTKBDay = this.state.TKB[this.state.date];
            // this.state.TKB[this.state.date] = {
            //   ...selectedTKBDay,
            //   selected: true
            // }
        }
    }

    render() {

        // console.log(this.state.TKB)

        if (this.state.ttkb == null || this.state.ttkb.length == 0) {

            firebase.database().ref('Students/' + this.state.mssv + '/schedule/').on('value', Snapshot => {

                if (Snapshot.numChildren() > 0 && this.state.ttkb !== Snapshot.val()) {
                    this.setState({
                        ttkb: Snapshot.val()
                    })

                    this.convertArrayToObject()
                    // console.log('TKB\'ve been update')
                }
            })
        }
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    subjectEmpty: {
        flex: 1 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default HomeScreen