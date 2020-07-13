// import { StatusBars } from "expo-status-bar";
import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	StatusBar,
	AsyncStorage,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Divider, Button } from "react-native-paper";
import Card from "../components/Card";
import { db } from "../src/config/db";

import ErrorItem from "../components/ErrorItem";
import { ScrollView } from "react-native-gesture-handler";

let sbj = [];
let objectSchedule = [];
let date = "";
let customDatesStyles = [];
let markedDates = [];

let get;
let dateList = [];
let dateData = [];
let temp;
let searchTrue;
class HomeScreen extends Component {
	async componentDidMount() {
		let mssv = await AsyncStorage.getItem("username");
		this.setState({ mssv: mssv });
		setTimeout(() => {
			this.fetch();
		}, 2000);
	}

	componentDidUpdate() {}

	fetch = () => {
		this.setState({ isLoading: true });
		// this.setState({ formattedDate: moment().format("YYYY-MM-DD") });
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

	componentDidUpdate() {}

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
			formatDate: "",
			list: [],
		};
	}

	onDateSelected = (date) => {
		this.setState({ formattedDate: date.format("YYYY-MM-DD") });
	};

	func = () => {
		if (this.state.day.length != 0 || this.state.day != null) {
			for (let i = 0; i < this.state.day.length; i++) {
				const element = this.state.day[i];
				date = element;

				let dots = [];

				if (date) {
					dots.push({
						color: "red",
						selectedColor: "green",
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

	lastUpdate = () => {
		let { sbjList } = this.state;
		searchTrue = this.searchBinary(dateData, this.state.formattedDate);
		try {
			if (searchTrue != -1) {
				if (sbjList.length != 0) {
					for (let i = 0; i < sbjList.length; i++) {
						let element = sbjList[i];
						temp = Object.values(element);
						if (this.state.formattedDate === temp[0]) {
							this.state.list = temp[1];
						}
					}
				}
			} else {
				//
			}
		} catch (error) {
			console.log(error);
		}
	};

	renderRow = ({ item, index }) => {
		return (
			<Card
				timeTable={item}
				onPress={() => this.props.navigation.navigate("Detail")}
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
						selectedDate={this.state.selectedDate}
						calendarAnimation={{ type: "sequence", duration: 50 }}
						daySelectionAnimation={{
							type: "background",
							duration: 100,
							highlightColor: "#f9d56e",
						}}
						style={{
							height: 120,
							paddingTop: StatusBar.currentHeight + 8,
							paddingBottom: 10,
						}}
						calendarHeaderStyle={{ color: "black" }}
						calendarColor={"#ffffff"}
						dateNumberStyle={{ color: "black" }}
						dateNameStyle={{ color: "black" }}
						iconContainer={{ flex: 0.12 }}
						customDatesStyles={this.state.customDatesStyles}
						markedDates={this.state.markedDates}
						datesBlacklist={this.datesBlacklistFunc}
						onDateSelected={this.onDateSelected}
						useIsoWeekday={true}
					/>
					<Divider />
				</View>
				<View>
					<ErrorItem title="Chọn 1 ngày để xem lịch (Lỗi hiển thị)" />
					<ErrorItem title="Click chọn nhiều lần nếu không hiển thị lịch" />
					<ErrorItem title="Vuốt xuống nếu không tải được lịch" />
				</View>
				<Divider/>

				{searchTrue != -1 ? (
					<FlatList
					style={{marginVertical: 6}}
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
						<Text>Không có lịch</Text>
					</View>
				)}
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
