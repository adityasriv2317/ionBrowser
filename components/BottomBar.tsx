import { MotiView, View } from "moti";
import { TouchableOpacity, TextInput, Keyboard, Text } from "react-native";
import { useRef, useState, useEffect, useContext, use } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CreditCardIcon, CancelCircleIcon } from "@hugeicons/core-free-icons";
import { animationConfig, BottomBarState } from "@/constants/bottomBar";
import { BlurView } from "expo-blur";

import { BrowserContext } from "@/contexts/BrowserContext";
import MenuBar from "./MenuBar";
import LGCard from "./LGCard";

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
    accentColor,
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
    <GestureDetector gesture={gestureCompose}>
      <MotiView
        from={animationConfig.begin}
        animate={animationConfig[bottomState]}
        style={{
          maxWidth: bottomState == "openMenu" ? "80%" : "75%",
        }}
        className={`absolute border z-100 w-full h-fit max-h-[25%] min-h-[7%] bottom-20 ${bottomState == "openMenu" ? (colorType !== 1 ? "bg-black/70 rounded-[2rem] border-b-gray-600 border-r-gray-600 border-t-gray-400 border-l-gray-400" : "bg-black/70 rounded-[2rem] border-t-gray-600 border-l-gray-600 border-b-gray-400 border-r-gray-400") : "bg-transparent border-transparent rounded-full"} `}
      >
        {/* <LGCard
          className={`${bottomState == "openMenu" ? "rounded-[2rem]" : "rounded-full"}`}
        > */}

        <View
          style={{
            maxHeight: bottomState == "openMenu" ? "25%" : "100%",
          }}
          className="flex-row min-h-[7%] w-full gap-2 items-center justify-between p-2"
        >
          {/* searchbox */}

          <TouchableOpacity
            // className="flex-1 border border-gray-400 bg-white/20 rounded-full"
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
            {/* <LGCard className="rounded-full h-full"> */}
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
                    // if url is changed, navigate
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
              {/* </BlurView> */}
            {/* </LGCard> */}
          </TouchableOpacity>
          {/* tab view button */}
          <TouchableOpacity
            style={{
              display: showTabs ? "flex" : "none",
            }}
            // className="bg-white/20 border border-gray-400 rounded-full p-2"
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
        {/* </LGCard> */}
      </MotiView>
    </GestureDetector>
  );
}
