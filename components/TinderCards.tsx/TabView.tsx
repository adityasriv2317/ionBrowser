import { View, Text } from "react-native";
import React, { FC, useCallback } from "react";
import { dimensions } from "@/constants/dimensions";
import { Tab } from "@/types/tabs";
import { ConstellationIcon } from "@hugeicons/core-free-icons";
import { SharedValue } from "react-native-reanimated";

interface TabViewProps {
  tab: Tab;
  index: number;
  totalTabs: number;
  panHandler: any;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  prevCardScale: SharedValue<number>;
}

const TabView: FC<TabViewProps> = ({
  tab,
  index,
  totalTabs,
  panHandler,
  translateX,
  translateY,
  prevCardScale,
}) => {
  return (
    <View
      className="items-center absolute overflow-hidden justify-center rounded-3xl"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: tab.color,
      }}
    >
      <Text className="text-white text-2xl">{tab.color}</Text>
    </View>
  );
};

export default TabView;
