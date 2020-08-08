import React from "react";
import {
  Animated,
  View,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import { Text, withTheme, TextInput, RadioButton } from "react-native-paper";
import { GlobalStyles } from "../styles/GlobalStyles";
import GradientButton from "react-native-gradient-buttons";
import AuthService from "../services/AuthService";

const { width, height } = Dimensions.get("screen");

class Signup extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  state = {
    // firstName: "Test",
    // lastName: "User",
    // mobile: "0008885555",
    // pwd: "0000",
    // confPwd: "0000",
    // keyboardShown: false,
    firstName: "",
    lastName: "",
    mobile: "",
    pwd: "",
    confPwd: "",
    keyboardShown: false,
    checked: "student",
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  _keyboardDidShow() {
    this.setState({ keyboardShown: true });
  }

  _keyboardDidHide() {
    this.setState({ keyboardShown: false });
  }

  signup() {
    const { firstName, lastName, mobile, pwd, confPwd } = this.state;
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      mobile.trim() === "" ||
      pwd.trim() === "" ||
      confPwd.trim() === ""
    ) {
      Alert.alert(
        "Input Required",
        "All fields are mandatory. Please fill in all the fields and try again."
      );
    } else if (pwd !== confPwd) {
      Alert.alert(
        "Password Do Not Match",
        "Password and confirmed password do not match. Please make sure you enter the correct password."
      );
    } else if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please make sure you enter a 10 digit mobile number only."
      );
    } else {
      var inputObj = {
        json: {
          firstname: firstName,
          lastname: lastName,
          mobile: mobile,
          password: pwd,
          installation_id: Constants.installationId,
          device_name: Constants.deviceName,
        },
      };
      AuthService.signUp(JSON.stringify(inputObj))
        .then((res) => {
          if (res.status) {
            this.setState({ loading: false });
            Alert.alert(
              "Success!",
              "Your account has been created. We have sent a verification message on your mobile number.",
              [
                {
                  text: "Continue",
                  onPress: () => {
                    this.props.navigation.navigate("Confirm OTP");
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            this.setState({ loading: false });
            Alert.alert("Failed!", res.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false });
          Alert.alert(
            "Failed!",
            "Something went wrong. Please try again after some time."
          );
        });
    }
  }

  render() {
    const { theme } = this.props;
    const { colors } = this.props.theme;
    const { checked } = this.state;
    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={this.state.keyboardShown ? 40 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView>
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
                    GlobalStyles.justifyContentCenter,
                  ]}
                >
                  <Text
                    style={[
                      GlobalStyles.headerText,
                      GlobalStyles.secondaryColorText,
                      GlobalStyles.customFontFamily,
                      GlobalStyles.marginRight10,
                    ]}
                  >
                    Create
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.headerText,
                      GlobalStyles.primaryColorText,
                      GlobalStyles.customFontFamily,
                    ]}
                  >
                    Account
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      GlobalStyles.font16,
                      GlobalStyles.secondaryColorText,
                      GlobalStyles.customFontFamily,
                      GlobalStyles.textCenterAlign,
                      GlobalStyles.marginHorizontal20,
                    ]}
                  >
                    300k+ people already listen eudcation solutions with our
                    app.
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      marginBottom: 0,
                      marginLeft: 20,
                    }}
                  >
                    <RadioButton
                      value="student"
                      color="#179ac5"
                      status={checked === "student" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "student" });
                      }}
                    />
                    <Text
                      style={{
                        color: "#676766",
                        textAlignVertical: "center",
                        fontSize: 16,
                      }}
                    >
                      Student
                    </Text>
                    <RadioButton
                      value="teacher"
                      color="#179ac5"
                      status={checked === "teacher" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "teacher" });
                      }}
                    />
                    <Text
                      style={{
                        color: "#676766",
                        textAlignVertical: "center",
                        fontSize: 16,
                      }}
                    >
                      Teacher
                    </Text>
                    <RadioButton
                      value="educator"
                      color="#179ac5"
                      status={checked === "educator" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "educator" });
                      }}
                    />
                    <Text
                      style={{
                        color: "#676766",
                        textAlignVertical: "center",
                        fontSize: 16,
                      }}
                    >
                      Educator
                    </Text>
                  </View>
                  <TextInput
                    label="First Name"
                    placeholderStyle={GlobalStyles.customFontFamily}
                    value={this.state.firstName}
                    style={{
                      marginHorizontal: 20,
                      backgroundColor: "transperant",
                    }}
                    onChangeText={(firstName) => this.setState({ firstName })}
                    selectionColor="#179ac5"
                    underlineColor="#676766"
                  />
                  <TextInput
                    label="Last Name"
                    value={this.state.lastName}
                    style={{
                      marginHorizontal: 20,
                      backgroundColor: "transperant",
                    }}
                    onChangeText={(lastName) => this.setState({ lastName })}
                    selectionColor="#179ac5"
                    underlineColor="#676766"
                  />
                  <TextInput
                    label="Mobile No."
                    value={this.state.mobile}
                    keyboardType="numeric"
                    style={{
                      marginHorizontal: 20,
                      backgroundColor: "transperant",
                    }}
                    onChangeText={(mobile) => this.setState({ mobile })}
                    selectionColor="#179ac5"
                    underlineColor="#676766"
                  />
                  <TextInput
                    label="Password"
                    secureTextEntry={true}
                    value={this.state.pwd}
                    style={{
                      marginHorizontal: 20,
                      backgroundColor: "transperant",
                    }}
                    onChangeText={(pwd) => this.setState({ pwd })}
                    selectionColor="#179ac5"
                    underlineColor="#676766"
                  />
                  <TextInput
                    label="Confirm Password"
                    secureTextEntry={true}
                    value={this.state.confPwd}
                    style={{
                      marginHorizontal: 20,
                      backgroundColor: "transperant",
                    }}
                    onChangeText={(confPwd) => this.setState({ confPwd })}
                    selectionColor="#179ac5"
                    underlineColor="#676766"
                  />
                  <GradientButton
                    style={[
                      { marginTop: 20, marginBottom: 15, marginHorizontal: 20 },
                    ]}
                    text="Create"
                    textStyle={[{ fontSize: 16, fontFamily: "Maiandra GD" }]}
                    gradientBegin="#179ac5"
                    gradientEnd="#676766"
                    gradientDirection="diagonal"
                    radius={0}
                    height={45}
                    width={width - width / 15}
                    impact
                    impactStyle="Light"
                    onPressAction={() => {
                      this.signup();
                    }}
                  />
                  <GradientButton
                    style={[{ marginHorizontal: 20, marginBottom: 20 }]}
                    text="Cancel"
                    textStyle={[{ fontSize: 14, fontFamily: "Maiandra GD" }]}
                    gradientBegin="#efefef"
                    gradientEnd="#676766"
                    gradientDirection="diagonal"
                    radius={0}
                    height={45}
                    width={width - width / 15}
                    impact
                    impactStyle="Light"
                    onPressAction={() => {
                      this.props.navigation.navigate("Welcome");
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default withTheme(Signup);
