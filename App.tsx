import React from "react";
import * as Font from "expo-font";
import {
  DefaultTheme,
  Provider as PaperProvider,
  ActivityIndicator
} from "react-native-paper";
import AppSwitchNavigator from "./src/navigation/AppSwitchNavigator";
import { NavigationContainer } from "@react-navigation/native";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

export default class App extends React.Component {
  state = { isLoading: true };

  async componentDidMount() {
    await Font.loadAsync({
      "Maiandra GD": require("./assets/fonts/MAIAN.ttf")
      // "GJ": require("./assets/fonts/GJ_RAJ.TTF"),
      // "Gj-Anand": require("./assets/fonts/GJ_ANAND.ttf")
    })
      .then(() => this.setState({ isLoading: false }))
      .catch(e => {
        console.log(e);
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading)
      return (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
          size={36}
          color="#179ac5"
        />
      );
    else {
      return (
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <AppSwitchNavigator />
          </PaperProvider>
        </NavigationContainer>
      );
    }
  }
}
