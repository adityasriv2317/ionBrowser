import { useContext, useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import injectedJs from "@/constants/metaInjection";
import { BrowserContext } from "@/contexts/BrowserContext";

export default function PageView() {
  const [accentColor, setAccentColor] = useState("transparent");
  const [refreshing, setRefreshing] = useState(false);
  const { currentUrl, updateHistory, isLoading, setIsLoading } =
    useContext(BrowserContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Graceful wait
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ position: "absolute", inset: 0 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#888"
        />
      }
    >
      <LinearGradient
        colors={["#00000000", accentColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          height: 42,
          width: "100%",
          opacity: 0.8,
        }}
      />
      <WebView
        // forece re-render on refresh
        key={refreshing ? "refreshing" : "not-refreshing"} // Force re-render on refresh
        source={{ uri: currentUrl || "" }}
        style={{
          flex: 1,
          minHeight: 875, // Adjusted for better visibility
          minWidth: 412, // Adjusted for better visibility
          height: "100%",
          width: "100%",
        }}
        injectedJavaScript={injectedJs}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        scalesPageToFit
        scrollEnabled={true}
        onMessage={(event) => setAccentColor(event.nativeEvent.data)}
        onNavigationStateChange={(navState) => {
          const url = [
            "about:blank",
            "about:home",
            "Webpage not available",
            "",
          ].includes(navState.url)
            ? ""
            : navState.url;
          if (!navState.loading && url && url !== currentUrl) {
            updateHistory(url, navState.title || "Untitled Page");
          }
          setIsLoading(navState.loading);
        }}
      />
    </ScrollView>
  );
}
