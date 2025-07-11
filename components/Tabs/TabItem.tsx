import React from "react";
import { Dimensions, ImageSourcePropType, Image } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const dimensions = {
  width: Dimensions.get("window").width * 0.65,
  height: Dimensions.get("window").height * 0.65,
  windowWidth: Dimensions.get("window").width,
  windowHeight: Dimensions.get("window").height,
};

type TabItemsProps = {
  imageSource: ImageSourcePropType;
  index: number;
  scrollOffset: SharedValue<number>;
};

const TabItem: React.FC<TabItemsProps> = ({
  imageSource,
  index,
  scrollOffset,
}) => {
  const paddingRight = (dimensions.windowWidth - dimensions.width) / 2;

  const rStyle = useAnimatedStyle(() => {
    const current = scrollOffset.value / dimensions.width;

    const translateX = interpolate(
      current,
      [index - 3, index - 2, index - 1, index, index + 1],
      [
        dimensions.width + paddingRight,
        (dimensions.width + paddingRight) / 1.5,
        (dimensions.width + paddingRight) / 1.6,
        0,
        -(dimensions.width - paddingRight) / 5,
      ],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      current,
      [index - 2, index - 1, index, index + 1],
      [0.9, 0.9, 1, 0.8],
      Extrapolation.CLAMP
    );

    const rotateY = interpolate(
      current,
      [index - 3, index - 2, index - 1, index, index + 1],
      [Math.PI / 2.2, Math.PI / 2.5, Math.PI / 3, 0, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: scrollOffset.value + translateX },
        { scale },
        { rotateY: `${rotateY}rad` },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          zIndex: index,
          left: (dimensions.windowWidth - dimensions.width) / 2,
        },
        rStyle,
      ]}
    >
      <Image
        source={imageSource}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          transform: [{ scaleX: -1 }],
        }}
        className="rounded-3xl"
      />
    </Animated.View>
  );
};

export default TabItem;
