//Import Library
import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Button, Divider, Paragraph } from "react-native-paper";
import { db } from "../src/config/db";

//Import Components
import ProfileView from "../components/profileView";
import MenuView from "../components/menuView";
import LearnView from "../components/learnView";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import { AuthContext } from "../src/context";

const SettingScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const [state, setState] = useState({
    fullName: "",
    departmentName: "",
    email: "",
  });

  const { departmentName, fullName, email } = state;

  useEffect(() => {
    const fetchStudent = async () => {
      let emailUser;
      let idUsername;
      let fullNameUser;
      let departmentName;
      try {
        idUsername = await AsyncStorage.getItem("username");
        // fullNameUser = await AsyncStorage.getItem('fullName')
        db.ref("Students/" + idUsername).once("value", (Snapshot) => {
          emailUser = Snapshot.child("email").val();
          fullNameUser = Snapshot.child("fullname").val();
          let departmentCode = Snapshot.child("departmentCode").val();

          db.ref("Departments/" + departmentCode).once("value", (Snapshot) => {
            departmentName = Snapshot.child("departmentName").val();
            setState({
              fullName: fullNameUser,
              email: emailUser,
              departmentName: departmentName,
            });
          });
        });
      } catch (error) {}
    };
    fetchStudent();

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: Constants.statusBarHeight }} />
      <View style={styles.profileView}>
        <ProfileView
          name={fullName}
          subName={departmentName}
          subFaculty={email}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <Divider />
      <LearnView title="8" />
      <Divider />
      <View>
        <MenuView
          title="Lịch sử điểm danh"
          iconLeft="calendar"
          iconRight="right"
          color="#0063cd"
        />
        <MenuView
          title="Đổi thông tin liên lạc"
          iconLeft="customerservice"
          iconRight="right"
          color="green"
        />
        <MenuView
          title="Đổi mật khẩu"
          iconLeft="Safety"
          iconRight="right"
          color="green"
        />
        <MenuView
          title="Trợ giúp"
          iconLeft="questioncircle"
          iconRight="right"
          color="#0063cd"
        />
        <MenuView
          title="Báo lỗi"
          iconLeft="exclamationcircle"
          iconRight="right"
          color="red"
        />
      </View>
      <Button
        contentStyle={{ height: 54 }}
        color="red"
        mode="text"
        // style={styles.button}
        onPress={() => signOut()}
      >
        Đăng xuất tài khoản
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
  },
});

export default SettingScreen;
