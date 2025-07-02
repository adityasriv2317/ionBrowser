import React, { useState, useContext, createContext } from "react";
import { Tab } from "@/types/tabs";
import { v4 as uuidv4 } from "uuid";

type tabContextType = {
  tabs: Tab[]; // Array of tabs
  activeTabId: string; // ID of the currently active tab
  addTab: (url?: string) => void; // Function to add a new tab
  closeTab: (id: string) => void; // Function to close a tab by ID
  switchTab: (id: string) => void; // Function to switch to a tab by ID
  updateTab: (id: string, updates: Partial<Tab>) => void; // Function to update a tab's properties
};

const TabContext = createContext<tabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: uuidv4(),
      title: "New Tab",
      url: "",
      isActive: true,
      isPinned: false,
      isPrivate: false,
      isLoading: false,
      isSuspended: false,
      icon: "default-icon",
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);

  const addTab = (url: string = "") => {
    const newTab: Tab = {
      id: uuidv4(),
      title: "New Tab",
      url: url,
      isActive: false,
      isPinned: false,
      isPrivate: false,
      isLoading: false,
      isSuspended: false,
      icon: "default-icon",
    };
    setTabs((prev) =>
      prev.map((tab) => ({ ...tab, isActive: false })).concat(newTab)
    );
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    let newTabs = tabs.filter((tab) => tab.id !== id);
    if (id === activeTabId && newTabs.length > 0) {
      newTabs[0].isActive = true;
      setActiveTabId(newTabs[0].id);
    }
    setTabs(newTabs);
  };

  const switchTab = (id: string) => {
    setTabs((prev) =>
      prev.map((tabs) => ({
        ...tabs,
        isActive: tabs.id === id,
      }))
    );

    setActiveTabId(id);
  };

  const updateTab = (id: string, updates: Partial<Tab>) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, ...updates } : tab))
    );
  };

  return (
    <TabContext.Provider
      value={{ tabs, activeTabId, addTab, closeTab, switchTab, updateTab }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabManager = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabManager must be used within a TabProvider");
  }
  return context;
};
