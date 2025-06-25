import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";

import injectedJs from "@/constants/metaInjection";
import { BrowserContext } from "@/contexts/BrowserContext";

export default function PageView() {
  const [accentColor, setAccentColor] = useState("transparent");
  const { currentUrl, updateHistory, isLoading, setIsLoading } =
    useContext(BrowserContext);

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
        source={{ uri: currentUrl ? currentUrl : "" }}
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
        onNavigationStateChange={(navState) => {
          // Only update history if the URL is different and not empty
          const url =
            navState.url == "about:blank" ||
            navState.url == "" ||
            navState.url == "about:home" ||
            navState.url == "Webpage not available"
              ? ""
              : navState.url;
          if (!navState.loading && url && url !== currentUrl) {
            const title = navState.title ? navState.title : "Untitled Page";
            updateHistory(url, title);
          }
          setIsLoading(navState.loading);
        }}
      />
    </ScrollView>
  );
}
