import { useContext, useState, useCallback } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import injectedJs from "@/constants/metaInjection";
import { BrowserContext } from "@/contexts/BrowserContext";

export default function DumpView() {
  const [accentColor, setAccentColor] = useState("transparent");
  const { currentUrl, updateHistory, isLoading, setIsLoading } =
    useContext(BrowserContext);

  const [refreshing, setRefreshing] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [prevUrl, setPrevUrl] = useState(currentUrl);

  const opacityPrev = useSharedValue(1);
  const opacityNext = useSharedValue(0);

  const onRefresh = useCallback(() => {
    if (!atTop) return;
    setRefreshing(true);
    setPrevUrl(currentUrl); // Cache current URL for background layer
  }, [atTop, currentUrl]);

  const handleTransition = () => {
    opacityNext.value = withTiming(1, { duration: 300 });
    opacityPrev.value = withTiming(0, { duration: 300 });

    setTimeout(() => {
      setRefreshing(false);
      opacityPrev.value = 1;
      opacityNext.value = 0;
    }, 300);
  };

  const animatedPrevStyle = useAnimatedStyle(() => ({
    opacity: opacityPrev.value,
    position: "absolute",
    height: "100%",
    width: "100%",
  }));

  const animatedNextStyle = useAnimatedStyle(() => ({
    opacity: opacityNext.value,
    position: "absolute",
    height: "100%",
    width: "100%",
  }));

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

      <View style={{ flex: 1 }}>
        <Animated.View style={animatedPrevStyle}>
          <WebView
            source={{ uri: prevUrl || "" }}
            style={{
              flex: 1,
              backgroundColor: accentColor,
              minHeight: 875,
              minWidth: 412,
              width: "100%",
              height: "100%",
            }}
            injectedJavaScript={injectedJs}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            scrollEnabled
            scalesPageToFit
          />
        </Animated.View>

        {refreshing && (
          <Animated.View style={animatedNextStyle}>
            <WebView
              source={{ uri: currentUrl || "" }}
              style={{
                flex: 1,
                backgroundColor: accentColor,
                minHeight: 875,
                minWidth: 412,
                width: "100%",
                height: "100%",
              }}
              injectedJavaScript={injectedJs}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              scrollEnabled
              scalesPageToFit
              onLoadEnd={handleTransition}
              onMessage={(event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  if (typeof data.scrollTop === "number") {
                    setAtTop(data.scrollTop <= 0);
                  }
                } catch {
                  // fallback: not scrollTop data
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
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
}
