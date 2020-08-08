import React from "react";
import {
  Animated,
  View,
  ImageBackground,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Text, withTheme, Button } from "react-native-paper";
import { GlobalStyles } from "../styles/GlobalStyles";
import { SliderBox } from "react-native-image-slider-box";
import GradientButton from "react-native-gradient-buttons";

const { width, height } = Dimensions.get("screen");

class Welcome extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
  }

  state = {
    images: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    const images = [
      require("../../assets/images/banner4.png"),
      require("../../assets/images/banner3.png"),
      require("../../assets/images/banner2.png")
    ];
    this.setState({
      images: images
    });
  }

  goToLogin() {
    this.props.navigation.navigate("Login");
  }

  gotToSignUp() {
    this.props.navigation.navigate("Signup");
  }

  render() {
    const { theme } = this.props;
    const { colors } = this.props.theme;
    const { images } = this.state;

    if (!images || images.length <= 0) return null;

    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <View style={[GlobalStyles.welcomeContainer, {marginBottom: 80}]}>
          <StatusBar
            translucent={true}
            backgroundColor={theme.colors.primary}
            barStyle="dark-content"
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <Image
              source={require("../../assets/images/welcome/logo.png")}
              style={GlobalStyles.welcomeImage}
              resizeMethod="auto"
              resizeMode="center"
            />
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
                Learn The
              </Text>
              <Text
                style={[
                  GlobalStyles.headerText,
                  GlobalStyles.primaryColorText,
                  GlobalStyles.customFontFamily
                ]}
              >
                Smart Way
              </Text>
            </View>
          </View>
          {/* view for header and sub header text */}
          <View
            style={{
              flex: 2.5
            }}
          >
            <View
              style={[
                GlobalStyles.marginTop20,
                {
                  flex: 1,
                  alignContent: "flex-start",
                  justifyContent: "space-around"
                }
              ]}
            >
              <View>
                <SliderBox
                  images={images}
                  dotColor={"#179ac5"}
                  inactiveDotColor={"#676766"}
                  autoplay={true}
                  resizeMode="cover"
                  circleLoop={true}
                  imageComponentStyle={{ width: width, height: 200 }}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                {/* <Button
                  mode="contained"
                  color="#179ac5"
                  style={{
                    width: width - 20,
                    marginHorizontal: 10,
                    elevation: 4,
                    height: 50,
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                  onPress={() => {
                    this.goToLogin();
                  }}
                >
                  <Text style={{ color: "white" }}>Sign In</Text>
                </Button>
                <Button
                  mode="contained"
                  color="#179ac5"
                  style={{
                    width: width - 20,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    elevation: 4,
                    height: 50,
                    justifyContent: "center",
                    alignContent: "center"
                  }}
                  onPress={() => {
                    this.gotToSignUp();
                  }}
                >
                  <Text style={{ color: "white", textAlignVertical: "center" }}>
                    Sign Up
                  </Text>
                </Button> */}
                <GradientButton
                  style={[{ marginVertical: 8, marginHorizontal: 10 }]}
                  text="Sign In"
                  textStyle={[{ fontSize: 16, fontFamily: "Maiandra GD" }]}
                  gradientBegin="#179ac5"
                  gradientEnd="#676766"
                  gradientDirection="diagonal"
                  radius={0}
                  height={50}
                  width={width - width / 15}
                  impact
                  impactStyle="Light"
                  onPressAction={() => {
                    this.goToLogin()
                  }}
                />
                <GradientButton
                  style={[{ marginVertical: 8, marginHorizontal: 10 }]}
                  text="Sign Up"
                  textStyle={[{ fontSize: 16 }, GlobalStyles.customFontFamily]}
                  gradientBegin="#179ac5"
                  gradientEnd="#676766"
                  gradientDirection="diagonal"
                  radius={0}
                  height={50}
                  width={width - width / 15}
                  impact
                  impactStyle="Light"
                  onPressAction={() => {
                    this.gotToSignUp()
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Welcome);
