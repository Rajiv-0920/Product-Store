import { createContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigation } from "react-router-dom";

export const ThemeContext = createContext();

export function RootLayout() {
  const [theme, setTheme] = useState("light");
  const { state } = useNavigation();

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, [theme]);

  function handleTheme() {
    setTheme((prev) => {
      localStorage.setItem("theme", prev === "light" ? "dark" : "light");
      return prev === "light" ? "dark" : "light";
    });
  }
  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className={`fluid-container ${theme}`}>
        <div className="container">
          <Navbar handleTheme={handleTheme} />
          {state === "loading" ? (
            <div className="loader-container">
              <div
                className="loader"
                style={{
                  color: theme === "dark" ? "#fff" : "#333",
                }}
              />
            </div>
          ) : (
            <Outlet />
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={3}
            theme={theme}
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
