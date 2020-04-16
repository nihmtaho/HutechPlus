import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import { Calendar } from 'react-native-calendars';
import moment from 'moment'
import CalendarDayComponent from '../components/CalendarDay'
import Header from '../components/Header'

let calendarDate = moment();

class DetailScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendarDate: calendarDate.format('YYYY-MM-DD'),
      date: '',
      TKB: {}
    };

    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      date: calendarDate.format('YYYY-MM-DD')
    });
  }

  onDayPress(date) {
    calendarDate = moment(date.dateString);

    this.setState({
      date: calendarDate.format('YYYY-MM-DD')
    });

  }

  render() {

    // set sample value
    this.state.TKB = {
      '2020-03-16': {
        subject: 3,
        subjectList: [
          {
            lesson: "10,11,12",
            subject_name: "Hệ thống thông tin di động",
            address: "B.12.03"
          },
          {
            lesson: "7,8,9",
            subject_name: "Nguyên lý hệ điều hành",
            address: "B.10.05"
          },
          {
            lesson: "10,11,12",
            subject_name: "Hệ thống thông tin di động",
            address: "B.08.09"
          },
        ]
      },
      '2020-03-20': {
        subject: 2,
        subjectList: [
          {
            lesson: "10,11,12",
            subject_name: "Hệ thống thông tin di động",
            address: " B.10.05"
          },
          {
            lesson: "7,8,9",
            subject_name: "Kiến trúc máy tính",
            address: "B.08.03"
          }
        ],
      },
      '2020-03-23': {
        subject: 4,
        subjectList: [
          {
            lesson: "1,2,3",
            subject_name: "Hệ thống thông tin di động",
            address: "B.08.03"
          },
          {
            lesson: "4,5,6",
            subject_name: "Nguyên lý hệ điều hành",
            address: "B.08.03"
          },
          {
            lesson: "7,8,9",
            subject_name: "Hệ thống thông tin di động",
            address: "B.05.02"
          },
          {
            lesson: "10,11,12",
            subject_name: "Nguyên lý hệ điều hành",
            address: "B.05.02"
          }
        ]
      },
      '2020-03-25': {
        subject: 1,
        subjectList: [
          {
            lesson: "10,11,12",
            subject_name: "Hệ thống thông tin di động",
            address: "A.08.02/4"
          },
        ]
      },
      '2020-03-30': {
        subject: 2,
        subjectList: [
          {
            lesson: "10,11,12",
            subject_name: "Hệ thống thông tin di động",
            address: "B.05.02"
          },
          {
            lesson: "7,8,9",
            subject_name: "Nguyên lý hệ điều hành",
            address: "B.12.07"
          },
        ]
      },
    }
    // end set sample value

    const selectedTKBDay = this.state.TKB[this.state.date];
    this.state.TKB[this.state.date] = {
      ...selectedTKBDay,
      selected: true
    }

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

        {this.state.TKB[this.state.date].subjectList ?
          <FlatList
            data={this.state.TKB[this.state.date].subjectList}
            renderItem={({ item }) => (
              <Card timeTable={item} />
            )}
            numColumns={1}
          /> :
          <View style={styles.subjectEmpty}>
            <Text style={{ fontWeight: 'bold' }}>Không có môn học</Text>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  subjectEmpty: {
    flex: 1/2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default DetailScreen