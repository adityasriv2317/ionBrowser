import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  p?: string;
  children: ReactNode;
  className?: string;
  style?: object;
  flex?: boolean;
};

export default function LGCard({
  children,
  p = "p-0",
  className = "",
  style = {},
  flex = false,
}: Props) {
  const containerClasses = [
    "relative font-semibold overflow-hidden shadow-lg",
    flex ? "flex-1" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View className={containerClasses} style={style}>
      {/* Glass effect background - using LinearGradient for glass-like appearance */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.15)",
          "rgba(255,255,255,0.05)",
          "rgba(255,255,255,0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />

      {/* Tint layer */}
      <View className="absolute inset-0 bg-black/10 rounded-2xl" />

      {/* Shine effect - using gradient to simulate inner glow */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.3)",
          "transparent",
          "rgba(255,255,255,0.2)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
        style={{
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
        }}
      />

      {/* Content layer */}
      <View className={`z-10 ${p}`}>{children}</View>
    </View>
  );
}
