import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { LeftTriangleIcon, HomeIcon } from "@hugeicons/core-free-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function NotFound() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0f0f23", "#1a1a2e", "#16213e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1 items-center justify-center px-8">
        {/* Main Icon with animation */}
        <MotiView
          from={{ scale: 0, rotate: "0deg" }}
          animate={{ scale: 1, rotate: "360deg" }}
          transition={{
            type: "timing",
            duration: 1000,
            delay: 200,
          }}
          className="mb-8"
        >
          <View className="w-32 h-32 rounded-full bg-gray-800/50 border border-gray-600 items-center justify-center">
            <HugeiconsIcon
              icon={LeftTriangleIcon}
              size={64}
              color="#ef4444"
              strokeWidth={1.5}
            />
          </View>
        </MotiView>

        {/* 404 Text with slide animation */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            duration: 800,
            delay: 400,
          }}
          className="items-center mb-6"
        >
          <Text className="text-6xl font-bold text-white mb-2">404</Text>
          <Text className="text-xl text-gray-300 text-center mb-2">
            Page Not Found
          </Text>
          <Text className="text-sm text-gray-400 text-center leading-6">
            The page you're looking for doesn't exist or has been moved.
          </Text>
        </MotiView>

        {/* Navigation buttons with stagger animation */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "timing",
            duration: 600,
            delay: 800,
          }}
          className="w-full max-w-xs"
        >
          {/* Go Home Button */}
          <Pressable
            className="bg-blue-600 border border-blue-500 rounded-full mb-4 overflow-hidden"
            onPress={() => router.replace("/")}
            android_ripple={{ color: "#1d4ed8" }}
          >
            <View className="flex-row items-center justify-center px-8 py-4">
              <HugeiconsIcon
                icon={HomeIcon}
                size={20}
                color="#ffffff"
                strokeWidth={2}
              />
              <Text className="text-white font-semibold text-base ml-2">
                Go Home
              </Text>
            </View>
          </Pressable>

          {/* Go Back Button */}
          <Pressable
            className="border border-gray-600 bg-gray-800/50 rounded-full overflow-hidden"
            onPress={() => router.back()}
            android_ripple={{ color: "#374151" }}
          >
            <View className="flex-row items-center justify-center px-8 py-4">
              <Text className="text-gray-300 font-medium text-base">
                Go Back
              </Text>
            </View>
          </Pressable>
        </MotiView>

        {/* Bottom decoration */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            delay: 1000,
          }}
          className="absolute bottom-20"
        >
          <View className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </MotiView>
      </View>
    </LinearGradient>
  );
}
