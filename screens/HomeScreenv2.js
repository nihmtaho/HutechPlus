import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	AsyncStorage,
	Image,
	Platform,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Divider } from "react-native-paper";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

import { db } from "../src/config/db";
import moment from "moment";

import Card from "../components/Card";

let date = "";
let customDatesStyles = [];
let markedDates = [];

let get;
let dateData = [];
let temp;
let searchTrue;
class HomeScreen extends Component {
	async componentDidMount() {
		let mssv = await AsyncStorage.getItem("username");
		this.setState({ mssv: mssv });
		setTimeout(() => {
			this.fetch();
		}, 1000);
		this.fetch();
		this.func();
		this.lastUpdate();
		return;
	}

	fetch = async () => {
		this.state.markedDates = [];
		dateData = [];
		this.setState({ isLoading: true });
		try {
			db.ref("Students/" + this.state.mssv + "/schedule/").on(
				"value",
				(Snapshot) => {
					get = Snapshot.val();
					Snapshot.forEach((element) => {
						dateData.push(element.child("date").val());
					});
				}
			);
		} catch (error) {}
		this.setState({
			day: dateData,
		});
		this.setState({
			sbjList: get,
		});
		this.setState({ isLoading: false });
	};

	constructor(props) {
		super(props);

		let startDate = moment(); // today

		// Create a week's worth of custom date styles and marked dates.

		this.state = {
			selectedDate: moment().format("YYYY-MM-DD"),
			customDatesStyles,
			markedDates,
			startDate,
			day: [],
			sbjList: [],
			isLoading: false,
			list: [],
		};
	}

	onDateSelected = (date) => {
		this.setState({ formattedDate: date.format("YYYY-MM-DD") });
	};

	func = async () => {
		if (this.state.day.length != 0 || this.state.day != null) {
			for (let i = 0; i < this.state.day.length; i++) {
				const element = this.state.day[i];
				date = element;

				let dots = [];

				if (date) {
					dots.push({
						color: "#dd2c00",
						selectedColor: "#005086",
					});
				}

				this.state.markedDates.push({
					date,
					dots,
				});
			}
		}
	};

	searchBinary = (arr, search) => {
		for (let i = 0; i < arr.length; i++) {
			const element = arr[i];
			if (element === search) {
				return i;
			}
		}
		return -1;
	};

	lastUpdate = async () => {
		searchTrue = this.searchBinary(dateData, this.state.formattedDate);
		try {
			if (searchTrue != -1) {
				if (get.length != 0) {
					for (let i = 0; i < get.length; i++) {
						let element = get[i];
						temp = Object.values(element);
						if (this.state.formattedDate === temp[0]) {
							this.state.list = temp[1];
						}
					}
				}
			} else {
				//
			}
		} catch (error) {}
	};

	renderRow = ({ item, index }) => {
		return (
			<Card
				timeTable={item}
				onPress={() =>
					this.props.navigation.navigate("NavigateToDetail", {
						subjectCode: item.subjectId,
						address: item.address,
						name_lecturer: item.valueGV,
						dataMoment: this.state.formattedDate,
					})
				}
			/>
		);
	};

	render() {
		this.func();
		this.lastUpdate();

		return (
			<View style={styles.container}>
				<View>
					<CalendarStrip
						scrollable
						selectedDate={this.state.selectedDate}
						calendarAnimation={{ type: "parallel", duration: 20 }}
						daySelectionAnimation={{
							type: "background",
							duration: 100,
							highlightColor: "#b2ebf2",
						}}
						style={{
							height: 132,
							paddingTop: Constants.statusBarHeight + 8,
							paddingBottom: 8,
							borderBottomEndRadius: 34,
							borderBottomStartRadius: 34,
							elevation: 4,
						}}
						calendarHeaderStyle={{ color: "white" }}
						calendarColor={"#00bcd4"}
						dateNumberStyle={{ color: "white" }}
						dateNameStyle={{ color: "white" }}
						iconContainer={{ flex: 0.12 }}
						customDatesStyles={this.state.customDatesStyles}
						markedDates={this.state.markedDates}
						datesBlacklist={this.datesBlacklistFunc}
						onDateSelected={this.onDateSelected}
						useIsoWeekday={true}
					/>
				</View>

				{searchTrue != -1 ? (
					<FlatList
						style={{ marginVertical: 6 }}
						data={this.state.list}
						renderItem={this.renderRow}
						keyExtractor={(i, k) => k.toString()}
						refreshing={this.state.isLoading}
						onRefresh={this.fetch}
					/>
				) : (
					<View
						style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
					>
						<Image
							style={{ width: 120, height: 120 }}
							source={require("../assets/calendar/037-calendar.png")}
						/>
						<Text style={{ marginTop: 8, fontWeight: "bold" }}>
							OOPS...! Không có lịch học
						</Text>
					</View>
				)}

				<StatusBar style="auto" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default HomeScreen;
