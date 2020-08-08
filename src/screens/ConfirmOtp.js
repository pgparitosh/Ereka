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
import Constants from "expo-constants";
import AuthService from "../services/AuthService";
import { GlobalStyles } from "../styles/GlobalStyles";
import GradientButton from "react-native-gradient-buttons";

const { width, height } = Dimensions.get("screen");

class ConfirmOtp extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResend = this.handleResend.bind(this);
  }

  state = {
    otp: "123456"
  };

  componentDidMount() {
    const { navigation } = this.props;
  }

  handleCancel() {
    this.props.navigation.navigate("Welcome");
  }

  async handleResend() {
    console.log("Resend OTP");
  }

  async handleSubmit() {
    // this.setState({ loading: true });
    // const { navigation } = this.props;
    // const { mobile, pwd } = this.state;

    // Keyboard.dismiss();

    // // check with backend API or with some static data
    // if (mobile.trim() === "" || pwd.trim() === "") {
    //   Alert.alert(
    //     "Input Required",
    //     "All fields are mandatory. Please fill in all the fields and try again."
    //   );
    // } else {
    //   // Make service call. If service call is successful, navigate user to the application
    //   var inputObj = {
    //     json: {
    //       username: mobile,
    //       password: pwd,
    //       installation_id: Constants.installationId,
    //       device_name: Constants.deviceName
    //     }
    //   };
    //   AuthService.login(JSON.stringify(inputObj))
    //     .then(res => {
    //       if (res.status) {
    //         // navigate the user to the main app
    //         let apiKey = res.api_key;
    //         AsyncStorage.multiSet([
    //           ["userToken", apiKey],
    //           ["isSubscribed", "false"]
    //         ])
    //           .then(() => {
    //             var parentNav = this.props.navigation.dangerouslyGetParent();
    //             parentNav.navigate("AuthLoading");
    //           })
    //           .catch(error => {
    //             this.setState({ loading: false });
    //             console.log(error);
    //           });
    //       } else {
    //         this.setState({ loading: false });
    //         Alert.alert("Login Attempt Failed", res.message);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.setState({ loading: false });
    //       Alert.alert(
    //         "Oops! Something went wrong",
    //         "Please try after sometime" + error.message
    //       );
    //     });
    // }

    Alert.alert(
      "Success!",
      "Your account has been verified. Please log in to your account using your mobile number and passowrd.",
      [
        {
          text: "Continue",
          onPress: () => {
            this.props.navigation.navigate("Login");
          }
        }
      ],
      { cancelable: false }
    );
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
                Please enter the One Time Password sent on your registered
                mobile number
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                label="OTP"
                keyboardType="numeric"
                value={this.state.otp}
                style={{ marginHorizontal: 20, backgroundColor: "transperant" }}
                onChangeText={otp => this.setState({ otp })}
                selectionColor="#179ac5"
                underlineColor="#676766"
              />
              <GradientButton
                style={[
                  { marginTop: 20, marginBottom: 15, marginHorizontal: 20 }
                ]}
                text="Resend OTP"
                textStyle={[{ fontSize: 16, fontFamily: "Maiandra GD" }]}
                gradientBegin="#179ac5"
                gradientEnd="#676766"
                gradientDirection="diagonal"
                radius={0}
                height={40}
                width={width - width / 15}
                impact
                impactStyle="Light"
                onPressAction={() => this.handleResend()}
              />
              <GradientButton
                style={[{ marginBottom: 15, marginHorizontal: 20 }]}
                text="Confirm"
                textStyle={[{ fontSize: 16, fontFamily: "Maiandra GD" }]}
                gradientBegin="#179ac5"
                gradientEnd="#676766"
                gradientDirection="diagonal"
                radius={0}
                height={40}
                width={width - width / 15}
                impact
                impactStyle="Light"
                onPressAction={() => this.handleSubmit()}
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

export default withTheme(ConfirmOtp);
