import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList
} from "react-native";
import Constants from "expo-constants";
import { Text, withTheme, Button, List } from "react-native-paper";
import { ChaptersMock } from "../mocks/CourseImages";
import { GlobalStyles } from "../styles/GlobalStyles";

class Chapters extends React.Component {
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
    allChapters: [],
    expanded: ""
  };

  constructor(props) {
    super(props);
    this._handlePress = this._handlePress.bind(this);
    this.showVideos = this.showVideos.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ allChapters: ChaptersMock });
  }

  showVideos(id) {
    this.props.navigation.navigate("Videos", { chapterId: id });
  }

  showDocuments(id) {
    this.props.navigation.navigate("Documents", { chapterId: id });
  }

  _handlePress = id => {
    var valToSet = "";
    if (!(this.state.expanded === id)) {
      valToSet = id;
    }
    this.setState({
      expanded: valToSet
    });
  };

  render() {
    const { theme } = this.props;
    const { allChapters, expanded } = this.state;

    if (!allChapters && allChapters.length === 0) return null;

    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <View style={{ flex: 1, marginBottom: 80 }}>
          <StatusBar
            translucent={true}
            backgroundColor={theme.colors.primary}
            barStyle="dark-content"
          />
          <Image
            source={require("../../assets/images/courses/maths-banner.jpg")}
            style={GlobalStyles.bannerImage}
          ></Image>
          <List.Section
            title="Select Chapter"
            titleStyle={{
              fontSize: 20,
              fontFamily: "Maiandra GD",
              color: "#179ac5",
              textAlign: "center"
              // fontWeight: "bold"
            }}
          ></List.Section>
          <FlatList
            data={allChapters}
            style={{ marginBottom: 50 }}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => (
              <List.Accordion
                title={item.title}
                description={item.desc}
                key={item.id}
                descriptionNumberOfLines={2}
                style={{
                  backgroundColor: "white",
                  marginHorizontal: 10,
                  borderBottomColor: "#efefef",
                  borderBottomWidth: 1,
                  elevation: 4,
                  marginBottom: expanded === item.id ? 0 : 20
                }}
                titleStyle={{
                  fontSize: 17,
                  fontFamily: "Maiandra GD"
                }}
                descriptionStyle={{
                  fontSize: 12,
                  fontFamily: "Maiandra GD"
                }}
                left={props => (
                  <List.Icon style={{}} {...props} icon="book-open-variant" />
                )}
                expanded={expanded === item.id}
                onPress={() => {
                  this._handlePress(item.id);
                }}
              >
                <List.Item
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 10,
                    elevation: 4,
                    backgroundColor: "#efefef"
                  }}
                  titleStyle={{
                    fontSize: 17,
                    fontFamily: "Maiandra GD",
                    color: "#179ac5"
                  }}
                  descriptionStyle={{
                    fontSize: 12,
                    fontFamily: "Maiandra GD",
                    color: "#179ac5"
                  }}
                  left={props => (
                    <List.Icon
                      {...props}
                      color="#179ac5"
                      icon="library-video"
                    />
                  )}
                  title="View Videos"
                  onPress={() => {
                    this.showVideos(item.id);
                  }}
                  description="Watch all the videos for this chapter!"
                />
                <List.Item
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 10,
                     marginBottom: 20,
                     elevation: 4,
                    backgroundColor: "#efefef"
                  }}
                  titleStyle={{
                      fontSize: 17,
                      fontFamily: "Maiandra GD",
                      color: "#179ac5"
                  }}
                  descriptionStyle={{
                    fontSize: 12,
                    fontFamily: "Maiandra GD",
                    color: "#179ac5"
                  }}
                  left={props => (
                    <List.Icon {...props} color="#179ac5" icon="file" />
                  )}
                  onPress={() => {
                    this.showDocuments(item.id);
                  }}
                  title="View Documents"
                  description="View all documents attached to this chapter!"
                />
                
              </List.Accordion>
            )}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Chapters);
