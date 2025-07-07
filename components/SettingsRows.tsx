import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";

export const SectionDivider = ({ delay = 0 }: { delay?: number }) => (
  <MotiView
    from={{ opacity: 0, scaleX: 0.7 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ delay, type: "timing", duration: 400 }}
    className="h-0.5 bg-neutral-700 my-3 rounded-full"
  />
);

export type OptionRowProps = {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  delay?: number;
};
export const OptionRow = React.memo(function OptionRow({ icon, label, children, delay = 0 }: OptionRowProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateX: -30 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay, type: "timing" }}
      className="flex-row items-center justify-between bg-neutral-800 rounded-2xl px-5 py-4 mb-2"
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="text-lg text-white ml-2">{label}</Text>
      </View>
      {children}
    </MotiView>
  );
});

export type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
};
export const InfoRow = React.memo(function InfoRow({ icon, label, value, delay = 0 }: InfoRowProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateX: 30 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay, type: "timing" }}
      className="flex-row items-center justify-between bg-neutral-800 rounded-2xl px-5 py-4 mb-2"
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="text-lg text-white ml-2">{label}</Text>
      </View>
      <Text className="text-neutral-300 text-base">{value}</Text>
    </MotiView>
  );
});
