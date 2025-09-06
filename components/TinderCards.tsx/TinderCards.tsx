// import { images } from "@/constants/imgs";
import React, { useCallback, useRef, useState } from "react";
import { View, Text, PanResponder } from "react-native";
import { dimensions, swipeMotion } from "@/constants/dimensions";
import { Tab } from "@/types/tabs";
import TabView from "./TabView";
import { useSharedValue, withTiming } from "react-native-reanimated";

const images = [
  {
    id: "1",
    image: require("@/assets/util/a.jpg"),
    color: "#000000",
  },
  {
    id: "2",
    image: require("@/assets/util/b.jpg"),
    color: "#F5FF33",
  },
  {
    id: "3",
    image: require("@/assets/util/c.jpg"),
    color: "#003333",
  },
  {
    id: "4",
    image: require("@/assets/util/d.jpg"),
    color: "#330000",
  },
];

const renderTab = (img: any, i: number) => {
  return (
    <View
      key={i}
      className="w-full h-full absolute items-center justify-center"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: img.color,
        // transform: [
        //   { translateX: -i * 50 },
        //   { scale: 0.9 },
        //   { rotateY: `${Math.PI / 2.5}rad` },
        // ],
      }}
    >
      <Text className="text-white">{img.color}</Text>
    </View>
  );
};

const TinderCards = () => {
  const [tabs, setTabs] = useState<Tab[]>(images);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const prevCardScale = useSharedValue(0.9);
  const falseMove = useSharedValue(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
    })
  ).current;

  const resetPosition = useCallback(() => {
    translateX.value = withTiming(0, { duration: swipeMotion.reset });
    translateY.value = withTiming(0, { duration: swipeMotion.reset });
    prevCardScale.value = withTiming(0.9, { duration: swipeMotion.reset });
  }, [translateX, translateY, prevCardScale]);

  const renderTabs = useCallback(
    (tab: Tab, index: number) => {
      return (
        <TabView
          key={tab.id}
          index={index}
          totalTabs={images.length}
          tab={tab}
          panHandler={index === 0 ? panResponder.panHandler : {}}
          translateX={index === 0 ? translateX : falseMove}
          translateY={index === 0 ? translateY : falseMove}
          prevCardScale={index === 0 ? prevCardScale : falseMove}
        />
      );
    },
    [
      images.length,
      translateX,
      panResponder.panHandler,
      translateY,
      prevCardScale,
      falseMove,
    ]
  );

  return (
    <View className="w-full h-full absolute items-center">
      <View
        style={{
          marginTop: dimensions.windowHeight * 0.15,
          height: dimensions.height,
          width: "100%",
        }}
      >
        {tabs.length === 0 ? (
          <View>
            <Text>No Tabs to display</Text>
          </View>
        ) : (
          tabs.map(renderTabs).reverse()
        )}
      </View>
    </View>
  );
};

export default TinderCards;
