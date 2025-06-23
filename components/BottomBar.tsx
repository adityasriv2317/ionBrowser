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

  // bottom bar animation states
  const [bottomState, setBottomState] = useState<
    "tap" | "swipeUp" | "swipeDown" | "init" | "null"
  >("null");

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(setBottomState)("tap");
  });
  const swipeGesture = Gesture.Pan().onEnd((e) => {
    if (e.velocityY < -200) {
      // Swipe up
      runOnJS(setBottomState)("swipeUp");
    } else if (e.velocityY > 200) {
      // Swipe down
      runOnJS(setBottomState)("swipeDown");
    }
  });

  const animationConfig = {
    tap: {
      scale: 1.1,
    },
    swipeUp: {
      translateY: -100,
      opacity: 0.5,
    },
    swipeDown: {
      translateY: 100,
      opacity: 0.5,
    },
    init: {
      opacity: 0,
      translateY: 60,
      scale: 0.8,
    },
    null: {
      opacity: 1,
      translateY: 0,
      scale: 1,
    },
  };

  const gestureCompose = Gesture.Race(tapGesture, swipeGesture);

  return (
    <GestureDetector gesture={gestureCompose}>
      <MotiView
        from={animationConfig.init}
        animate={animationConfig[bottomState]}
        className={`flex-row absolute z-100 border border-gray-500 bottom-16 max-w-[75%] max-h-[6%] rounded-full gap-2 items-center justify-between p-2 ${colorType == 1 ? "bg-gray-950/75" : "bg-white/20"} `}
      >
        {/* searchbox */}
        <TouchableOpacity
          className="flex-1 border border-gray-400 bg-white/20 rounded-full"
          onPress={() => console.log("Search Box Pressed")}
        >
          <TextInput
            placeholder="Search or enter URL"
            placeholderTextColor="#fff"
            className="text-black text-center"
            style={{ paddingHorizontal: 10 }}
          />
        </TouchableOpacity>
        {/* tab view button */}
        <TouchableOpacity
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
