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

  const [atTop, setAtTop] = useState(true);

  const onRefresh = useCallback(() => {
    if (!atTop) return;
    setRefreshing(true);
    // setTimeout(() => setRefreshing(false), 20000);
  }, [atTop]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ position: "absolute", inset: 0 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={atTop}
          colors={["#a34f27", "#e81427", "#e81c52", "#e8b827"]}
          // tintColor="#e8b827"
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
          backgroundColor: accentColor, // Uncomment if you want to use accentColor as background
          minHeight: 875, // Adjusted for better visibility
          minWidth: 412, // Adjusted for better visibility
          height: "100%",
          width: "100%",
        }}
        injectedJavaScript={injectedJs}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onLoad={() => setRefreshing(false)}
        scalesPageToFit
        scrollEnabled={true}
        onMessage={(event) => {
          // setAccentColor(event.nativeEvent.data);
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (typeof data.scrollTop === "number") {
              setAtTop(data.scrollTop <= 0);
            }
          } catch {
            // setAccentColor(event.nativeEvent.data);
          } finally {
            setAccentColor(event.nativeEvent.data);
          }
        }}
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
