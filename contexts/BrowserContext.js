import React, { createContext, useState } from "react";
export const BrowserContext = createContext();

const BrowserProvider = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const updateHistory = (url) => {
    setCurrentUrl(url);
    setInputValue(url); // Sync input with new URL
  };

  return (
    <BrowserContext.Provider
      value={{
        currentUrl,
        setCurrentUrl,
        inputValue,
        setInputValue,
        updateHistory,
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};

export default BrowserProvider;
