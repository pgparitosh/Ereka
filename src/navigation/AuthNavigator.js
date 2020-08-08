import { createStackNavigator } from "react-navigation-stack";
import Welcome from "../screens/Welcome";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import ConfirmOtp from "../screens/ConfirmOtp";

export default createStackNavigator({
  Welcome: Welcome,
  Login: Login,
  Signup: Signup,
  "Confirm OTP": ConfirmOtp,
});
