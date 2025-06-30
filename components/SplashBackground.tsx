import { View, Image } from "react-native";

const Background = () => {
  return (
    <View className="absolute inset-0">
      <Image
        className="w-full h-full"
        source={require("@/assets/images/splash.jpg")}
        blurRadius={40}
      />

      <View className="absolute inset-0 bg-black/20" />
    </View>
  );
};

export default Background;
