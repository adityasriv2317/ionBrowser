import { MotiView, View } from "moti";
import { TouchableOpacity, TextInput, Keyboard, Text } from "react-native";
import { useRef, useState, useEffect, useContext, use } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  CreditCardIcon,
  CancelCircleIcon,
  Delete03Icon,
  PlusSignIcon,
  IncognitoIcon,
  Archive01Icon,
  Archive02Icon,
  Archive03Icon,
  SearchAreaIcon,
} from "@hugeicons/core-free-icons";
import { animationConfig, BottomBarState } from "@/constants/bottomBar";

import { BrowserContext } from "@/contexts/BrowserContext";
import MenuBar from "./MenuBar";

export default function BottomBar() {
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
    accentColor,
    setIsLoading,
  } = useContext(BrowserContext);

  const handleNavigate = () => {
    if (isLoading) {
      return;
    }

    let input = inputValue.trim();

    const isLikelySearch = !input.includes(".") && !input.startsWith("http");
    let url = "";

    if (isLikelySearch) {
      // Google search
      url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    } else {
      if (!/^https?:\/\//i.test(input)) {
        input = `https://${input}`;
      }

      try {
        const validUrl = new URL(input);
        url = validUrl.href;
      } catch (error) {
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
  useEffect(() => {
    setColorType(accentColor === "light-content" ? 1 : 0);
  }, [accentColor]);

  // bottomBar button states
  const [showTabs, setShowTabs] = useState(true);
  const searchBoxRef = useRef<TextInput>(null);
  // bottom bar animation states
  const [bottomState, setBottomState] = useState<BottomBarState>("normalState");
  const [previousState, setPreviousState] =
    useState<BottomBarState>(bottomState);

  const [showTabViewBar, setShowTabViewBar] = useState(false);
  const [tabViewBarVisible, setTabViewBarVisible] = useState(false);

  // Show/hide tab view bar with animation
  useEffect(() => {
    if (bottomState === "tabView") {
      setShowTabViewBar(true);
      setTabViewBarVisible(true);
    } else if (showTabViewBar) {
      setTabViewBarVisible(false);
    }
  }, [bottomState]);

  // bottom bar gesturs
  const tapGesture = Gesture.Tap().onEnd(() => {
    if (bottomState == "minimizedState") {
      runOnJS(setBottomState)("normalState");
      runOnJS(setShowTabs)(true);
    }
  });
  const swipeGesture = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -50) {
      // Swipe up
      if (bottomState == "minimizedState") {
        runOnJS(setShowTabs)(true);
        runOnJS(setBottomState)("normalState");
      } else if (bottomState == "normalState") {
        runOnJS(setShowTabs)(false);
        runOnJS(setBottomState)("openMenu");
      }
    } else if (e.velocityY > 50) {
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

  const textTouch = Gesture.Tap().onEnd(() => {
    if (bottomState == "minimizedState") {
      runOnJS(setIsEditing)(false);
      runOnJS(setBottomState)("normalState");
      runOnJS(setShowTabs)(true);
    } else if (bottomState == "normalState" || bottomState == "tabView") {
      runOnJS(setIsEditing)(true);
    }
  });
  const textSwipe = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -50) {
      // Swipe up
      if (bottomState == "minimizedState") {
        runOnJS(setShowTabs)(true);
        runOnJS(setBottomState)("normalState");
      } else if (bottomState == "normalState") {
        runOnJS(setShowTabs)(false);
        runOnJS(setBottomState)("openMenu");
      }
    } else if (e.velocityY > 50) {
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

  const gestureCompose = Gesture.Race(tapGesture, swipeGesture);
  const textBoxCompose = Gesture.Race(textTouch, textSwipe);

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
      } else if (
        bottomState === "searchState" &&
        previousState === "openMenu"
      ) {
        setIsEditing(false);
        setBottomState("openMenu");
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
    <View className="w-full h-full items-center">
      {/* actual bottom bar */}
      <GestureDetector gesture={gestureCompose}>
        <MotiView
          from={animationConfig.begin}
          animate={animationConfig[bottomState]}
          style={{
            maxWidth: bottomState == "openMenu" ? "80%" : "75%",
          }}
          className={`absolute border z-100 w-full h-fit max-h-[25%] min-h-[7%] bottom-20 ${bottomState == "openMenu" ? (colorType !== 1 ? "bg-black/70 rounded-[2rem] border-b-gray-600 border-r-gray-600 border-t-gray-400 border-l-gray-400" : "bg-black/70 rounded-[2rem] border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400") : "bg-transparent border-transparent rounded-full"} `}
        >
          <View
            style={{
              maxHeight: bottomState == "openMenu" ? "25%" : "100%",
            }}
            className="flex-row min-h-[7%] w-full gap-2 items-center justify-between p-2"
          >
            <TouchableOpacity
              className={`flex-1 border rounded-full ${colorType !== 1 ? "bg-black/70 border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400" : "bg-black/50 border-b-gray-600 border-r-gray-600 border-t-gray-400 border-l-gray-400"}`}
              onPress={() => {
                if (bottomState == "minimizedState") {
                  setBottomState("normalState");
                  setIsEditing(false);
                  setShowTabs(true);
                } else if (
                  bottomState == "normalState" ||
                  bottomState == "tabView"
                ) {
                  setIsEditing(true);
                  searchBoxRef.current?.focus();
                } else if (bottomState == "openMenu") {
                  setIsEditing(true);
                  searchBoxRef.current?.focus();
                  setPreviousState(bottomState);
                  setBottomState("searchState");
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
                className={`${isEditing ? "flex" : "hidden"}`}
              >
                <TextInput
                  ref={searchBoxRef}
                  disableFullscreenUI={true}
                  placeholder="Search or enter URL"
                  editable={bottomState == "minimizedState" ? false : true}
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
                      bottomState == "tabView" ||
                      bottomState == "searchState"
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
                  onSubmitEditing={() => {
                    if (
                      inputValue !== currentUrl &&
                      previousState == "openMenu"
                    ) {
                      setBottomState("normalState");
                      setShowTabs(true);
                    }
                    handleNavigate();
                  }}
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

              <GestureDetector gesture={textBoxCompose}>
                <View
                  style={{ display: isEditing ? "none" : "flex" }}
                  className="h-10 w-full min-h-12 items-center justify-center"
                >
                  <Text className="text-center text-white">
                    {pageTitle
                      ? `${pageTitle.slice(0, 30)}`
                      : "Search or enter URL"}
                  </Text>
                </View>
              </GestureDetector>
            </TouchableOpacity>
            {/* tab view button */}
            <TouchableOpacity
              style={{
                display: showTabs ? "flex" : "none",
              }}
              className={`border rounded-full p-2 ${colorType !== 1 ? "bg-black/70 border-b-gray-600 border-r-gray-600 border-t-gray-400 border-l-gray-400" : "bg-black/50 border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400"}`}
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

      {/* tab view options */}
      {showTabViewBar && (
        <MotiView
          from={{
            scale: 0.7,
            opacity: 0,
            translateY: 40,
          }}
          animate={{
            scale: tabViewBarVisible ? 1 : 0.7,
            opacity: tabViewBarVisible ? 1 : 0,
            translateY: tabViewBarVisible ? 0 : 40,
          }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 180,
            mass: 0.8,
          }}
          onDidAnimate={(key, finished) => {
            if (key === "opacity" && !tabViewBarVisible && finished === false) {
              setShowTabViewBar(false);
            }
          }}
          style={{
            zIndex: bottomState == "tabView" ? 10 : -1,
          }}
          className="absolute bottom-[6.5rem] w-full h-16 flex-row items-center justify-around"
        >
          <View className="flex-row items-center justify-around py-2 px-4 gap-3 rounded-full bg-black/50 border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400">
            {/* archive button */}
            <TouchableOpacity>
              <HugeiconsIcon
                icon={Archive03Icon}
                size={22}
                color="#fff"
                strokeWidth={1.5}
              />
            </TouchableOpacity>
            {/* search button */}
            <TouchableOpacity>
              <HugeiconsIcon
                icon={SearchAreaIcon}
                size={22}
                color="#fff"
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          </View>

          {/* close all */}
          <View className="rounded-full bg-black/50 border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400">
            <TouchableOpacity className="py-2 px-8 ">
              <HugeiconsIcon
                icon={Delete03Icon}
                size={22}
                color="#fff"
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          </View>

          {/* add new tab */}
          <View className="flex-row items-center justify-around py-2 px-4 gap-3 rounded-full bg-black/50 border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400">
            {/* new normal tab */}
            <TouchableOpacity>
              <HugeiconsIcon
                icon={PlusSignIcon}
                size={22}
                color="#fff"
                strokeWidth={1.5}
              />
            </TouchableOpacity>
            {/* new private tab */}
            <TouchableOpacity>
              <HugeiconsIcon
                icon={IncognitoIcon}
                size={22}
                color="#fff"
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          </View>
        </MotiView>
      )}
    </View>
  );
}
