import React, { useState } from "react";
import { View, Text, ScrollView, Switch, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  SearchAreaIcon,
  Shield01Icon,
  Delete01Icon,
  CookieIcon,
  Archive03Icon,
  IncognitoIcon,
  Download03Icon,
  Upload04Icon,
  Settings03Icon,
  QrCode01Icon,
  RepeatIcon,
  HelpCircleIcon,
  ArrowLeft02Icon,
  Queue01Icon,
} from "@hugeicons/core-free-icons";

export default function SettingsScreen() {
  const router = useRouter();
  const [blockPopups, setBlockPopups] = useState(true);
  const [blockTrackers, setBlockTrackers] = useState(true);
  const [askWhereToSave, setAskWhereToSave] = useState(true);
  const [hardwareAccel, setHardwareAccel] = useState(true);
  const [incognitoLock, setIncognitoLock] = useState(false);

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-white mb-2 px-4">
        {title}
      </Text>
      <View className="bg-black/50 rounded-2xl px-2 mx-2 rounded-b-xl border-b border-white/20">{children}</View>
    </View>
  );

  const SettingItem = ({
    icon,
    label,
    onPress,
    switchValue,
    onSwitchChange,
  }: {
    icon: any;
    label: string;
    onPress?: () => void;
    switchValue?: boolean;
    onSwitchChange?: (val: boolean) => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between px-4 py-4"
    >
      <View className="flex-row items-center gap-4">
        <HugeiconsIcon icon={icon} color="#fff" size={22} strokeWidth={1.5} />
        <Text className="text-white text-base">{label}</Text>
      </View>
      {onSwitchChange !== undefined ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#444", true: "#00BFFF" }}
          thumbColor="#fff"
        />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 18,
        paddingHorizontal: 18,
        backgroundColor: 'rgba(20,20,20,0.98)',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
        zIndex: 10,
      }}>
        <Pressable
          onPress={() => router.back()}
          style={{ padding: 8, borderRadius: 999, backgroundColor: '#23272B', marginRight: 10 }}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={22} color="#fff" />
        </Pressable>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 0.5 }}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingTop: 16 }}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
        >
          {/* General */}
          <Section title="General">
            <SettingItem
              icon={SearchAreaIcon}
              label="Search Engine"
              onPress={() => {}}
            />
            <SettingItem
              icon={Settings03Icon}
              label="Startup Option"
              onPress={() => {}}
            />
          </Section>

          {/* Privacy & Security */}
          <Section title="Privacy & Security">
            <SettingItem
              icon={Delete01Icon}
              label="Clear Data"
              onPress={() => {}}
            />
            <SettingItem
              icon={Shield01Icon}
              label="Block Popups"
              switchValue={blockPopups}
              onSwitchChange={setBlockPopups}
            />
            <SettingItem
              icon={Shield01Icon}
              label="Block Trackers"
              switchValue={blockTrackers}
              onSwitchChange={setBlockTrackers}
            />
            <SettingItem
              icon={CookieIcon}
              label="Cookie Preferences"
              onPress={() => {}}
            />
            <SettingItem
              icon={IncognitoIcon}
              label="Incognito Lock"
              switchValue={incognitoLock}
              onSwitchChange={setIncognitoLock}
            />
          </Section>

          {/* Tabs */}
          <Section title="Tabs">
            <SettingItem
              icon={Archive03Icon}
              label="Close Tabs After X Days"
              onPress={() => {}}
            />
            <SettingItem
              icon={Queue01Icon}
              label="Tab Groups"
              onPress={() => {}}
            />
          </Section>

          {/* Downloads */}
          <Section title="Downloads">
            <SettingItem
              icon={Download03Icon}
              label="Default Download Location"
              onPress={() => {}}
            />
            <SettingItem
              icon={Upload04Icon}
              label="Always Ask Where to Save Files"
              switchValue={askWhereToSave}
              onSwitchChange={setAskWhereToSave}
            />
          </Section>

          {/* Advanced */}
          <Section title="Advanced">
            <SettingItem
              icon={Settings03Icon}
              label="Hardware Acceleration"
              switchValue={hardwareAccel}
              onSwitchChange={setHardwareAccel}
            />
          </Section>

          {/* About */}
          <Section title="About">
            <SettingItem icon={QrCode01Icon} label="App Version: 1.0.0" />
            <SettingItem
              icon={RepeatIcon}
              label="Check for Updates"
              onPress={() => {}}
            />
            <SettingItem
              icon={HelpCircleIcon}
              label="Send Feedback"
              onPress={() => {}}
            />
          </Section>
        </MotiView>
      </ScrollView>
    </View>
  );
}
