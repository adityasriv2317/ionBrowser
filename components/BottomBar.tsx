import { MotiView } from "moti";
import { TouchableOpacity, TextInput, Keyboard } from "react-native";
import { useRef, useState, useEffect, useContext } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CreditCardIcon } from "@hugeicons/core-free-icons";
import { animationConfig, BottomBarState } from "@/constants/bottomBar";

import { BrowserContext } from "@/contexts/BrowserContext";

export default function BottomBar() {
  // url
  const { inputValue, setInputValue, setCurrentUrl } =
    useContext(BrowserContext);

  const handleNavigate = () => {
    let url = inputValue.trim();
    if (!/^https?:\/\//i.test(url) && !url.includes(".")) {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    setCurrentUrl(url);
  };

  // color type constant
  const [colorType, setColorType] = useState(1); // 1 for light, 0 for dark

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
        setShowTabs(false);
      } else if (bottomState == "minimizedState") {
        setBottomState("normalState");
        setShowTabs(true);
      }
      // console.log("Swiped Up on Text Input");
    } else if (e.velocityY > 200) {
      // Swipe down
      if (bottomState === "openMenu") {
        setBottomState("normalState");
        searchBoxRef.current?.blur();
        setShowTabs(true);
      } else if (bottomState === "normalState") {
        setBottomState("minimizedState");
        searchBoxRef.current?.blur();
        setShowTabs(false);
      }
    }
  });

  const gestureCompose = Gesture.Race(tapGesture, swipeGesture);
  const textBoxCompose = Gesture.Race(inputTap, inputSwipe);

  // detect keyboard visibility
  useEffect(() => {
    const handleKeyboardHide = () => {
      if (bottomState === "openMenu") {
        // searchBoxRef.current?.blur();
      } else if (bottomState === "minimizedState") {
        setBottomState("normalState");
        setShowTabs(true);
      } else if (
        bottomState === "searchState" &&
        previousState === "normalState"
      ) {
        setBottomState("normalState");
        setShowTabs(true);
      } else if (bottomState === "searchState" && previousState === "tabView") {
        setBottomState("tabView");
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
        className={`flex-row absolute z-100 border border-gray-500 bottom-20 max-h-[7%] rounded-full gap-2 items-center justify-between p-2 ${colorType !== 1 ? "bg-white/20" : "bg-gray-950/75"} `}
      >
        {/* searchbox */}
        <GestureDetector gesture={textBoxCompose}>
          <TouchableOpacity
            className="flex-1 border border-gray-400 bg-white/20 rounded-full"
            onPress={() => {
              if (bottomState == "minimizedState") {
                setBottomState("normalState");
                setShowTabs(true);
              }
            }}
          >
            <TextInput
              ref={searchBoxRef}
              editable={bottomState == "minimizedState" ? false : true}
              disableFullscreenUI={true}
              placeholder="Search or enter URL"
              placeholderTextColor="#fff"
              className="text-black h-12"
              style={{
                paddingHorizontal: 10,
                color: "#fff",
                textAlign: "center",
              }}
              onFocus={() => {
                if (bottomState == "normalState" || bottomState == "tabView") {
                  setPreviousState(bottomState);
                  setBottomState("searchState");
                  setShowTabs(false);
                }
              }}
              onBlur={() => {
                // console.log("Text Input Blurred");
              }}
              value={inputValue}
              onChangeText={setInputValue}
              returnKeyType="search"
              returnKeyLabel="Search"
              keyboardType="web-search"
              onSubmitEditing={handleNavigate}
            />
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
          <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} color={"#ddd"} />
        </TouchableOpacity>
      </MotiView>
    </GestureDetector>
  );
}
