import React, { createContext, useState, useRef } from "react";
export const BrowserContext = createContext();

const BrowserProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accentColor, setAccent] = useState("default"); // Default accent color

  const [showTabs, setShowTabs] = useState(false);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webRef = useRef(null);

  // Only update currentUrl and inputValue if url is different and not empty
  const updateHistory = (url, title) => {
    if (url && url !== currentUrl) {
      setCurrentUrl(url);
      setInputValue(url); // Sync input with new URL
    }
    if (title) {
      setPageTitle(title); // Update page title if available
    }
  };

  return (
    <BrowserContext.Provider
      value={{
        currentUrl,
        setCurrentUrl,
        inputValue,
        setInputValue,
        updateHistory,
        pageTitle,
        setPageTitle,
        accentColor,
        setAccent,
        isEditing,
        setIsEditing,
        isLoading,
        setIsLoading,
        canGoBack,
        setCanGoBack,
        canGoForward,
        setCanGoForward,
        webRef,
        showTabs,
        setShowTabs,
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};

export default BrowserProvider;
