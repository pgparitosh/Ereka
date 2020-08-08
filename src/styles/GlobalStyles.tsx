import { StyleSheet, StatusBar, Dimensions } from "react-native";
const statusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get("screen");

const GlobalStyles = StyleSheet.create({
  // generic
  imageBackground: {
    width: width,
    height: height
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    //marginVertical: 20,
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
    //marginVertical: 20,
  },
  bannerImage: {
    // marginTop: statusBarHeight,
    width: width,
    height: 150
  },
  welcomeImage: {
    marginTop: statusBarHeight + 40,
    width: 140,
    height: 140
  },
  loginAndSignUpImage: {
    marginTop: statusBarHeight + 30,
    width: 60,
    height: 60
  },
  bannerImages: {
    width: width,
    height: height / 2.8,
    overflow: "visible"
  },
  customFontFamily: {
    fontFamily: "Maiandra GD"
  },
  stepsContainer: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  },

  // size
  headerText: {
    marginBottom: 10,
    fontSize: 24
  },
  subHeaderText: {
    marginBottom: 10,
    fontSize: 14
  },
  font16: {
    fontSize: 16
  },
  buttonTextLg: {
    fontSize: 19
  },

  // colors
  primaryColorText: {
    color: "#179ac5"
  },
  secondaryColorText: {
    color: "#676766"
  },
  backgroundWhite: {
    backgroundColor: "white"
  },

  // text transform
  textBold: {
    fontWeight: "bold"
  },

  // position
  margin10: {
    margin: 10
  },
  marginBottom20: {
    marginBottom: 20
  },
  marginBottom10: {
    marginBottom: 10
  },
  marginRight10: {
    marginRight: 10
  },
  marginHorizontal10: {
    marginHorizontal: 10
  },
  marginHorizontal20: {
    marginHorizontal: 20
  },
  marginTop20: {
    marginTop: 20
  },
  padding10: {
    padding: 10
  },
  padding8: {
    padding: 8
  },

  // display
  displayInline: {
    flexDirection: "row"
  },
  alignPoles: {
    justifyContent: "space-between"
  },
  textCenterAlign: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  width100: {
    width: width
  },

  // Course Images Styles
  courseImageContainer: {
    alignSelf: "center",
    flexDirection: "column",
    margin: 10,
    height: width / 2 - 40,
    width: width / 2 - 40
  },
  videoContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: width - 20
  },
  videoTextStyle: {
    marginHorizontal: 10,
    maxWidth: width - 220,
    fontFamily: "Maiandra GD",
    fontSize: 13
  },
  courseImage: {
    justifyContent: "center",
    alignItems: "center",
    height: width / 2 - 40,
    width: width / 2 - 40
  },
  selectStandardContainer: {
    alignSelf: "center",
    flexDirection: "column",
    margin: 0,
    height: 100,
    width: 100
  },
  selectStandardImage: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100
  }
});

export { GlobalStyles };
