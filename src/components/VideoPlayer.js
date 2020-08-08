import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Slider,
} from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { PitchCorrectionQuality } from "expo-av/build/AV";

const { width, height } = Dimensions.get("window");

export default class VideoPlay extends Component {
  playbackInstance;
  state = {
    mute: false,
    shouldPlay: false,
    rate: 1,
    seekValue: 0,
    videoLength: 0,
    durationInMillis: 0,
    isSeeking: false,
    videoUrl: "",
    fullScreen: 1,
    buffered: 0,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.setState({
      videoUrl: this.props.videoUrl,
      seekValue: parseFloat(this.props.startTimeInMillis),
      rate: this.state.rate,
    });
  }

  handleRate = () => {
    var rate = this.state.rate;
    var newRate = rate === 1 ? 2 : 1;
    this.setState({ rate: newRate });
    this.playbackInstance.setStatusAsync({
      rate: newRate,
      shouldCorrectPitch: true,
      pitchCorrectionQuality: PitchCorrectionQuality.Medium,
    });
  };

  sliderValueChange = (value) => {
    this.setState({ seekValue: value });
    this.playbackInstance.setPositionAsync(value);
  };

  togglePlay = async () => {
    var shouldPlay = this.state.playbackState !== "Playing";
    if (this.playbackInstance !== null) {
      await this.playbackInstance.setStatusAsync({ shouldPlay });
      this.setState({ playbackState: shouldPlay ? "Playing" : "Paused" });
    }
  };

  replay10 = () => {
    var durationInMillis = this.state.durationInMillis;
    this.playbackInstance.setPositionAsync(
      durationInMillis - 10000 > 0 ? durationInMillis - 10000 : 0
    );
    this.setState({
      currentPlayingTime: this.showTimer(durationInMillis - 10000),
      durationInMillis: durationInMillis - 10000,
      isSeeking: false,
    });
  };

  forward10 = () => {
    var durationInMillis = this.state.durationInMillis;
    var videoLength = this.state.videoLength;
    this.playbackInstance.setPositionAsync(
      durationInMillis + 10000 < videoLength
        ? durationInMillis + 10000
        : videoLength
    );
    this.setState({
      currentPlayingTime: this.showTimer(durationInMillis + 10000),
      durationInMillis: durationInMillis + 10000,
      isSeeking: false,
    });
  };

  statusUpdate = (status) => {
    if (!this.state.isSeeking) {
      var currentPlayingTime = this.showTimer(status.positionMillis);
      var videoLengthTime = this.showTimer(status.durationMillis);
      this.setState({
        durationInMillis: status.positionMillis,
        currentPlayingTime: currentPlayingTime,
        videoLengthTime: videoLengthTime,
        videoLength: status.durationMillis,
        buffered: status.playableDurationMillis / status.durationMillis,
      });
    }
  };

  seekVideo = (value) => {
    var currentlyPlaying = this.showTimer(value);
    this.playbackInstance.setPositionAsync(value);
    this.setState({
      currentPlayingTime: currentlyPlaying,
      durationInMillis: value,
      isSeeking: false,
    });
  };

  seekingVideo = (value) => {
    this.setState({ isSeeking: true });
    var currentPlayingTime = this.showTimer(value);
    this.setState({ currentPlayingTime: currentPlayingTime });
  };

  showTimer(milli) {
    var hr = 0;
    var min = 0;
    if (milli >= 3600000) {
      hr = milli / 3600000;
      hr = Math.floor(hr);
      milli = milli - 3600000 * hr;
    }
    if (hr < 10) {
      hr = "0";
    } else {
      hr = hr.toString();
    }
    if (milli >= 60000) {
      min = milli / 60000;
      min = Math.floor(min);
      milli = milli - 60000 * min;
    }
    if (min < 10) {
      min = "0" + min;
    } else {
      min = min.toString();
    }
    var sec = milli / 1000;
    sec = Math.floor(sec);
    if (sec < 10) {
      sec = "0" + sec;
    } else {
      sec = sec.toString();
    }
    return hr + ":" + min + ":" + sec;
  }

  render() {
    const { width } = Dimensions.get("window");
    const { videoUrl, fullScreen } = this.state;
    if (videoUrl === "")
      return (
        <ActivityIndicator
          color="#179ac5"
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        />
      );
    return (
      <View style={styles.container}>
        <View>
          <Video
            source={{
              uri: videoUrl,
            }}
            ref={(component) => {
              this.playbackInstance = component;
            }}
            shouldPlay={this.state.shouldPlay}
            positionMillis={this.state.seekValue}
            progressUpdateIntervalMillis={250}
            resizeMode="cover"
            style={{ width: this.props.width, height: this.props.height }}
            isMuted={this.state.mute}
            onPlaybackStatusUpdate={this.statusUpdate}
            onFullscreenUpdate={this.showFullScreen}
          />
          <View style={styles.controlStrip}>
            <View style={styles.slider}>
              <Text
                style={{ fontSize: 12, color: "#179ac5", fontWeight: "bold" }}
              >
                {this.state.currentPlayingTime}
              </Text>
              <View>
                <ProgressBar
                  style={{
                    width: width * 0.55,
                    position: "absolute",
                    alignSelf: "center",
                    justifyContent: "center",
                    top: height < 650 ? 15 : height < 800 ? 8 : 4,
                    height: 2,
                  }}
                  progress={this.state.buffered}
                  color={"grey"}
                />
                <Slider
                  maximumValue={this.state.videoLength}
                  minimumValue={0}
                  style={{ width: width * 0.65, alignContent: "center" }}
                  value={this.state.durationInMillis}
                  onValueChange={this.seekingVideo}
                  onSlidingComplete={this.seekVideo}
                  thumbTintColor={"#179ac5"}
                  minimumTrackTintColor={"#179ac5"}
                ></Slider>
              </View>
              <Text
                style={{ fontSize: 12, color: "#179ac5", fontWeight: "bold" }}
              >
                {this.state.videoLengthTime}
              </Text>
            </View>
            <View style={styles.controlBar}>
              <MaterialIcons
                name={this.state.rate === 1 ? "filter-1" : "filter-2"}
                size={25}
                color="white"
                onPress={this.handleRate}
              />
              <MaterialIcons
                name={"replay-10"}
                size={30}
                color="white"
                onPress={this.replay10}
              />
              <MaterialIcons
                name={
                  this.state.playbackState === "Playing"
                    ? "pause"
                    : "play-arrow"
                }
                size={30}
                color="white"
                onPress={this.togglePlay}
              />
              <MaterialIcons
                name={"forward-10"}
                size={30}
                color="white"
                onPress={this.forward10}
              />
              <MaterialIcons
                name={this.props.fullScreen === 1 ? "fullscreen" : "fullscreen-exit"}
                size={30}
                color="white"
                onPress={this.props.showFullScreen}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  controlBar: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  controlStrip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
