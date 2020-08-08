import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthLoading from "../screens/AuthLoading";
import AppNavigator from "./AppNavigator";
import SubscribeNavigator from "./SubscribeNavigator";

const SubscribeSwitchNavigatorConfiguration = createSwitchNavigator(
  {
    SubscribeLoading: AuthLoading,
    App: AppNavigator,
    Subscribe: SubscribeNavigator
  },
  {
    initialRouteName: "SubscribeLoading"
  }
);

const SubscribeSwitchNavigator = createAppContainer(SubscribeSwitchNavigatorConfiguration);
export default SubscribeSwitchNavigator;
