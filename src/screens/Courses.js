import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Text, withTheme, Button } from "react-native-paper";
import { CourseImages } from "../mocks/CourseImages";
import { GlobalStyles } from "../styles/GlobalStyles";

class Courses extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            style={{ height: 30, width: 30, marginRight: 10 }}
            resizeMode="stretch"
            resizeMethod="resize"
            source={require("../../assets/images/home/menu-icon.png")}
          />
        </TouchableOpacity>
      )
    };
  };
  
  state = {
    courseImages: []
  };

  constructor(props) {
    super(props);
    this.openCourse = this.openCourse.bind(this);
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ courseImages: CourseImages });
  }

  openCourse(id) {
    this.props.navigation.navigate("Chapters", { courseId: id });
  }

  render() {
    const { theme } = this.props;
    const { courseImages } = this.state;

    if (!courseImages && courseImages.length === 0) return null;

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
          

          {/* view for header and sub header text */}
          

          {/* view for courses */}
          <FlatList
            data={courseImages}
            // contentContainerStyle={{marginHorizontal: 20}}
            ListHeaderComponent={
              () => (
                <View style={{marginHorizontal: 0}}>
                  <Image
                    source={require("../../assets/images/home-banner.png")}
                    style={GlobalStyles.bannerImage}
                  >
                  </Image>
                  <View>
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
                        Hi,
                      </Text>
                      <Text
                        style={[
                          GlobalStyles.headerText,
                          GlobalStyles.primaryColorText,
                          GlobalStyles.customFontFamily
                        ]}
                      >
                        Paritosh
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          GlobalStyles.subHeaderText,
                          GlobalStyles.secondaryColorText,
                          GlobalStyles.customFontFamily,
                          GlobalStyles.textCenterAlign,
                          GlobalStyles.marginHorizontal20,
                          GlobalStyles.textBold
                        ]}
                      >
                        Anyone who has never made a mistake has never tried anything new
                      </Text>
                    </View>
                  </View>
                  </View>
              )
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[GlobalStyles.courseImageContainer, {marginLeft: index%2===0 ? 30 : 10}]}
                key={item.id}
                onPress={() => {
                  this.openCourse(item.id);
                }}
              >
                <ImageBackground
                  style={GlobalStyles.courseImage}
                  // source={item.imageUrl}
                  source={require("../../assets/images/home/subject-bg.png")}
                >
                  <Image
                    source={item.iconUrl}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{ height: 70, width: 70 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      fontFamily: "Maiandra GD",
                      color: "white",
                      marginTop: 10,
                      marginHorizontal: 10
                    }}
                  >
                    {item.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* view for bottom buttons */}

          <View style={{marginBottom: 40}}>
            <TouchableOpacity
              style={[GlobalStyles.marginBottom10, { marginTop: 10 }]}
            >
              <Image
                source={require("../../assets/images/recently-learned-button.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                GlobalStyles.displayInline,
                GlobalStyles.alignPoles,
                GlobalStyles.backgroundWhite,
                // GlobalStyles.marginBottom10,
                GlobalStyles.padding10,
                { marginBottom: 100 }
              ]}
            >
              <Text
                style={[
                  GlobalStyles.buttonTextLg,
                  GlobalStyles.customFontFamily
                ]}
              >
                {"Share with Friends".toUpperCase()}
              </Text>
              <Image
                source={require("../../assets/images/home/share-icon.png")}
                resizeMethod="resize"
                resizeMode="contain"
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Courses);
