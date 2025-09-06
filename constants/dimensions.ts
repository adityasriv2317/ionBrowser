import { Dimensions } from "react-native";

export const dimensions = {
  width: Dimensions.get("window").width * 0.65,
  height: Dimensions.get("window").height * 0.65,
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

export const swipeMotion = {
  threshold: 0.25,
  outDuration: 250,
  inDuration: 300,
  reset: 400,
  rotation: 10,
};
