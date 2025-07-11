import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { Dimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const dimension = {
  width: Dimensions.get("window").width * 0.65,
  height: Dimensions.get("window").height * 0.65,
  windowWidth: Dimensions.get("window").width,
};

type TabItemsProps = {
  imageSource: ImageSourcePropType;
  index: number;
  scrollOffset: SharedValue<number>;
};

export const TabItems: React.FC<TabItemsProps> = ({
  imageSource,
  index,
  scrollOffset,
}) => {
  const paddingLeft = (dimension.windowWidth - dimension.width) / 2;

  const rStyle = useAnimatedStyle(() => {
    const activeItem = scrollOffset.value / dimension.width;

    const translateX = interpolate(
      activeItem,
      [index - 2, index - 1, index, index + 1],
      [80, 40, 0, -dimension.width - paddingLeft],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      activeItem,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        // translateX: index * 20 - scrollOffset.value,
        { translateX: scrollOffset.value + translateX },
        // {
        //   scale: 1 - index * 0.01, // Scale down each subsequent image
        // },
        { scale },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          // width: dimension.width,
          // height: dimension.height,
          position: "absolute",
          left: paddingLeft,
          zIndex: -index,
          transform: [
            //   {
            //     // translateX: index * dimension.width,
            //     translateX: index * 20,
            //   },
            // {
            //   scale: 1 - index * 0.01, // Scale down each subsequent image
            // },
          ],
        },
        rStyle,
      ]}
    >
      <Image
        source={imageSource}
        className="rounded-3xl"
        style={{
          height: dimension.height,
          width: dimension.width,
        }}
      />
    </Animated.View>
  );
};

// style={{
//         position: "absolute",
//         zIndex: index,
//         transform: [
//           {
//             translateX: index * -dimension.width + dimension.width * 1.25,
//           },
//           {
//             scaleX: -1, // Flip the image horizontally
//           },
//         ],
//       }}
