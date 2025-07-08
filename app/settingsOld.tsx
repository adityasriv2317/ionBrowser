import React from "react";
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  Platform,
} from "react-native";
import { Modal, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { MotiView, AnimatePresence } from "moti";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { OptionRow, InfoRow } from "../components/SettingsRows";
import {
  Sun01Icon,
  Moon01Icon,
  Delete02Icon,
  InformationCircleIcon,
  ArrowLeftIcon,
  Home01Icon,
  Settings02Icon,
  Clock01Icon,
  Download01Icon,
  Folder01Icon,
  SearchAreaIcon,
  Shield01Icon,
  CookieIcon,
  Group01Icon,
  Timer01Icon,
  CpuIcon,
} from "@hugeicons/core-free-icons";
// Fallbacks for missing icons
const Update01Icon = InformationCircleIcon;
const Feedback01Icon = InformationCircleIcon;
const Lock03Icon = Clock01Icon;
const PopupIcon = InformationCircleIcon;
const FunctionCircleIcon = InformationCircleIcon;
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  // General
  const [darkMode, setDarkMode] = useState(true);
  const [searchEngine, setSearchEngine] = useState("Google");
  const [startupOption, setStartupOption] = useState("Home");
  const searchEngineOptions = [
    "Google",
    "DuckDuckGo",
    "Bing",
    "Yahoo",
    "Brave",
  ];
  const startupOptions = ["Home", "Last Session", "New Tab", "Custom Page"];

  // Modal state for dropdowns
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showStartupModal, setShowStartupModal] = useState(false);
  // Privacy
  const [blockPopups, setBlockPopups] = useState(true);
  const [blockTrackers, setBlockTrackers] = useState(true);
  const [cookiePrefs, setCookiePrefs] = useState("Allow All");
  const [incognitoLock, setIncognitoLock] = useState(false);
  // Tabs
  const [closeTabsAfter, setCloseTabsAfter] = useState("Never");
  const [tabGroups, setTabGroups] = useState(false);
  // Downloads
  const [downloadLocation, setDownloadLocation] =
    useState("/storage/downloads");
  const [alwaysAskSave, setAlwaysAskSave] = useState(false);
  const [hardwareAccel, setHardwareAccel] = useState(true);
  // App Info
  const [showAbout, setShowAbout] = useState(false);
  const [appVersion] = useState("1.0.0");

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      {/* Material You style header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: "#FFFFFFEE",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          paddingTop: 44,
          paddingBottom: 12,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center">
          <Pressable
            className="p-2 rounded-full bg-[#E3E6ED] mr-3"
            onPress={() => router.back()}
            android_ripple={{ color: "#B6C2E2" }}
          >
            <HugeiconsIcon icon={ArrowLeftIcon} size={24} color="#222" />
          </Pressable>
          <HugeiconsIcon icon={Settings02Icon} size={28} color="#222" />
          <Text
            className="text-2xl font-extrabold text-[#222] ml-2 tracking-tight"
            style={{
              fontFamily:
                Platform.OS === "android" ? "sans-serif-medium" : undefined,
            }}
          >
            Settings
          </Text>
        </View>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 90,
          paddingBottom: 32,
          paddingHorizontal: 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          className="gap-8"
        >
          {/* GENERAL */}
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 20,
              padding: 18,
              marginHorizontal: 12,
              marginBottom: 2,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}
          >
            <Text
              className="text-[#3B5CCC] font-extrabold text-lg mb-4 tracking-tight uppercase"
              style={{ letterSpacing: 1.2 }}
            >
              General
            </Text>
            <OptionRow
              icon={
                <HugeiconsIcon
                  icon={SearchAreaIcon}
                  size={22}
                  color="#3B5CCC"
                />
              }
              label="Search Engine"
              delay={100}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 16,
                  backgroundColor: "#23272B",
                  minWidth: 120,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
                onPress={() => setShowSearchModal(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  {searchEngine}
                </Text>
              </TouchableOpacity>
              <Modal
                visible={showSearchModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSearchModal(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#000A",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={1}
                  onPressOut={() => setShowSearchModal(false)}
                >
                  <View
                    style={{
                      backgroundColor: "#23272B",
                      borderRadius: 18,
                      padding: 16,
                      minWidth: 220,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      Select Search Engine
                    </Text>
                    {searchEngineOptions.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 8,
                          borderRadius: 10,
                          backgroundColor:
                            searchEngine === opt ? "#3B5CCC" : "transparent",
                          marginBottom: 4,
                        }}
                        onPress={() => {
                          setSearchEngine(opt);
                          setShowSearchModal(false);
                        }}
                      >
                        <Text
                          style={{
                            color: searchEngine === opt ? "#fff" : "#B6C2E2",
                            fontWeight: "600",
                            fontSize: 16,
                          }}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Home01Icon} size={22} color="#3B5CCC" />
              }
              label="Startup Option"
              delay={120}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 16,
                  backgroundColor: "#23272B",
                  minWidth: 120,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
                onPress={() => setShowStartupModal(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                >
                  {startupOption}
                </Text>
              </TouchableOpacity>
              <Modal
                visible={showStartupModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowStartupModal(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#000A",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={1}
                  onPressOut={() => setShowStartupModal(false)}
                >
                  <View
                    style={{
                      backgroundColor: "#23272B",
                      borderRadius: 18,
                      padding: 16,
                      minWidth: 220,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      Select Startup Option
                    </Text>
                    {startupOptions.map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 8,
                          borderRadius: 10,
                          backgroundColor:
                            startupOption === opt ? "#3B5CCC" : "transparent",
                          marginBottom: 4,
                        }}
                        onPress={() => {
                          setStartupOption(opt);
                          setShowStartupModal(false);
                        }}
                      >
                        <Text
                          style={{
                            color: startupOption === opt ? "#fff" : "#B6C2E2",
                            fontWeight: "600",
                            fontSize: 16,
                          }}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </OptionRow>
            <OptionRow
              icon={
                darkMode ? (
                  <HugeiconsIcon icon={Moon01Icon} size={22} color="#3B5CCC" />
                ) : (
                  <HugeiconsIcon icon={Sun01Icon} size={22} color="#3B5CCC" />
                )
              }
              label="Dark Mode"
              delay={140}
            >
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                thumbColor={darkMode ? "#3B5CCC" : "#B6C2E2"}
                trackColor={{ false: "#E3E6ED", true: "#D2E3FC" }}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
          </View>

          {/* PRIVACY */}
          <View
            className="bg-[#23272B] rounded-3xl shadow-lg px-6 py-6"
            style={{ elevation: 4 }}
          >
            <Text className="text-neutral-200 font-extrabold text-xl mb-4 tracking-tight">
              Privacy
            </Text>
            <OptionRow
              icon={
                <HugeiconsIcon icon={PopupIcon} size={24} color="#f87171" />
              }
              label="Block Popups"
              delay={200}
            >
              <Switch
                value={blockPopups}
                onValueChange={setBlockPopups}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Shield01Icon} size={24} color="#38bdf8" />
              }
              label="Block Trackers"
              delay={220}
            >
              <Switch
                value={blockTrackers}
                onValueChange={setBlockTrackers}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon icon={CookieIcon} size={24} color="#fbbf24" />
              }
              label="Cookie Preferences"
              delay={240}
            >
              <Pressable
                className="px-4 py-2 rounded-2xl bg-neutral-700"
                android_ripple={{ color: "#fff2" }}
                onPress={() => {}}
              >
                <Text className="text-white font-semibold text-base">
                  {cookiePrefs}
                </Text>
              </Pressable>
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Lock03Icon} size={24} color="#a78bfa" />
              }
              label="Incognito Lock"
              delay={260}
            >
              <Switch
                value={incognitoLock}
                onValueChange={setIncognitoLock}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
          </View>

          {/* TABS */}
          <View
            className="bg-[#23272B] rounded-3xl shadow-lg px-6 py-6"
            style={{ elevation: 4 }}
          >
            <Text className="text-neutral-200 font-extrabold text-xl mb-4 tracking-tight">
              Tabs
            </Text>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Timer01Icon} size={24} color="#fbbf24" />
              }
              label="Close Tabs After"
              delay={320}
            >
              <Pressable
                className="px-4 py-2 rounded-2xl bg-neutral-700"
                android_ripple={{ color: "#fff2" }}
                onPress={() => {}}
              >
                <Text className="text-white font-semibold text-base">
                  {closeTabsAfter}
                </Text>
              </Pressable>
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Group01Icon} size={24} color="#38bdf8" />
              }
              label="Tab Groups"
              delay={340}
            >
              <Switch
                value={tabGroups}
                onValueChange={setTabGroups}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
          </View>

          {/* DOWNLOADS */}
          <View
            className="bg-[#23272B] rounded-3xl shadow-lg px-6 py-6"
            style={{ elevation: 4 }}
          >
            <Text className="text-neutral-200 font-extrabold text-xl mb-4 tracking-tight">
              Downloads
            </Text>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Folder01Icon} size={24} color="#fbbf24" />
              }
              label="Default Download Location"
              delay={400}
            >
              <Pressable
                className="px-4 py-2 rounded-2xl bg-neutral-700"
                android_ripple={{ color: "#fff2" }}
                onPress={() => {}}
              >
                <Text
                  className="text-white font-semibold text-base"
                  numberOfLines={1}
                  style={{ maxWidth: 120 }}
                >
                  {downloadLocation}
                </Text>
              </Pressable>
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={24}
                  color="#38bdf8"
                />
              }
              label="Always Ask Where to Save Files"
              delay={420}
            >
              <Switch
                value={alwaysAskSave}
                onValueChange={setAlwaysAskSave}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
            <OptionRow
              icon={<HugeiconsIcon icon={CpuIcon} size={24} color="#a3e635" />}
              label="Hardware Acceleration"
              delay={440}
            >
              <Switch
                value={hardwareAccel}
                onValueChange={setHardwareAccel}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </OptionRow>
          </View>

          {/* APP INFO */}
          <View
            className="bg-[#23272B] rounded-3xl shadow-lg px-6 py-6"
            style={{ elevation: 4 }}
          >
            <Text className="text-neutral-200 font-extrabold text-xl mb-4 tracking-tight">
              App Info
            </Text>
            <InfoRow
              icon={
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  size={24}
                  color="#38bdf8"
                />
              }
              label="App Version"
              value={appVersion}
              delay={500}
            />
            <OptionRow
              icon={
                <HugeiconsIcon icon={Update01Icon} size={24} color="#fbbf24" />
              }
              label="Check for Updates"
              delay={520}
            >
              <Pressable
                className="px-4 py-2 rounded-2xl bg-blue-600"
                android_ripple={{ color: "#fff2" }}
                onPress={() => {}}
              >
                <Text className="text-white font-semibold text-base">
                  Check
                </Text>
              </Pressable>
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon
                  icon={Feedback01Icon}
                  size={24}
                  color="#38bdf8"
                />
              }
              label="Send Feedback"
              delay={540}
            >
              <Pressable
                className="px-4 py-2 rounded-2xl bg-neutral-700"
                android_ripple={{ color: "#fff2" }}
                onPress={() => {}}
              >
                <Text className="text-white font-semibold text-base">Send</Text>
              </Pressable>
            </OptionRow>
            <OptionRow
              icon={
                <HugeiconsIcon icon={Delete02Icon} size={24} color="#f87171" />
              }
              label="Clear Data"
              delay={560}
            >
              <Pressable
                className="px-4 py-2 rounded-2xl bg-red-600"
                android_ripple={{ color: "#fff2" }}
                onPress={() => {}}
              >
                <Text className="text-white font-semibold text-base">
                  Clear
                </Text>
              </Pressable>
            </OptionRow>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}
