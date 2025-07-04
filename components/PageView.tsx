import { useContext, useState, useCallback, useRef, useEffect } from "react";
import { ScrollView, RefreshControl, BackHandler } from "react-native";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import injectedJs from "@/constants/metaInjection";
import { BrowserContext } from "@/contexts/BrowserContext";
import { colorCompare } from "@/constants/windowColors";

import { useTabManager } from "@/contexts/TabContext";

export default function PageView() {
  const { tabs } = useTabManager();
  const activeTab = tabs.find((tab) => tab.isActive);

  const [accentColor, setAccentColor] = useState("transparent");
  const [refreshing, setRefreshing] = useState(false);
  const {
    currentUrl,
    updateHistory,
    isLoading,
    setIsLoading,
    setAccent,
    setCanGoBack,
    setCanGoForward,
    canGoBack,
    webRef,
  } = useContext(BrowserContext);

  const [atTop, setAtTop] = useState(true);

  const onRefresh = useCallback(() => {
    if (!atTop) return;
    setRefreshing(true);
  }, [atTop]);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);
  }, [canGoBack, webRef]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ position: "absolute", inset: 0 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={atTop}
          colors={["#a34f27", "#e8b827", "#e81427"]}
          progressBackgroundColor={accentColor}
          progressViewOffset={21}
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
        // ref={webRef}
        ref={webRef}
        key={refreshing ? "refreshing" : "not-refreshing"} // Force re-render on refresh
        source={{ uri: currentUrl || "" }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          minHeight: 875,
          minWidth: 412,
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
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (typeof data.scrollTop === "number") {
              setAtTop(data.scrollTop <= 0);
            }
          } catch {
          } finally {
            setAccentColor(event.nativeEvent.data);
            colorCompare(accentColor, setAccent);
          }
        }}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);

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
