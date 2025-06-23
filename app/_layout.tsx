import { Stack } from "expo-router";

import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </GestureHandlerRootView>
  );
}
