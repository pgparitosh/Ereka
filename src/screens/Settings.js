import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { withTheme } from "react-native-paper";
import { Divider, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { GlobalStyles } from "../styles/GlobalStyles";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDownloads = this.handleDownloads.bind(this);
  }

  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
  };

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={(text) => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }

  handleDownloads() {
    this.props.navigation.navigate("Downloads");
  }

  handleLogout() {
    AsyncStorage.multiRemove(["userToken", "isSubscribed"])
      .then(() => {
        var parent = this.props.navigation.dangerouslyGetParent();
        parent.navigate("AuthLoading");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { profile, editing } = this.state;
    if (profile === {}) return null;
    // const registeredDevices = profile.registeredDevices;

    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <Block style={{marginBottom: 80}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <TouchableOpacity style={styles.button}>
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Profile and Preferences
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleDownloads}
              >
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Downloads
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={
                      Platform.OS === "ios" ? "ios-download" : "md-download"
                    }
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity style={styles.button}>
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Subscription Details
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={Platform.OS === "ios" ? "ios-card" : "md-card"}
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity style={styles.button}>
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Registered Devices
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={
                      Platform.OS === "ios"
                        ? "ios-phone-portrait"
                        : "md-phone-portrait"
                    }
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity style={styles.button}>
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Help and Support
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={Platform.OS === "ios" ? "ios-help" : "md-help"}
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity style={styles.button}>
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Feedback
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity style={styles.button}>
                <Block row center space="between">
                  <Text
                    semibold
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Report a Bug
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={"#179ac5"}
                    size={theme.sizes.font * 1.75}
                    name={Platform.OS === "ios" ? "ios-bug" : "md-bug"}
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <Block style={styles.operations}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.handleLogout();
                }}
              >
                <Block row center space="between">
                  <Text
                    semibold
                    color={"red"}
                    style={[GlobalStyles.customFontFamily, { fontSize: 14 }]}
                  >
                    Logout
                  </Text>
                  <Icon.Ionicons
                    style={{ marginRight: 10 }}
                    color={theme.colors.accent}
                    size={theme.sizes.font * 1.75}
                    name={Platform.OS === "ios" ? "ios-power" : "md-power"}
                  />
                </Block>
              </TouchableOpacity>
            </Block>
          </ScrollView>
        </Block>
      </ImageBackground>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default withTheme(Settings);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  button: {
    height: 60,
    backgroundColor: "white",
    paddingHorizontal: 10,
    elevation: 4,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    marginBottom: theme.sizes.base * 0.75,
    paddingHorizontal: theme.sizes.base,
    elevation: 4,
  },
  operations: {
    // marginTop: 10,
    marginBottom: theme.sizes.base * 0.75,
    paddingHorizontal: theme.sizes.base,
  },
  inputRow: {
    alignItems: "flex-end",
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    marginTop: 10,
    paddingHorizontal: theme.sizes.base,
  },
});
