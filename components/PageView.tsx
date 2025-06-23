import React from "react";
import { View, Text, Platform } from "react-native";
import WebView from "react-native-webview";

import injectedJs from "@/constants/metaInjection";

interface PageViewProps {
  onColorChange?: (color: string) => void;
}

export default function PageView({ onColorChange }: PageViewProps) {
  const [accentColor, setAccentColor] = React.useState("#000000");

  return (
    <View
      style={{ backgroundColor: accentColor }}
      className="flex-1 absolute h-full w-full pt-12"
    >
      <WebView
        source={{ uri: "https://microsoft.com" }}
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
