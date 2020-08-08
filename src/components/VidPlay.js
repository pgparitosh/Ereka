import React from "react";
import { Video } from "expo-av";
import { View, Dimensions } from "react-native";
import { ScreenOrientation } from "expo";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default class VidPlay extends React.Component {
  player;

  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
    // this.showFullScreen = this.showFullScreen.bind(this);
  }

  handleRef(ref) {
    this.player = ref;
  }

  state = {
    videoProps: {},
    isLoading: false,
  };

  async componentDidMount() {
    const { videoProps, isVisisble } = this.props;
    this.setState({
      videoProps: videoProps,
      isVisisble: isVisisble,
    });
  }

  render() {
    const { videoProps, isLoading } = this.state;
    if (!videoProps || !videoProps.videoUrl || videoProps.videoUrl === "")
      return (
        <ActivityIndicator
          size={24}
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        />
      );
    return (
      <View>
        {isLoading ? (
          <ActivityIndicator
            style={{
              flex: 1,
              zIndex: 2,
              position: "absolute",
              marginLeft: width * 0.45,
              marginTop: 50,
            }}
          />
        ) : null}
        <Video
          key={videoProps.videoUrl}
          source={{ uri: videoProps.videoUrl }}
          positionMillis={parseInt(videoProps.startTimeInMillis)}
          rate={1.0}
          ref={this.handleRef}
          onLoadStart={() => {
            this.setState({ isLoading: true });
          }}
          onReadyForDisplay={() => {
            this.setState({ isLoading: false });
          }}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls
          style={{
            width: width,
            height: height / 3.4,
            marginBottom: 10,
            marginTop: 0,
          }}
          onFullscreenUpdate={this.props.showFullScreen}
        />
      </View>
    );
  }
}
