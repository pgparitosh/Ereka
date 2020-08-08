import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import { Text, withTheme, Button, TextInput } from "react-native-paper";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Props } from "../models/Props";
import GradientButton from "react-native-gradient-buttons";
import { SubscriptionsMock } from "../mocks/CourseImages";

const { width, height } = Dimensions.get("screen");

class Subscriptions extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props);
    this.selectSubscription = this.selectSubscription.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  state = {
    subscriptions: [],
    selectedSubscription: "1"
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ subscriptions: SubscriptionsMock });
  }

  selectSubscription(id) {
    this.setState({ selectedSubscription: id });
  }

  handleContinue() {
    // service call to send the call to the server where user would make the payment
    // once the confirmation is recieved and the details are stored on the server,
    // the isSubscribed flag is stored in local as well.
    // next, the user can be navigated to the courses page
    const { selectedSubscription } = this.state;
    var parentNav = this.props.navigation.dangerouslyGetParent();
    AsyncStorage.setItem("isSubscribed", "true")
      .then(() => {
        parentNav.navigate("AuthLoading");
      })
      .catch(error => {
        console.log(error);
        var supParent = parentNav.dangerouslyGetParent();
        AsyncStorage.clear();
        supParent.navigate("AuthLoading"); 
      });
  }

  render() {
    const { theme } = this.props;
    const { colors } = this.props.theme;
    const { subscriptions, selectedSubscription } = this.state;
    if (!subscriptions || subscriptions.length === 0) return null;
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
            source={require("../../assets/images/subscriptions/subscription-top-icon.png")}
            style={GlobalStyles.loginAndSignUpImage}
            resizeMethod="resize"
            resizeMode="cover"
          />
          <View style={{ flex: 1, marginTop: 20 }}>
            <View
              style={[
                GlobalStyles.displayInline,
                GlobalStyles.justifyContentCenter,
                GlobalStyles.marginBottom20
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
                Select Your
              </Text>
              <Text
                style={[
                  GlobalStyles.headerText,
                  GlobalStyles.primaryColorText,
                  GlobalStyles.customFontFamily
                ]}
              >
                Plan
              </Text>
            </View>
            <View style={{ marginHorizontal: 20, flex: 4 }}>
              <FlatList
                data={subscriptions}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{ marginBottom: 10 }}
                    activeOpacity={1}
                    onPress={() => {
                      this.selectSubscription(item.id);
                    }}
                  >
                    <View style={[{ flexDirection: "row", width: "100%" }]}>
                      <View
                        style={{
                          flex: 0.75,
                          backgroundColor:
                            selectedSubscription === item.id
                              ? "#179ac5"
                              : "#efefef",
                          justifyContent: "center",
                          padding: 10
                        }}
                      >
                        <Text
                          style={{
                            // textAlign: "center",
                            textAlignVertical: "center",
                            fontFamily: "Maiandra GD",
                            fontSize: 15,
                            color:
                              selectedSubscription === item.id
                                ? "white"
                                : "black"
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            // textAlign: "center",
                            textAlignVertical: "center",
                            fontFamily: "Maiandra GD",
                            fontSize: 15,
                            color:
                              selectedSubscription === item.id
                                ? "white"
                                : "black"
                          }}
                        >
                          {item.subtitle}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.55,
                          padding: 10,
                          backgroundColor:
                            selectedSubscription === item.id
                              ? "#666666"
                              : "#179ac5",
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            textAlignVertical: "center",
                            color: "white",
                            fontSize: 12,
                            fontFamily: "Maiandra GD"
                          }}
                        >
                          {item.subscriptionType}
                        </Text>
                        <Text
                          style={{
                            textAlignVertical: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 19,
                            fontFamily: "Maiandra GD"
                          }}
                        >
                          {item.price}
                        </Text>
                        <Text
                          style={{
                            textAlignVertical: "center",
                            color: "white",
                            fontSize: 10,
                            fontFamily: "Maiandra GD"
                          }}
                        >
                          {item.discount}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <GradientButton
                style={[{ marginVertical: 20, marginHorizontal: 20 }]}
                text="Continue"
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
                  this.handleContinue();
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Subscriptions);
