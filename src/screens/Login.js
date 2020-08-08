import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  Keyboard,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Text, withTheme, Button, TextInput } from "react-native-paper";
// import AuthNavigator from "../navigation/AuthNavigator";
import Constants from "expo-constants";
import AuthService from "../services/AuthService";
import { GlobalStyles } from "../styles/GlobalStyles";
import GradientButton from "react-native-gradient-buttons";

const { width, height } = Dimensions.get("screen");
//const prevGetStateForAction = AuthNavigator.router.getStateForAction;

// AuthNavigator.router.getStateForAction = (action, state) => {
//   if (
//     action.type === "Navigation/BACK" &&
//      state &&
//      state.routes[state.index].routeName === "Confirm OTP"
//   ) {
//     return null;
//   }
  
//   if (action.type === "Navigation/BACK" && state) {
//     const newRoutes = state.routes.filter(r => r.routeName !== "Login");
//     const newIndex = newRoutes.length - 1;
//     return prevGetStateForAction(action, {
//       index: newIndex,
//       routes: newRoutes
//     });
//   }
//   return prevGetStateForAction(action, state);
// };

class Login extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  state = {
    mobile: "0008885541",
    pwd: "0000",
    // mobile: "",
    // pwd: ""
  };

  componentDidMount() {
    const { navigation } = this.props;
  }

  handleCancel() {
    this.props.navigation.navigate("Welcome");
  }

  async handleLogin() {
    this.setState({ loading: true });
    const { navigation } = this.props;
    const { mobile, pwd } = this.state;

    Keyboard.dismiss();

    // check with backend API or with some static data
    if (mobile.trim() === "" || pwd.trim() === "") {
      Alert.alert(
        "Input Required",
        "All fields are mandatory. Please fill in all the fields and try again."
      );
    } else {
      // Make service call. If service call is successful, navigate user to the application
      var inputObj = {
        json: {
          username: mobile,
          password: pwd,
          installation_id: Constants.installationId,
          device_name: Constants.deviceName
        }
      };
      AuthService.login(JSON.stringify(inputObj))
        .then(res => {
          if (res.status) {
            // navigate the user to the main app
            let apiKey = res.api_key;
            AsyncStorage.multiSet([
              ["userToken", apiKey],
              ["isSubscribed", "false"]
            ])
              .then(() => {
                var parentNav = this.props.navigation.dangerouslyGetParent();
                parentNav.navigate("AuthLoading");
              })
              .catch(error => {
                this.setState({ loading: false });
                console.log(error);
              });
          } else {
            this.setState({ loading: false });
            Alert.alert("Login Attempt Failed", res.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
          Alert.alert(
            "Oops! Something went wrong",
            "Please try after sometime" + error.message
          );
        });
    }
  }

  render() {
    const { theme } = this.props;
    const { colors } = this.props.theme;

    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <View style={GlobalStyles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={theme.colors.primary}
            barStyle="dark-content"
          />
          <Image
            source={require("../../assets/images/login/select-standrd-top-icon.png")}
            style={GlobalStyles.loginAndSignUpImage}
            resizeMethod="resize"
            resizeMode="cover"
          />
          <View style={{ flex: 1, marginTop: 20 }}>
            <View
              style={[
                GlobalStyles.displayInline,
                GlobalStyles.justifyContentCenter
              ]}
            >
              <Text
                style={[
                  GlobalStyles.headerText,
                  GlobalStyles.secondaryColorText,
                  GlobalStyles.customFontFamily,
                  GlobalStyles.marginRight10
                ]}
              >
                Login to
              </Text>
              <Text
                style={[
                  GlobalStyles.headerText,
                  GlobalStyles.primaryColorText,
                  GlobalStyles.customFontFamily
                ]}
              >
                Your Account
              </Text>
            </View>
            <View>
              <Text
                style={[
                  GlobalStyles.font16,
                  GlobalStyles.secondaryColorText,
                  GlobalStyles.customFontFamily,
                  GlobalStyles.textCenterAlign,
                  GlobalStyles.marginHorizontal20
                ]}
              >
                300k+ people already listen eudcation solutions with our app.
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                label="Mobile No."
                keyboardType="numeric"
                value={this.state.mobile}
                style={{ marginHorizontal: 20, backgroundColor: "transperant" }}
                onChangeText={mobile => this.setState({ mobile })}
                selectionColor="#179ac5"
                underlineColor="#676766"
              />
              <TextInput
                label="Password"
                secureTextEntry={true}
                value={this.state.pwd}
                style={{ marginHorizontal: 20, backgroundColor: "transperant" }}
                onChangeText={pwd => this.setState({ pwd })}
                selectionColor="#179ac5"
                underlineColor="#676766"
              />
              <TouchableOpacity style={{ margin: 20 }}>
                <Text
                  style={{
                    fontFamily: "Maiandra GD",
                    fontSize: 14,
                    color: "#179ac5",
                    fontStyle: "italic",
                    textDecorationLine: "underline"
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <GradientButton
                style={[{ marginBottom: 15, marginHorizontal: 20 }]}
                text="Login"
                textStyle={[{ fontSize: 16, fontFamily: "Maiandra GD" }]}
                gradientBegin="#179ac5"
                gradientEnd="#676766"
                gradientDirection="diagonal"
                radius={0}
                height={40}
                width={width - width / 15}
                impact
                impactStyle="Light"
                onPressAction={() => this.handleLogin()}
              />
              <GradientButton
                style={[{ marginHorizontal: 20 }]}
                text="Cancel"
                textStyle={[{ fontSize: 16, fontFamily: "Maiandra GD" }]}
                gradientBegin="#efefef"
                gradientEnd="#676766"
                gradientDirection="diagonal"
                radius={0}
                height={40}
                width={width - width / 15}
                impact
                impactStyle="Light"
                onPressAction={() => this.handleCancel()}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Login);
