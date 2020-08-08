import React from "react";
import { View, AsyncStorage } from "react-native";
import { Text } from "react-native-paper";

export default class SubscribeLoading extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const val = await AsyncStorage.getItem("isSubscribed");
    console.log(val);
    if (val === "true") {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Subscribe");
    }
  };
  render() {
    return (
      <View>
        <Text>This is subscribe loading page</Text>
      </View>
    );
  }
}
