import { View } from "moti";
import WebView from "react-native-webview";

import url from "@/assets/homePage.html";

export default function HomeLiquid() {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        overflow: "hidden",
        inset: 0,
        padding: 0, // Adjust if needed
      }}
    >
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        source={url}
        style={{
          flex: 1,
          backgroundColor: "#00000000",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      />
    </View>
  );
}
