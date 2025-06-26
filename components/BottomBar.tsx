import { MotiView } from "moti";
import {
  TouchableOpacity,
  TextInput,
  Keyboard,
  Text,
  View,
} from "react-native";
import { useRef, useState, useEffect, useContext } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CreditCardIcon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { animationConfig, BottomBarState } from "@/constants/bottomBar";

import { BrowserContext } from "@/contexts/BrowserContext";
import MenuBar from "./MenuBar";

export default function BottomBar() {
  // url
  const {
    inputValue,
    setInputValue,
    setCurrentUrl,
    pageTitle,
    currentUrl,
    isEditing,
    setIsEditing,
    isLoading,
    setPageTitle,
    setIsLoading,
  } = useContext(BrowserContext);

  const handleNavigate = () => {
    if (isLoading) {
      return;
    }

    let input = inputValue.trim();

    // If user entered something like "example", treat it as a search
    const isLikelySearch = !input.includes(".") && !input.startsWith("http");
    let url = "";

    if (isLikelySearch) {
      // Google search
      url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    } else {
      // Make sure it starts with http/https
      if (!/^https?:\/\//i.test(input)) {
        input = `https://${input}`;
      }

      try {
        const validUrl = new URL(input);
        url = validUrl.href;
      } catch (error) {
        // If URL constructor throws, fallback to search
        url = `https://www.google.com/search?q=${encodeURIComponent(inputValue)}`;
      }
    }

    setCurrentUrl(url);
    setPageTitle(inputValue); // Set page title to the input value
    setInputValue(url);
    setIsEditing(false);
    setIsLoading(true);
  };

  // color type constant
  const [colorType, setColorType] = useState(1);

  // bottomBar button states
  const [showTabs, setShowTabs] = useState(currentUrl !== "" ? true : false);
  const searchBoxRef = useRef<TextInput>(null);
  // bottom bar animation states
  const [bottomState, setBottomState] = useState<BottomBarState>("normalState");
  const [previousState, setPreviousState] =
    useState<BottomBarState>(bottomState);

  // bottom bar gesturs
  const tapGesture = Gesture.Tap().onEnd(() => {
    if (bottomState == "minimizedState") {
      runOnJS(setBottomState)("normalState");
      runOnJS(setShowTabs)(true);
    }
  });
  const swipeGesture = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -200) {
      // Swipe up
      if (bottomState == "minimizedState") {
        runOnJS(setShowTabs)(true);
        runOnJS(setBottomState)("normalState");
      } else if (bottomState == "normalState") {
        runOnJS(setShowTabs)(false);
        runOnJS(setBottomState)("openMenu");
      }
    } else if (e.velocityY > 200) {
      // Swipe down
      if (bottomState == "openMenu") {
        runOnJS(setShowTabs)(true);
        runOnJS(setBottomState)("normalState");
      } else {
        runOnJS(setShowTabs)(false);
        runOnJS(setBottomState)("minimizedState");
      }
    }
  });

  // text input gestures
  const inputTap = Gesture.Tap().onEnd(() => {
    // console.log("Text Input Tapped");
  });
  const inputSwipe = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -200) {
      // Swipe up
      if (bottomState == "normalState") {
        setBottomState("openMenu");
        searchBoxRef.current?.blur();
        runOnJS(setShowTabs)(false);
      } else if (bottomState == "minimizedState") {
        setBottomState("normalState");
        runOnJS(setShowTabs)(true);
      }
      // console.log("Swiped Up on Text Input");
    } else if (e.velocityY > 200) {
      // Swipe down
      if (bottomState === "openMenu") {
        setBottomState("normalState");
        searchBoxRef.current?.blur();
        runOnJS(setShowTabs)(true);
      } else if (bottomState === "normalState") {
        setBottomState("minimizedState");
        searchBoxRef.current?.blur();
        runOnJS(setShowTabs)(false);
      }
    }
  });

  const gestureCompose = Gesture.Race(tapGesture, swipeGesture);
  const textBoxCompose = Gesture.Race(inputTap, inputSwipe);

  useEffect(() => {
    setShowTabs(currentUrl !== "" ? false : true);
  }, [currentUrl, bottomState]);

  // detect keyboard visibility
  useEffect(() => {
    const handleKeyboardHide = () => {
      if (bottomState === "openMenu") {
        // searchBoxRef.current?.blur();
      } else if (bottomState === "minimizedState") {
        setBottomState("normalState");
        setIsEditing(false);
        setShowTabs(true);
      } else if (
        bottomState === "searchState" &&
        previousState === "normalState"
      ) {
        setBottomState("normalState");
        setIsEditing(false);
        setShowTabs(true);
      } else if (bottomState === "searchState" && previousState === "tabView") {
        setBottomState("tabView");
        setIsEditing(false);
        setShowTabs(true);
      } else {
        setBottomState("minimizedState");
        setShowTabs(false);
      }

      searchBoxRef.current?.blur();
    };
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      // keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [bottomState]);

  return (
    <GestureDetector gesture={gestureCompose}>
      <MotiView
        from={animationConfig.begin}
        animate={animationConfig[bottomState]}
        style={{
          maxWidth: bottomState == "openMenu" ? "80%" : "75%",
        }}
        className={`absolute z-100 border w-full h-fit max-h-[25%] min-h-[7%] border-gray-500 bottom-20 ${bottomState == "openMenu" ? "rounded-[2rem]" : "rounded-full"} ${colorType !== 1 ? "bg-white/20" : "bg-gray-950/75"} `}
      >
        <View className="flex-row min-h-[7%] w-full gap-2 items-center justify-between p-2">
          {/* searchbox */}
          <GestureDetector gesture={textBoxCompose}>
            <TouchableOpacity
              className="flex-1 border border-gray-400 bg-white/20 rounded-full"
              onPress={() => {
                if (bottomState == "minimizedState") {
                  setBottomState("normalState");
                  setShowTabs(true);
                }
                if (bottomState == "normalState" || bottomState == "tabView") {
                  setIsEditing(true);
                  searchBoxRef.current?.focus();
                }
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                className={`${isEditing ? "flex" : "hidden"}`}
              >
                <TextInput
                  ref={searchBoxRef}
                  editable={bottomState == "minimizedState" ? false : true}
                  disableFullscreenUI={true}
                  placeholder="Search or enter URL"
                  placeholderTextColor="#fff"
                  className="h-12"
                  style={{
                    paddingHorizontal: 10,
                    color: "#fff",
                    textAlign: "center",
                    flex: 1,
                  }}
                  onFocus={() => {
                    if (
                      bottomState == "normalState" ||
                      bottomState == "tabView"
                    ) {
                      setPreviousState(bottomState);
                      setBottomState("searchState");
                      setShowTabs(false);
                    }
                  }}
                  value={inputValue}
                  onChangeText={setInputValue}
                  returnKeyType="search"
                  returnKeyLabel="Search"
                  keyboardType="web-search"
                  onSubmitEditing={handleNavigate}
                />
                {/* Clear button, only visible when editing and input is not empty */}
                {inputValue.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setInputValue("")}
                    style={{ paddingHorizontal: 8 }}
                  >
                    <HugeiconsIcon
                      icon={CancelCircleIcon}
                      size={24}
                      color="#fff"
                      strokeWidth={1.5}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{ display: isEditing ? "none" : "flex" }}
                className="h-full w-full min-h-12 items-center justify-center"
              >
                <Text className="text-center text-white">
                  {pageTitle
                    ? `${pageTitle.slice(0, 30)}`
                    : "Search or enter URL"}
                </Text>
              </View>
            </TouchableOpacity>
          </GestureDetector>
          {/* tab view button */}
          <TouchableOpacity
            style={{
              display: showTabs ? "flex" : "none",
            }}
            className="bg-white/20 border border-gray-400 rounded-full p-2"
            onPress={() => {
              if (bottomState == "tabView") {
                setPreviousState(bottomState);
                setBottomState("normalState");
              } else {
                setPreviousState(bottomState);
                setBottomState("tabView");
              }
            }}
          >
            {/* HugeiconsIcon */}
            <HugeiconsIcon
              icon={CreditCardIcon}
              strokeWidth={2}
              color={"#ddd"}
            />
          </TouchableOpacity>
        </View>
        {bottomState === "openMenu" && <MenuBar />}
      </MotiView>
    </GestureDetector>
  );
}
