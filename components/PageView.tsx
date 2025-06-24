import React from "react";
import { View, Text, ScrollView, Platform } from "react-native";
import WebView from "react-native-webview";

import injectedJs from "@/constants/metaInjection";

interface PageViewProps {
  onColorChange?: (color: string) => void;
}

export default function PageView({ onColorChange }: PageViewProps) {
  const [accentColor, setAccentColor] = React.useState("transparent")

  return (
    <View
      style={{
        backgroundColor: accentColor,
        flex: 1,
        position: "absolute",
        overflow: "hidden",
        inset: 0,
        paddingTop: Platform.OS === "android" ? 36 : 0, // Adjust
        paddingBottom: 0, // No bottom padding needed
      }}
    >
      <WebView
        source={{ uri: "https://google.com" }}
        style={{
          flex: 1,
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        injectedJavaScript={injectedJs}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        onMessage={(event) => {
          const accentColor = event.nativeEvent.data;
          setAccentColor(accentColor);
          if (onColorChange) {
            onColorChange(accentColor);
          }
        }}
      />
    </View>
  );
}
