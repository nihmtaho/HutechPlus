import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class CalendarDayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  getContentStyle() {

    // console.log(this.props)

    const { state, date, marking = {} } = this.props;

    const style = {
      content: {
        borderRadius: 50,
      },
      text: { }
    };

    if (marking.selected) {
      style.text.color = "#000";
      style.content.borderWidth = 2;
      style.content.borderColor = "#FF3962";

      if (state === "today") {
        style.text.color = "#fff";
        style.content.borderWidth = 2;
        style.content.borderColor = "#FF3962";
        style.content.backgroundColor = "#00BFFF";
      } 
    }

    if (!marking.selected) {
      if (state === "today") {
        style.text.color = "#fff";
        style.content.backgroundColor = "#00BFFF";
      }
    }

    if (state === 'disabled') {
      style.text.color = '#c1c2c1';
    }

    if(new Date(date.dateString).getDay() === 0) {
      style.text.color = '#C63131';
      if(state === 'disabled') {
        style.text.color = '#C59D9D';
      }
    }

    return style;
  }

  getFooterTextStyle() {
    const { marking = {} } = this.props;
    if (marking.subject > 0) {
      const style = {
        color: "#fff",
        borderRadius: 50,
        textAlign: "center",
        fontSize: 12
      };

      if (marking.subject === 1) {
        style.backgroundColor = "#62DA68"
      } else if (marking.subject === 2) {
        style.backgroundColor = "#185DCA"
      } else if (marking.subject === 3) {
        style.backgroundColor = "#FE9317"
      } else if (marking.subject === 4) {
        style.backgroundColor = "#D82525"
      }
      return style;
    }
  }

  getSubjectCount() {
    const { marking = {} } = this.props;
    if (marking.subject > 0) {
      return marking.subject;
    }
  }


  onDayPress() {
    this.props.onPress(this.props.date);
  }

  render() {    
    const contentStyle = this.getContentStyle();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.content, contentStyle.content]}
          onPress={this.onDayPress}
        >

          <Text style={contentStyle.text}>
            {String(this.props.children)}
          </Text>
        </TouchableOpacity>

        <Text style={[this.getFooterTextStyle()]}>
          {this.getSubjectCount()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 7,
    marginRight: 7
  },
  content: {

    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CalendarDayComponent;