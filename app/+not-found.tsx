import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function NotFound() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        404
      </Text>
      <Text className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Page Not Found
      </Text>
      <Pressable
        className="bg-blue-600 px-6 py-3 rounded-full"
        onPress={() => router.replace("/")}
      >
        <Text className="text-white font-semibold text-base">Go Home</Text>
      </Pressable>
    </View>
  );
}
