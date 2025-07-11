import {
  Archive03Icon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  CookieIcon,
  Delete01Icon,
  Download03Icon,
  HelpCircleIcon,
  IncognitoIcon,
  QrCode01Icon,
  Queue01Icon,
  RepeatIcon,
  RoadLocation02Icon,
  SearchAreaIcon,
  Settings03Icon,
  Shield01Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const router = useRouter();
  const [blockPopups, setBlockPopups] = useState(true);
  const [blockTrackers, setBlockTrackers] = useState(true);
  const [askWhereToSave, setAskWhereToSave] = useState(true);
  const [hardwareAccel, setHardwareAccel] = useState(true);
  const [incognitoLock, setIncognitoLock] = useState(false);
  // Dropdown state
  const [searchEngine, setSearchEngine] = useState("Google");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const searchEngineOptions = [
    "Google",
    "DuckDuckGo",
    "Bing",
    "Yahoo",
    "Brave",
  ];
  const [startupOption, setStartupOption] = useState("Home");
  const [showStartupModal, setShowStartupModal] = useState(false);
  const startupOptions = ["Home", "Last Session", "New Tab", "Custom Page"];
  // For number input in 'Close Tabs After X Days'
  const [closeTabsDays, setCloseTabsDays] = useState("");
  // For tab group options dropdown
  const [tabGroupOption, setTabGroupOption] = useState("Group Tabs");
  const [showTabGroupOptions, setShowTabGroupOptions] = useState(false);
  // For cookie preferences options dropdown
  const [cookieOption, setCookieOption] = useState("Allow All Cookies");
  const [showCookieOptions, setShowCookieOptions] = useState(false);

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
      <View className="bg-black/50 rounded-2xl px-2 mx-2 rounded-b-xl border-b border-white/20">
        {children}
      </View>
    </View>
  );

  // SettingItem: no animation, just a row
  const SettingItem = ({
    icon,
    label,
    onPress,
    switchValue,
    onSwitchChange,
    children,
  }: {
    icon: any;
    label: string;
    onPress?: () => void;
    switchValue?: boolean;
    onSwitchChange?: (val: boolean) => void;
    children?: React.ReactNode;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress && !children}
      className="flex-row items-center justify-between px-4 py-4"
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View className="flex-row items-center gap-4">
        <HugeiconsIcon icon={icon} color="#fff" size={22} strokeWidth={1.5} />
        <Text className="text-white text-base">{label}</Text>
      </View>
      {children ? (
        children
      ) : onSwitchChange !== undefined ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#444", true: "#00BFFF" }}
          thumbColor="#fff"
        />
      ) : null}
    </TouchableOpacity>
  );

  // Reusable Dropdown component
  const Dropdown = ({
    label,
    value,
    options,
    onSelect,
    visible,
    setVisible,
    width = 220,
  }: {
    label: string;
    value: string;
    options: string[];
    onSelect: (val: string) => void;
    visible: boolean;
    setVisible: (v: boolean) => void;
    width?: number;
  }) => (
    <View style={{ position: "relative", minWidth: width }}>
      <TouchableOpacity
        style={{
          borderRadius: 18,
          backgroundColor: "#23272B",
          minWidth: width,
          maxWidth: width,
          width,
          paddingVertical: 10,
          paddingHorizontal: 18,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
        onPress={() => setVisible(!visible)}
        activeOpacity={0.7}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          {value || label}
        </Text>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={18}
          color="#B6C2E2"
          style={{ transform: [{ rotate: visible ? "90deg" : "270deg" }] }}
        />
      </TouchableOpacity>
      {visible && (
        <View
          style={{
            position: "absolute",
            top: 48,
            right: 0,
            minWidth: width,
            maxWidth: width,
            width,
            backgroundColor: "#23272f",
            borderRadius: 18,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 12,
            paddingVertical: 8,
            zIndex: 9999,
          }}
        >
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: value === opt ? "#2D3A4A" : "transparent",
              }}
              onPress={() => {
                onSelect(opt);
                setVisible(false);
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: value === opt ? "bold" : "600",
                }}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  // Consistent NumberInput component
  const NumberInput = ({
    value,
    onChange,
    placeholder = "",
    width = 48,
    ...props
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    width?: number;
    [key: string]: any;
  }) => (
    <TextInput
      style={{
        width,
        height: 32,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 16,
        marginRight: 8,
      }}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
      {...props}
    />
  );

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 54,
          paddingBottom: 18,
          paddingHorizontal: 18,
          backgroundColor: "rgba(20,20,20,0.98)",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: "#000",
          shadowOpacity: 0.18,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            padding: 8,
            borderRadius: 999,
            marginRight: 10,
          }}
          android_ripple={{ color: "#B6C2E230", borderless: true }}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={22} color="#fff" />
        </Pressable>
        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          Settings
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, paddingTop: 16 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
        >
          {/* General */}
          <Section title="General">
            <SettingItem icon={SearchAreaIcon} label="Search Engine">
              <Dropdown
                label="Select Search Engine"
                value={searchEngine}
                options={searchEngineOptions}
                onSelect={setSearchEngine}
                visible={showSearchModal}
                setVisible={setShowSearchModal}
                width={220}
              />
            </SettingItem>
            <SettingItem icon={Settings03Icon} label="Startup Option">
              <Dropdown
                label="Select Startup Option"
                value={startupOption}
                options={startupOptions}
                onSelect={setStartupOption}
                visible={showStartupModal}
                setVisible={setShowStartupModal}
                width={220}
              />
            </SettingItem>
          </Section>

          {/* Privacy & Security */}
          <Section title="Privacy & Security">
            <SettingItem
              icon={Shield01Icon}
              label="Block Popups"
              switchValue={blockPopups}
              onSwitchChange={setBlockPopups}
            />
            <SettingItem
              icon={RoadLocation02Icon}
              label="Block Trackers"
              switchValue={blockTrackers}
              onSwitchChange={setBlockTrackers}
            />
            <SettingItem
              icon={CookieIcon}
              label="Cookie Preferences"
              onPress={() => setShowCookieOptions((v) => !v)}
            >
              <Dropdown
                label="Options"
                value={cookieOption}
                options={[
                  "Allow All Cookies",
                  "Block Third-Party Cookies",
                  "Block All Cookies",
                ]}
                onSelect={setCookieOption}
                visible={showCookieOptions}
                setVisible={setShowCookieOptions}
                width={220}
              />
            </SettingItem>
            <SettingItem
              icon={IncognitoIcon}
              label="Incognito Lock"
              switchValue={incognitoLock}
              onSwitchChange={setIncognitoLock}
            />
            <SettingItem
              icon={Delete01Icon}
              label="Clear Data"
              onPress={() => {}}
            />
          </Section>

          {/* Tabs */}
          <Section title="Tabs">
            <SettingItem icon={Archive03Icon} label="Close Tabs After X Days">
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <NumberInput
                  value={closeTabsDays}
                  onChange={setCloseTabsDays}
                  placeholder="Days"
                  width={60}
                />
                <Text style={{ color: "#aaa", fontSize: 15 }}>days</Text>
              </View>
            </SettingItem>
            <SettingItem
              icon={Queue01Icon}
              label="Tab Groups"
              onPress={() => setShowTabGroupOptions((v) => !v)}
            >
              <Dropdown
                label="Options"
                value={tabGroupOption}
                options={[
                  "Group Tabs",
                  "Move to New Group",
                  "Rename Group",
                  "Delete Group",
                ]}
                onSelect={setTabGroupOption}
                visible={showTabGroupOptions}
                setVisible={setShowTabGroupOptions}
                width={220}
              />
            </SettingItem>
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
