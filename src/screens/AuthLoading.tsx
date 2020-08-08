import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { Props } from "../models/Props";

export default class AuthLoading extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // service call to get the payment details
    // when the app loads the application would be naviagted to the welcome page
    // after completing the auth flow, for a first time or for the user who has not made any payment yet,
    // the application would move to subscribe navigator
    // else the application would proceed to the root navigator
    AsyncStorage.getItem("userToken")
      .then(value => {
        if (value && value !== null) {
          AsyncStorage.getItem("isSubscribed")
            .then(val => {
              if (val === "true") {
                this.props.navigation.navigate("App");
              } else {
                this.props.navigation.navigate("Subscribe");
              }
            })
            .catch(error => {
              console.log(error);
              this.props.navigation.navigate("Auth");
            });
        } else {
          this.props.navigation.navigate("Auth");
        }
      })
      .catch(error => {
        console.log(error);
        this.props.navigation.navigate("Auth");
      });
  };
  render() {
    return (
      <ActivityIndicator
        size="large"
        color="#179ac5"
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      />
    );
  }
}
