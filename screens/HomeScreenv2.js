import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	AsyncStorage,
	Image,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import CalendarStrip from "react-native-calendar-strip";
import { Caption } from "react-native-paper";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

import TodayInfo from "../components/todayInfo";
import Card from "../components/Card";
import { db } from "../src/config/db";
import moment from "moment";

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
		}, 2000);
		this.fetch();
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
					this.props.navigation.push("NavigateToDetail", {
						subjectCode: item.subjectId,
						address: item.address,
						name_lecturer: item.valueGV,
						dataMoment: this.state.formattedDate,
					})
				}
			/>
		);
	};

	pushObject = async () => {
		try {
			let date_select = this.state.formattedDate;
			let time_moment = moment().format("HH:mm:ss");

			//Cut String
			let year_cut = date_select.substr(0, 4);
			let month_cut = date_select.substr(5, 2);
			let day_cut = date_select.substr(8, 2);

			let name_class = await AsyncStorage.getItem("nameClass");
			let username = await AsyncStorage.getItem("username");
			let array_ID = [];
			for (let i = 0; i < this.state.list.length; i++) {
				let valueID_in_list = Object.values(this.state.list[i])[1];
				array_ID.push(valueID_in_list);
			}
			for (let x = 0; x < array_ID.length; x++) {
				let item_subjID = array_ID[x];
				db.ref("Subject/" + item_subjID + "/attendance/" + name_class + "/").on(
					"value",
					(Snapshot) => {
						if (Snapshot.exists()) {
							if (searchTrue != -1) {
								if (
									Snapshot.child(
										year_cut + "/" + month_cut + "/" + day_cut + "/" + username
									).exists()
								) {
									// Do not thing
								} else {
									db.ref(
										"Subject/" +
											item_subjID +
											"/attendance/" +
											name_class +
											"/" +
											year_cut +
											"/" +
											month_cut +
											"/" +
											day_cut +
											"/" +
											username +
											"/"
									).update({
										dateCheckIn: date_select,
										timeCheckIn: time_moment,
										valueCheckIn: false,
									});
								}
							}
						}
					}
				);
			}
		} catch (error) {}
	};

	render() {
		this.func();
		this.lastUpdate();
		this.pushObject();

		return (
			<SafeAreaView style={styles.container}>
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

				<View style={styles.content}>
					{searchTrue != -1 ? (
						<FlatList
							style={{ flex: 1 }}
							data={this.state.list}
							renderItem={this.renderRow}
							keyExtractor={(i, k) => k.toString()}
							refreshControl={
								<RefreshControl
									refreshing={this.state.isLoading}
									onRefresh={this.fetch}
								/>
							}
						/>
					) : (
						<Animatable.View
							animation="fadeInUp"
							duration={500}
							style={{
								flex: 1,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Caption>Chọn vào lịch nếu bạn không thấy lịch học</Caption>
							<Image
								style={{ width: 120, height: 120 }}
								source={require("../assets/calendar/037-calendar.png")}
							/>
							<Text style={{ marginTop: 8, fontWeight: "bold" }}>
								OOPS...! Không có lịch học
							</Text>
						</Animatable.View>
					)}
				</View>
				<View>
					<TodayInfo
						day={moment().format("DD")}
						month={moment().format("MM")}
						weekDay={moment().format("dddd")}
						onPress={() =>
							this.setState({ formattedDate: moment().format("YYYY-MM-DD") })
						}
					/>
				</View>
				<StatusBar style="auto" />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	content: {
		flex: 1,
		padding: 4,
	},
});

export default HomeScreen;
