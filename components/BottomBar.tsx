import { MotiView } from "moti";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HugeiconsIcon } from "@hugeicons/react-native";
import { CreditCardIcon } from "@hugeicons/core-free-icons";

export default function BottomBar() {
  return (
    <View className="flex-row absolute z-100 bottom-16 max-w-[75%] max-h-[6%] rounded-full gap-2 items-center justify-between p-2 bg-gray-800/50">
      {/* searchbox */}
      <TouchableOpacity
        className="flex-1 bg-white/50 rounded-full"
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
        className="bg-white/50 rounded-full p-2"
        onPress={() => console.log("Tab View Pressed")}
      >
        {/* HugeiconsIcon */}
        <HugeiconsIcon
          icon={CreditCardIcon}
          strokeWidth={2}
          color={"#888888"}
        />
      </TouchableOpacity>
    </View>
  );
}