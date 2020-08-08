import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { Text, withTheme, Button, TextInput } from "react-native-paper";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Props } from "../models/Props";
import { Standards } from "../mocks/CourseImages";
import GradientButton from "react-native-gradient-buttons";

const { width, height } = Dimensions.get("screen");

class SelectStandard extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.handleSelectStandard = this.handleSelectStandard.bind(this);
    this.selectStandard = this.selectStandard.bind(this);
  }

  state = {
    standards: [],
    selectedStandard: 0
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ standards: Standards });
  }

  selectStandard(id) {
    this.setState({ selectedStandard: id });
  }

  handleSelectStandard() {
    const {selectedStandard} = this.state;
    if(!selectedStandard || selectedStandard === 0) {
      Alert.alert(
        "Input Required",
        "Please select a standard to proceed further!"
      );
    }
    else {
      // service call for selecting standard
      // once the service call is successful, the app should navigate to pricings page
      this.props.navigation.navigate("Subscriptions");
    }
  }

  render() {
    const { theme } = this.props;
    const { colors } = this.props.theme;
    const { standards } = this.state;

    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <View style={[GlobalStyles.container]}>
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
          <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
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
                Select
              </Text>
              <Text
                style={[
                  GlobalStyles.headerText,
                  GlobalStyles.primaryColorText,
                  GlobalStyles.customFontFamily
                ]}
              >
                Standard
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={[
                  GlobalStyles.font16,
                  GlobalStyles.secondaryColorText,
                  GlobalStyles.customFontFamily,
                  GlobalStyles.textCenterAlign,
                  GlobalStyles.marginHorizontal20
                ]}
              >
                **Please carefully select your standard. Your courses would
                appear accordingly.
              </Text>
            </View>
            {/* <View style={{ alignItems: "center" }}> */}
            <FlatList
              data={standards}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[GlobalStyles.selectStandardContainer]}
                  activeOpacity={0.8}
                  key={item.id}
                  onPress={() => this.selectStandard(item.id)}
                >
                  <Text
                    style={{
                      backgroundColor:
                        this.state.selectedStandard === item.id
                          ? "#179ac5"
                          : "#9e9e9e",
                      height: 90,
                      width: 90,
                      fontSize: 20,
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "white"
                    }}
                  >
                    {item.standard}
                  </Text>
                </TouchableOpacity>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
            <GradientButton
              style={[{ marginTop: 20, marginHorizontal: 20, marginBottom: 50 }]}
              text="Confirm and Proceed"
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
                this.handleSelectStandard();
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(SelectStandard);
