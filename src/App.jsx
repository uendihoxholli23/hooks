import React from "react";
import { useState, createContext, useContext } from "react";
import "./index.css";
import ReactSwitch from "react-switch";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./Context/AuthContext";

export const ThemeContext = createContext(null);

export default function App() {
  console.log("env: ", import.meta.env);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <AuthProvider>
        <ThemeContext.Provider value={[theme, toggleTheme]}>
          <Container className="d-flex align-items-center justify-content-center">
            <div className="App" id={theme}>
              <Profile />
              <Signup />
              <div className="switch">
                <label> {theme === "light" ? "Light mode" : "Dark mode"}</label>
                <ReactSwitch
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
              </div>
            </div>
          </Container>
        </ThemeContext.Provider>
      </AuthProvider>
    </>
  );
}
