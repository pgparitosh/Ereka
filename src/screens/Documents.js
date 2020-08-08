import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";
import { Block, Text, Card } from "../components";
import { withTheme, List, IconButton } from "react-native-paper";
import { GlobalStyles } from "../styles/GlobalStyles";
import { DOMAIN, AWS_DOMAIN } from "../constants/ApplicationConstants";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome";
import CoursesService from "../services/CoursesService";

const { width } = Dimensions.get("window");

class Documents extends React.Component {
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

  constructor(props) {
    super(props);
  }

  state = {
    documents: []
  };

  openDocument(url) {
    WebBrowser.openBrowserAsync(url);
  }

  async componentDidMount() {
    debugger;
    const chapterId = this.props.chapterId;

    await AsyncStorage.getItem("userToken")
      .then(userToken => {
        var inputObj = {
          json: {
            api_key: userToken,
            installation_id: Constants.installationId,
            device_name: Constants.deviceName,
            chapter_id: chapterId
          }
        };
        CoursesService.getDocumentsList(inputObj)
          .then(res => {
            var rawDocuments = res.data;
            var allDocuments = [];
            if (rawDocuments && rawDocuments.length > 0) {
              rawDocuments.forEach(element => {
                var document = {
                  documentId: element.document_id,
                  documentTitle: element.title,
                  documentUrl:
                    DOMAIN + element.document_path + element.document_name,
                  doucmentType: "pdf"
                };
                allDocuments.push(document);
              });
              this.setState({
                documents: allDocuments
              });
            } else {
              this.setState({
                documents: []
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
        const parentNav = this.props.navigation.dangerouslyGetParent();
        AsyncStorage.clear().then(() => {
          parentNav.navigate("AuthLoading");
        });
      });
  }

  render() {
    const { documents } = this.state;
    if (documents === null || documents.length === 0) return null;
    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <View style={[GlobalStyles.container, {marginBottom: 80}]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            style={{ marginTop: 20, marginBottom: 80 }}
            data={documents}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <Card shadow style={styles.category}>
                <TouchableOpacity
                  style={styles.courseContainer}
                  onPress={() => this.openDocument(item.documentUrl)}
                >
                  <Block style={styles.imageBlock}>
                    <Image
                      source={require("../../assets/images/pdf.png")}
                      style={{ height: 45, width: 45 }}
                    />
                  </Block>
                  <Block style={styles.textBlock}>
                    <Text size={14}>{item.documentTitle}</Text>
                  </Block>
                  <Block style={styles.downloadBlock}>
                    <IconButton
                      icon="file-download"
                      color={"#676766"}
                      size={30}
                    />
                  </Block>
                </TouchableOpacity>
              </Card>
            )}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Documents);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 32,
    marginBottom: 10
  },
  category: {
    marginLeft: 10,
    marginRight: 10,
    width: width - 20,
    minWidth: (width - 25 * 2.4 - 16) / 2,
    maxWidth: width - 16,
    maxHeight: (width - 25 * 2.4 - 16) / 2
  },
  courseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  imageBlock: {
    flex: 0.2,
    justifyContent: "center",
    alignContent: "center"
  },
  textBlock: {
    flex: 0.7,
    justifyContent: "center"
    // alignContent: "center",
  },
  downloadBlock: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "center",
    marginRight: 10
  }
});
