import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import SelectStandard from "../screens/SelectStandard";
import Subscriptions from "../screens/Subscriptions";
import Courses from "../screens/Courses";
import Chapters from "../screens/Chapters";
import Settings from "../screens/Settings";
import { ActivityIndicator } from "react-native-paper";

const Stack = createStackNavigator();

export default class RootNavigator extends React.Component {
  state = { userToken: "", isSubscribed: "", isLoading: true };

  componentDidMount() {
    AsyncStorage.getItem("userToken")
      .then(value => {
        if (value && value !== null) {
          this.setState({ userToken: value, isLoading: false });
        } else {
          this.setState({ userToken: "", isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ userToken: "", isLoading: false });
      });
  }

  render() {
    return this.state.isLoading ? (
      <ActivityIndicator
        color="#179ac5"
        size="large"
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      />
    ) : this.state.userToken === "" ? (
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    ) : this.state.isSubscribed === "" ? (
      <Stack.Navigator>
        <Stack.Screen name="SelectStandard" component={SelectStandard} />
        <Stack.Screen name="Subscriptions" component={Subscriptions} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="Chapters" component={Chapters} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    );
  }
}
