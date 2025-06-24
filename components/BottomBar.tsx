import { MotiView } from "moti";
import { TouchableOpacity, TextInput, Keyboard } from "react-native";
import { useRef, useState, useEffect } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { CreditCardIcon } from "@hugeicons/core-free-icons";
import { animationConfig, BottomBarState } from "@/constants/bottomBar";

export default function BottomBar({
  accentColor,
}: {
  accentColor: "light-content" | "dark-content" | "default";
}) {
  // color type constant
  const [colorType, setColorType] = useState(0);
  useEffect(() => {
    accentColor !== "light-content" ? setColorType(1) : setColorType(1);
  }, [accentColor]);

  // bottomBar button states
  const [showTabs, setShowTabs] = useState(true);
  const searchBoxRef = useRef<TextInput>(null);
  // bottom bar animation states
  const [bottomState, setBottomState] = useState<BottomBarState>("normalState");
  const [bottomStateStack, setBottomStateStack] = useState({
    current: "normalState",
    previous: "begin",
  });

  useEffect(() => {
    // Update the bottomStateStack whenever bottomState changes
    setBottomStateStack((prev) => ({
      current: bottomState,
      previous: prev.current,
    }));
  }, [bottomState]);

  // bottom bar gesturs
  const tapGesture = Gesture.Tap().onEnd(() => {
    if (bottomState == "minimizedState") {
      runOnJS(setBottomState)("normalState");
      // console.log("Search Box Pressed");
      runOnJS(setShowTabs)(true);
    } else if (bottomState == "normalState") {
      runOnJS(setBottomState)("searchState");
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
    console.log("Text Input Tapped");
  });
  const inputSwipe = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -200) {
      // Swipe up
      console.log("Swiped Up on Text Input");
    } else if (e.velocityY > 200) {
      // Swipe down
      console.log("Swiped Down on Text Input");
    }
  });

  const gestureCompose = Gesture.Race(tapGesture, swipeGesture);
  const textBoxCompose = Gesture.Race(inputTap, inputSwipe);

  // detect keyboard visibility
  useEffect(() => {
    const handleKeyboardHide = () => {
      if (bottomState === "openMenu") {
        // setBottomState("openMenu");
        // setShowTabs(true);
        searchBoxRef.current?.blur();
      } else if (bottomState === "minimizedState") {
        setBottomState("normalState");
        setShowTabs(true);
      } else if (
        bottomState === "searchState" &&
        bottomStateStack.previous === "normalState"
      ) {
        setBottomState("normalState");
        searchBoxRef.current?.blur();
        setShowTabs(true);
      } else if (
        bottomState === "searchState" &&
        bottomStateStack.previous === "tabView"
      ) {
        setBottomState("tabView");
        searchBoxRef.current?.blur();
        setShowTabs(true);
      }
    };
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    if (bottomState == "tabView") {
      searchBoxRef.current?.blur();
    }

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
        <TouchableOpacity
          className="flex-1 border border-gray-400 bg-white/20 rounded-full"
          onPress={() => {
            console.log("Search Box Pressed");
            if (bottomState == "minimizedState") {
              setBottomState("normalState");
              setShowTabs(true);
            } else if (bottomState == "normalState") {
              setBottomState("openMenu");
            }
          }}
        >
          <GestureDetector gesture={textBoxCompose}>
            <TextInput
              ref={searchBoxRef}
              editable={bottomState == "minimizedState" ? false : true}
              placeholder="Search or enter URL"
              placeholderTextColor="#fff"
              className="text-black text-center h-12"
              style={{ paddingHorizontal: 10 }}
              onFocus={() => {
                if (bottomState == "normalState" || bottomState == "tabView") {
                  setBottomState("searchState");
                  setShowTabs(false);
                }
              }}
              onBlur={() => {
                console.log("Text Input Blurred");
              }}
            />
          </GestureDetector>
        </TouchableOpacity>
        {/* tab view button */}
        <TouchableOpacity
          style={{
            display: showTabs ? "flex" : "none",
          }}
          className="bg-white/20 border border-gray-400 rounded-full p-2"
          onPress={() =>
            bottomState == "tabView"
              ? setBottomState("normalState")
              : setBottomState("tabView")
          }
        >
          {/* HugeiconsIcon */}
          <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} color={"#ddd"} />
        </TouchableOpacity>
      </MotiView>
    </GestureDetector>
  );
}
