import React from "react";
import { useGlobalContext } from "./context";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  // State and state managing function from global context
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <section className="toggle-container">
      {/* Managing dark theme toggle */}
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <FaSun className="toggle-icon" />
        ) : (
          <FaMoon className="toggle-icon" />
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
