import { MotiView, useAnimationState } from "moti";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";

import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { CreditCardIcon } from "@hugeicons/core-free-icons";

export default function BottomBar({
  accentColor,
}: {
  accentColor: "light-content" | "dark-content" | "default";
}) {
  // color type constant
  const [colorType, setColorType] = useState(0);
  useEffect(() => {
    accentColor !== "light-content" ? setColorType(1) : setColorType(0);
  }, [accentColor]);

  // bottomBar button states
  const [showTabs, setShowTabs] = useState(true);

  // bottom bar animation states
  const [bottomState, setBottomState] = useState<
    "tap" | "swipeUp" | "swipeDown" | "null" | "openMenu" | "begin"
  >("null");

  // bottom bar gesturs
  const tapGesture = Gesture.Tap().onEnd(() => {
    if (bottomState == "swipeDown" || bottomState == "tap") {
      runOnJS(setBottomState)("null");
      runOnJS(setShowTabs)(true);
    } else if (bottomState == "null") {
      runOnJS(setBottomState)("tap");
    }
  });
  const swipeGesture = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -200) {
      // Swipe up
      if (bottomState == "swipeDown") {
        runOnJS(setShowTabs)(true);
        runOnJS(setBottomState)("swipeUp");
      } else {
        runOnJS(setShowTabs)(false);
        runOnJS(setBottomState)("openMenu");
      }
    } else if (e.velocityY > 200) {
      // Swipe down
      if (bottomState == "openMenu") {
        runOnJS(setShowTabs)(true);
        runOnJS(setBottomState)("null");
      } else {
        runOnJS(setShowTabs)(false);
        runOnJS(setBottomState)("swipeDown");
      }
    }
  });
  const animationConfig = {
    tap: {
      scale: 1.1,
    },
    swipeUp: {
      translateY: 0,
      opacity: 1,
    },
    swipeDown: {
      translateY: 50,
      scale: 0.7,
      opacity: 0.8,
    },
    openMenu: {
      translateY: -350,
      opacity: 1,
      scale: 1.2,
    },
    begin: {
      translateY: 40,
      opacity: 0.5,
      scale: 0.8,
    },
    null: {
      opacity: 1,
      translateY: 0,
      scale: 1,
    },
  };

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

  return (
    <GestureDetector gesture={gestureCompose}>
      <MotiView
        from={animationConfig.begin}
        animate={animationConfig[bottomState]}
        style={{
          maxWidth: bottomState == "openMenu" ? "80%" : "75%",
        }}
        className={`flex-row absolute z-100 border border-gray-500 bottom-20 max-h-[6%] rounded-full gap-2 items-center justify-between p-2 ${colorType == 1 ? "bg-gray-950/75" : "bg-white/20"} `}
      >
        {/* searchbox */}
        <TouchableOpacity
          className="flex-1 border border-gray-400 bg-white/20 rounded-full"
          onPress={() => {
            console.log("Search Box Pressed");
            if (bottomState == "swipeDown") {
              setBottomState("null");
              setShowTabs(true);
            } else if (bottomState == "null") {
              setBottomState("openMenu");
            }
          }}
        >
          <GestureDetector gesture={textBoxCompose}>
            <TextInput
              editable={bottomState == "swipeDown" ? false : true}
              placeholder="Search or enter URL"
              placeholderTextColor="#fff"
              className="text-black text-center h-12"
              style={{ paddingHorizontal: 10 }}
              onFocus={() => {
                setBottomState("openMenu");
                setShowTabs(false);
              }}
              onBlur={() => {
                if (bottomState == "openMenu") {
                  setBottomState("null");
                }
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
          onPress={() => console.log("Tab View Pressed")}
        >
          {/* HugeiconsIcon */}
          <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} color={"#ddd"} />
        </TouchableOpacity>
      </MotiView>
    </GestureDetector>
  );
}
