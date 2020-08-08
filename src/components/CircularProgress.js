import React from "react";
import { View, StyleSheet, Text } from "react-native";

const wid = 45;

/**
 * Override styles that get passed from props
 **/
propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }]
  };
};

renderThirdLayer = percent => {
  if (percent > 50) {
    /**
     * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the propStyle function
     **/
    return (
      <View
        style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
      ></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

const CircularProgress = ({ percent }) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      <Text style={styles.display}>{percent}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wid,
    height: wid,
    borderWidth: wid/10,
    borderRadius: wid/2,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  firstProgressLayer: {
    width: wid,
    height: wid,
    borderWidth: wid/10,
    borderRadius: wid/2,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    transform: [{ rotateZ: "-135deg" }]
  },
  secondProgressLayer: {
    width: wid,
    height: wid,
    position: "absolute",
    borderWidth: wid/10,
    borderRadius: wid/2,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    transform: [{ rotateZ: "45deg" }]
  },
  offsetLayer: {
    width: wid,
    height: wid,
    position: "absolute",
    borderWidth: wid/10,
    borderRadius: wid/2,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    transform: [{ rotateZ: "-135deg" }]
  },
  display: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default CircularProgress;
