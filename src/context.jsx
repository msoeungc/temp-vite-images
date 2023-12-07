import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

// Function for setting isDarkTheme initial state based of browser pref or localStorage pref
const getInitialDarkMode = () => {
  // Checking to see user browser preference for dark mode -> Returns true or false
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  // getting item from localStorage with key darkTheme -> returns 'true' or null
  const storedDarkMode = localStorage.getItem("darkTheme");
  // if storedDarkMode is null return prefersDarkMode value -> true/false
  // else if storedDarkMore is === 'true', return true/false
  return storedDarkMode === null ? prefersDarkMode : storedDarkMode === "true";
};

export const AppProvider = ({ children }) => {
  // Setting initial state to result returned from dark mode preference function
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // Setting darkTheme key value to newDarkTheme value
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  // useEffect hook to check if dark theme is preferred and
  // to add dark theme class to body element if true
  useEffect(() => {
    // Adding/not adding css class to body element dependent on state
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
