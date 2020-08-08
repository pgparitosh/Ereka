import React from "react";
import { Image, TouchableOpacity, Button } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import Courses from "../screens/Courses";
import Chapters from "../screens/Chapters";
import Settings from "../screens/Settings";
import Videos from "../screens/Videos";
import Documents from "../screens/Documents";
import FullScreenVideoPlayer from "../screens/FullScreenVideoPlayer";
import Downloads from "../screens/Downloads";

export default createStackNavigator(
  {
    Courses: Courses,
    Chapters: Chapters,
    Settings: Settings,
    Videos: Videos,
    Documents: Documents,
    FullScreenVideoPlayer: FullScreenVideoPlayer,
    Downloads: Downloads
  },
  {
    defaultNavigationOptions: {
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: 20
      },
      headerTitleStyle: {
        // fontSize: 17,
        fontFamily: "Maiandra GD",
        color: "#179ac5"
      }
    }
  }
);
