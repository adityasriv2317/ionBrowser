import React, { useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { MotiText, MotiView } from "moti";
import Background from "@/components/SplashBackground";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowRight01Icon,
  Globe02Icon,
  SecurityCheckIcon,
  ZapFreeIcons,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { InternetIcon } from "@hugeicons/core-free-icons";

export default function Welcome() {
  const router = useRouter();

  const [next, setNext] = useState(0);

  return (
    <View className="flex-1 inset-0">
      <StatusBar barStyle="light-content" />

      {/* background */}
      <Background />

      <View className="flex-1 items-center justify-between pt-10 pb-0">
        <View className="flex-grow items-center justify-center">
          {/* icon and text */}
          <Image
            style={{ width: 200, height: 200 }}
            source={require("@/assets/images/icon.png")}
          />
          <MotiText
            from={{ opacity: 1, translateY: 0 }}
            animate={{
              opacity: next === 0 ? 1 : 0,
              translateY: next === 0 ? 0 : -20,
            }}
            transition={{ type: "spring", duration: 500 }}
            className="text-4xl font-bold text-white mt-4"
            pointerEvents={next === 0 ? "auto" : "none"}
          >
            Ion Browser
          </MotiText>
        </View>

        {/* features section */}
        <MotiView
          from={{ opacity: 0, translateY: 60, scale: 0.9, height: 50 }}
          animate={{
            opacity: next !== 0 ? 1 : 0,
            translateY: next !== 0 ? 0 : 60,
            scale: next !== 0 ? 1 : 0.9,
            height: next !== 0 ? 350 : 0,
          }}
          style={{
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            backgroundColor: "rgba(255,255,255,0.6)",
            borderRadius: 28,
            borderWidth: 0,
            marginBottom: 32,
            padding: 0,
          }}
          transition={{
            type: "spring",
            height: { type: "spring", duration: 2000, delay: 0 },
          }}
          className={`${
            next === 0 ? "hidden" : "flex"
          } mx-6 px-0 items-center justify-center`}
        >
          {next !== 0 && (
            <View className="w-full items-center px-8 py-10">
              <MotiView
                key={next}
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", delay: 100 }}
                className="mb-6"
              >
                {next === 1 && (
                  <HugeiconsIcon
                    icon={Globe02Icon}
                    size={52}
                    color="#1e293b"
                    strokeWidth={2}
                  />
                )}
                {next === 2 && (
                  <HugeiconsIcon
                    icon={ZapIcon}
                    size={52}
                    color="#224baa"
                    strokeWidth={2}
                  />
                )}
                {next === 3 && (
                  <HugeiconsIcon
                    icon={SecurityCheckIcon}
                    size={52}
                    color="#0c9c33"
                    strokeWidth={2}
                  />
                )}
              </MotiView>
              <MotiText
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -40 }}
                transition={{ type: "spring", duration: 1500 }}
                className="text-2xl font-bold text-slate-800 text-center mb-2"
                key={`title-${next}`}
              >
                {next == 1
                  ? "Welcome to Ion Browser!"
                  : next == 2
                    ? "Clean & Fast Interface"
                    : next == 3
                      ? "Enhanced Privacy Protection"
                      : ""}
              </MotiText>
              <MotiText
                from={{ opacity: 0, translateY: 40 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -40 }}
                transition={{ type: "spring", duration: 1800 }}
                className="text-lg leading-tight text-slate-600 text-center"
                key={`desc-${next}`}
              >
                {next == 1
                  ? "A fast, secure, and privacy-focused browser for your mobile device."
                  : next == 2
                    ? "Experience a clean and intuitive interface designed for speed and efficiency."
                    : next == 3
                      ? "Enjoy enhanced privacy features that keep your data safe and secure."
                      : ""}
              </MotiText>
            </View>
          )}
        </MotiView>

        {/* continue button */}
        <View className="w-full items-center justify-center">
          <TouchableOpacity
            className="bg-black/30 absolute z-50 bottom-16 flex flex-row items-center justify-around rounded-full mx-auto px-10 py-3 shadow-lg shadow-black/20"
            style={{
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
            onPress={() =>
              setNext((prev) => {
                if (prev < 3) {
                  return prev + 1;
                } else {
                  router.push("/");
                  return 0; // Prevents incrementing beyond 3
                }
              })
            }
          >
            <Text className="text-white text-xl">continue</Text>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={24}
              color="#ffffff"
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
