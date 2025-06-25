import React from "react";
import { View, Text, ScrollView, Platform, Dimensions } from "react-native";
import WebView from "react-native-webview";

import injectedJs from "@/constants/metaInjection";
import { LinearGradient } from "expo-linear-gradient";

export default function PageView() {
  const [accentColor, setAccentColor] = React.useState("transparent");
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <LinearGradient
        colors={["#00000000", accentColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          height: 42,
          width: "100%",
          opacity: 0.8,
          transitionProperty: "background-color",
          transitionDuration: "1s",
        }}
      />
      <WebView
        source={{ uri: "https://apple.com" }}
        style={{
          flex: 1,
          backgroundColor: "#00000000",
          height: "100%",
          width: "100%",
        }}
        injectedJavaScript={injectedJs}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onMessage={(event) => {
          const accentColor = event.nativeEvent.data;
          setAccentColor(accentColor);
        }}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
