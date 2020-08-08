import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage,
  BackHandler
} from "react-native";
import {
  Text,
  withTheme,
  Button,
  IconButton,
  ActivityIndicator,
  ProgressBar,
} from "react-native-paper";
import { ScreenOrientation } from "expo";
import VideoPlay from "../components/VideoPlayer";

const { width, height } = Dimensions.get("window");

export default class FullScreenVideoPlayer extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.exitFullScreen = this.exitFullScreen.bind(this);
  }

  state = {
    startTimeInMillis: 0,
    videoUrl: "",
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.exitFullScreen);
    var startTimeInMillis = this.props.navigation.state.params
      .startTimeInMillis;
    var videoUrl = this.props.navigation.state.params.videoUrl;
    this.setState({
      startTimeInMillis: startTimeInMillis,
      videoUrl: videoUrl,
    });
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then().catch();
  }

  async componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.exitFullScreen);
  }

  async exitFullScreen() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    )
      .then(this.props.navigation.goBack())
      .catch((err) => console.log(err));
  }

  render() {
    const { startTimeInMillis, videoUrl } = this.state;
    if (videoUrl === "") return null;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <VideoPlay
          startTimeInMillis={startTimeInMillis}
          showFullScreen={this.exitFullScreen}
          videoUrl={videoUrl}
          height={width}
          width={height}
          videoUrl={videoUrl}
          nav={this.props.nav}
          fullScreen={0}
        />
      </View>
    );
  }
}
