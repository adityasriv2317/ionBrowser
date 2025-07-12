import { ScrollView, View, Image, Dimensions } from "react-native";
import {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { images } from "@/constants/imgs";
import { dimension, TabItems } from "./TabItems";
import Animated from "react-native-reanimated";

export default function TabsList() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View className="flex-1 absolute inset-0 items-center">
      <View
        style={{
          marginTop: Dimensions.get("window").height * 0.15,
          height: dimension.height,
          width: "100%",
        }}
      >
        <Animated.ScrollView
          ref={scrollRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width:
              dimension.width * images.length +
              dimension.windowWidth -
              dimension.width,
          }}
          snapToInterval={dimension.width}
        >
          {images.map((img, i) => (
            <TabItems
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
