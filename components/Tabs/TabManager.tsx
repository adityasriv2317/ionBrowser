import { View } from "moti";
import TabItem, { dimensions } from "./TabItem";
import { images } from "@/constants/imgs";
import { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";
import Animated from "react-native-reanimated";

export default function TabManager() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className="flex-1 absolute inset-0 items-center">
      <View
        style={{
          marginTop: dimensions.windowHeight * 0.15,
          height: dimensions.height,
          width: "100%",
        }}
      >
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={6}
          bounces={false}
          contentContainerStyle={{
            width:
              dimensions.width * images.length +
              dimensions.windowWidth -
              dimensions.width,
          }}
          snapToInterval={dimensions.width}
          style={{
            transform: [{ scaleX: -1 }],
            overflow: "visible",
          }}
        >
          {images.map((img, i) => (
            <TabItem
              key={i}
              imageSource={img.image}
              index={i}
              scrollOffset={scrollOffset}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}
