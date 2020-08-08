import { createStackNavigator } from "react-navigation-stack";
import SelectStandard from "../screens/SelectStandard";
import Subscriptions from "../screens/Subscriptions";

export default createStackNavigator({
  SelectStandard: SelectStandard,
  Subscriptions: Subscriptions,
});
