import { View, Text, Pressable, Switch, ScrollView } from "react-native";
import { useState } from "react";
import { MotiView, AnimatePresence } from "moti";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Sun01Icon,
  Moon01Icon,
  Delete02Icon,
  InformationCircleIcon,
  ArrowLeftIcon,
  Home01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [clearHistory, setClearHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600 }}
        className="px-6 pt-12 pb-4"
      >
        <View className="flex-row items-center mb-8">
          <Pressable
            className="p-2 rounded-full bg-neutral-800 mr-3"
            onPress={() => router.back()}
          >
            <HugeiconsIcon icon={ArrowLeftIcon} size={24} color="#fff" />
          </Pressable>
          <HugeiconsIcon icon={Settings02Icon} size={28} color="#fff" />
          <Text className="text-2xl font-bold text-white ml-2">Settings</Text>
        </View>

        {/* Theme Switch */}
        <MotiView
          from={{ opacity: 0, translateX: -30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 100, type: "timing" }}
          className="flex-row items-center justify-between bg-neutral-800 rounded-2xl px-5 py-4 mb-4"
        >
          <View className="flex-row items-center">
            {darkMode ? (
              <HugeiconsIcon
                icon={Moon01Icon}
                size={22}
                color="#facc15"
                className="mr-2"
              />
            ) : (
              <HugeiconsIcon
                icon={Sun01Icon}
                size={22}
                color="#fbbf24"
                className="mr-2"
              />
            )}
            <Text className="text-lg text-white">Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#facc15" : "#fbbf24"}
            trackColor={{ false: "#888", true: "#222" }}
          />
        </MotiView>

        {/* Clear History */}
        <MotiView
          from={{ opacity: 0, translateX: 30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 200, type: "timing" }}
          className="flex-row items-center justify-between bg-neutral-800 rounded-2xl px-5 py-4 mb-4"
        >
          <View className="flex-row items-center">
            <HugeiconsIcon
              icon={Delete02Icon}
              size={22}
              color="#f87171"
              className="mr-2"
            />
            <Text className="text-lg text-white">Clear History</Text>
          </View>
          <Pressable
            className="px-3 py-1 rounded-full bg-red-600"
            android_ripple={{ color: "#fff2" }}
            onPress={() => setClearHistory(true)}
          >
            <Text className="text-white font-semibold">Clear</Text>
          </Pressable>
        </MotiView>

        {/* About Section */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, type: "timing" }}
          className="bg-neutral-800 rounded-2xl px-5 py-4 mb-4"
        >
          <Pressable
            className="flex-row items-center"
            onPress={() => setShowAbout((v) => !v)}
          >
            <HugeiconsIcon
              icon={InformationCircleIcon}
              size={22}
              color="#38bdf8"
              className="mr-2"
            />
            <Text className="text-lg text-white">About</Text>
          </Pressable>
          <AnimatePresence>
            {showAbout && (
              <MotiView
                from={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 70 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "timing", duration: 350 }}
                className="overflow-hidden"
              >
                <Text className="text-neutral-300 mt-2">
                  Ion Browser v1.0.0{"\n"}A fast, minimal, and animated browser
                  built with React Native, NativeWind, Hugeicons, and Moti.
                </Text>
              </MotiView>
            )}
          </AnimatePresence>
        </MotiView>

        {/* Home Button */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 400, type: "timing" }}
          className="items-center mt-8"
        >
          <Pressable
            className="flex-row items-center px-6 py-3 bg-blue-600 rounded-full"
            android_ripple={{ color: "#fff2" }}
            onPress={() => router.replace("/")}
          >
            <HugeiconsIcon
              icon={Home01Icon}
              size={22}
              color="#fff"
              className="mr-2"
            />
            <Text className="text-white text-lg font-semibold">Go Home</Text>
          </Pressable>
        </MotiView>
      </MotiView>
    </ScrollView>
  );
}
