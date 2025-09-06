import React from "react";
import { Dimensions, ImageSourcePropType, Image, View } from "react-native";
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
  color?: string;
};

const TabItem: React.FC<TabItemsProps> = ({
  imageSource,
  index,
  scrollOffset,
  color,
}) => {
  const rStyle = useAnimatedStyle(() => {
    //  339.42857142857144 226.2857142857143 212.14285714285714 0 -39.08571428571429

    const current =
      Number(scrollOffset.value.toFixed(0)) /
      Number(dimensions.width.toFixed(0));

    const translateX = interpolate(
      current,
      // [index - 3, index - 2, index - 1, index, index + 1],
      // [339, 226, 212, 0, -50],
      [index - 1, index, index + 1],
      [dimensions.width+10, 0, -50],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      current,
      [index - 2, index - 1, index, index + 1],
      [0.9, 0.9, 1, 0.9],
      Extrapolation.CLAMP
    );

    const rotateY = interpolate(
      current,
      [index - 3, index - 2, index - 1, index, index + 1],
      [Math.PI / 2.2, Math.PI / 2.5, Math.PI / 3, 0, 0],
      Extrapolation.CLAMP
    );

    index == 0 && console.log(translateX, translateX + scrollOffset.value);

    return {
      transform: [
        { translateX: scrollOffset.value + translateX },
        // { translateX: scrollOffset.value },
        // { scale },
        // { rotateY: `${rotateY}rad` },
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
