import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage
} from "react-native";
import WebView from "react-native-webview";
import { Video } from "expo-av";
import {
  Text,
  withTheme,
  Button,
  IconButton,
  ActivityIndicator,
  ProgressBar,
} from "react-native-paper";
import { ScreenOrientation } from "expo";
import { VideosMock } from "../mocks/CourseImages";
import { GlobalStyles } from "../styles/GlobalStyles";
import * as FileSystem from "expo-file-system";
import { CircularProgressbar } from "react-circular-progressbar";
import VideoPlay from "../components/VideoPlayer";

const { width, height } = Dimensions.get("window");

class Videos extends React.Component {
  video = {};

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
      ),
    };
  };

  state = {
    allVideos: [],
    allDownloads: [],
    itemsDownloading: [],
    totalSize: null,
    progressValue: null,
    currentlyPlaying: {},
    playlist: [],
  };

  constructor(props) {
    super(props);
    this.renderCircularProgressBar = this.renderCircularProgressBar.bind(this);
    this.formatBytes = this.formatBytes.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.showFullScreen = this.showFullScreen.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    // service call to get all the videos
    const allVids = VideosMock;
    var list = [];
    list.push(allVids[0]);
    this.setState(
      {
        allVideos: allVids,
        currentlyPlaying: allVids[0],
        playlist: list,
      },
      () => {
        this.playVideo(this.state.currentlyPlaying);
      }
    );
  }

  async showFullScreen() {
    this.props.navigation.navigate("FullScreenVideoPlayer", {
      startTimeInMillis: this.state.currentlyPlaying.startTimeInMillis,
      videoUrl: this.state.currentlyPlaying.videoUrl,
    });
  }

  async showFullScreen1(val) {
    debugger;
    if (val === 1) {
      await ScreenOrientation.unlockAsync();
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  }

  async findDownloadedFiles() {
    var vids = this.state.videos;
    if (vids !== null && vids.length > 0) {
      await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
        .then((files) => {
          if (files.length > 0) {
            vids.forEach((element) => {
              var fileName = this.getFileName(element.videoUrl);
              if (files.indexOf(fileName) > -1) {
                element.isDownloaded = true;
                element.downloadedUrl = FileSystem.documentDirectory + fileName;
              } else {
                element.isDownloaded = false;
                element.downloadedUrl = "";
              }
            });
            this.setState({
              videos: vids,
              selected: false,
            });
          } else {
            // for the last download, the flatlist would not re render
            vids.forEach((element) => {
              element.isDownloaded = false;
              element.downloadedUrl = "";
            });
            this.setState({
              videos: vids,
              selected: false,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  async playVideo(video) {
    const playlist = [];
    playlist.push(video);
    this.setState({ playlist: playlist }, () => {
      this.renderVideo();
    });
  }

  renderVideo() {
    const { currentlyPlaying, playlist } = this.state;
    if (!currentlyPlaying || !currentlyPlaying.videoUrl) {
      return (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        />
      );
    }
    if (
      !currentlyPlaying.startTimeInMillis ||
      currentlyPlaying.startTimeInMillis === ""
    )
      currentlyPlaying.startTimeInMillis = "0";
    return playlist.map((item, index) => {
      return (
        // <VideoPlay
        //   key={item.id}
        //   startTimeInMillis={item.startTimeInMillis}
        //   showFullScreen={this.showFullScreen}
        //   // videoUrl={item.videoUrl}
        //   videoUrl={"https://vimeo.com/436093505"}
        //   height={250}
        //   width={width}
        //   nav={this.props.navigation}
        //   fullScreen={1}
        // />
        <WebView source={{uri: "https://player.vimeo.com/video/436095677"}}
         style={{height: 220, width: width}}
         key={item.id}
        ></WebView>
      );
    });
  }

  async downloadVideo(item) {
    var allDownloads = this.state.allDownloads;
    var itemsDownloading = this.state.itemsDownloading;
    itemsDownloading.push(item.id);
    this.setState({ itemsDownloading: itemsDownloading });

    const callback = (downloadProgress) => {
      // this.setState({
      //   totalSize: this.formatBytes(downloadProgress.totalBytesExpectedToWrite),
      // });

      // var progress =
      //   downloadProgress.totalBytesWritten /
      //   downloadProgress.totalBytesExpectedToWrite;
      // progress = progress.toFixed(2) * 100;
      // progress = progress.toFixed(0);
      var isMatch = false;
      allDownloads.forEach((element) => {
        if (element.id === item.id) {
          element.progress = progress;
          isMatch = true;
          return;
        }
      });
      if (!isMatch) {
        var newDownload = {
          id: item.id,
          progress: true,
        };
        allDownloads.push(newDownload);
      }

      this.setState({ allDownloads: allDownloads });
    };

    const downloadVideoResumable = FileSystem.createDownloadResumable(
      item.videoUrl,
      FileSystem.documentDirectory + item.title + ".mp4",
      {},
      callback
    );

    const dowloadThumbnailResumable = FileSystem.createDownloadResumable(
      item.thumbnailUrl,
      FileSystem.documentDirectory + item.title + ".png",
      {},
      callback
    );

    try {
      await dowloadThumbnailResumable.downloadAsync().then().catch();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
    try {
      await downloadVideoResumable
        .downloadAsync()
        .then(() => {
          llDownloads.forEach((download) => {
            if (download.id === item.id) {
              download.progress = false;
            }
          });
          this.setState({ allDownloads: allDownloads });
        })
        .catch();
    } catch (e) {
      console.error(e);
    }
  }

  getFileName(url) {
    var urlPieces = url.split(/[\s/]+/);
    return urlPieces[urlPieces.length - 1];
  }

  renderCircularProgressBar(id, isDownloaded) {
    var percentDownload = 0;
    if (isDownloaded) percentDownload = 100;
    else {
      this.state.allDownloads.forEach((element) => {
        if (element.id === id) {
          percentDownload = element.progress;
          return;
        }
      });
    }

    return (
      <View
        style={{
          marginHorizontal: 15,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#676766",
          borderWidth: 2,
          borderRadius: 50,
          height: 40,
          width: 40,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            textAlignVertical: "center",
            textAlign: "center",
            fontFamily: "Maiandra GD",
            color: "#179ac5",
            fontSize: 10,
          }}
        >
          {percentDownload}%
        </Text>
      </View>
    );
  }

  render() {
    const { theme } = this.props;
    const { allVideos, itemsDownloading, currentlyPlaying } = this.state;

    if (!allVideos || allVideos.length === 0) return null;
    return (
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={require("../../assets/images/bg-layer.png")}
        style={GlobalStyles.imageBackground}
      >
        <View style={[GlobalStyles.container, { marginBottom: 40 }]}>
          <StatusBar
            translucent={true}
            backgroundColor={theme.colors.primary}
            barStyle="dark-content"
          />
          <View style={{ flex: 1, marginBottom: 100 }}>
            <FlatList
              data={allVideos}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => this.renderVideo()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    marginTop: 10,
                    borderBottomColor: "#676766",
                    borderBottomWidth: 0.5,
                  }}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.playVideo(item);
                  }}
                >
                  <View style={[{ flexDirection: "row", width: "100%" }]}>
                    <View
                      style={{
                        // justifyContent: "flex-start",
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: item.thumbnailUrl,
                          }}
                          style={{ height: 80, width: 100 }}
                        />
                        <ProgressBar
                          progress={
                            parseFloat(item.startTimeInMillis) /
                            parseFloat(item.videoLengthInMillis)
                          }
                          color={"#179ac5"}
                        />
                      </View>
                      <Text style={GlobalStyles.videoTextStyle}>
                        {item.title} - {item.chapter} - {item.standard}
                      </Text>
                      {!this.state.itemsDownloading.includes(item.id) &&
                      !item.isDownloaded ? (
                        <IconButton
                          icon="cloud-download"
                          color={"#676766"}
                          size={30}
                          onPress={() => this.downloadVideo(item)}
                        />
                      ) : item.progress ? (
                        <ActivityIndicator
                          style={{
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                          color="#179ac5"
                        />
                      ) : (
                        <Text>Completed</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default withTheme(Videos);
