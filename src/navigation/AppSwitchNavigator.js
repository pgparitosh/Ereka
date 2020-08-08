import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthNavigator from "./AuthNavigator";
import AuthLoading from "../screens/AuthLoading";
import AppNavigator from "./AppNavigator";
import SubscribeNavigator from "./SubscribeNavigator";
import SubscribeSwitchNavigator from "./SubscribeSwitchNavigator";

const AppSwitchNavigatorConfiguration = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthNavigator,
    Subscribe: SubscribeNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppSwitchNavigator = createAppContainer(AppSwitchNavigatorConfiguration);
export default AppSwitchNavigator;
