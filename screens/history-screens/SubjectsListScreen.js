import React, {useState} from "react";
import { View, StyleSheet, ScrollView, FlatList, AsyncStorage } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import ListSubject from "../../components/listSubject";

const renderRow = ({ item, index }) => {
	return <ListSubject />;
};

const SubjectsListScreen = ({ navigation }) => {

//    const

	return (
		<View>
            <StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SubjectsListScreen;
