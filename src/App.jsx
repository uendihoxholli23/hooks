import React from "react";
import { useState, createContext, useContext } from "react";
import "./index.css";
import ReactSwitch from "react-switch";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";

export const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={[theme, toggleTheme]}>
        <div className="App" id={theme}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/update-profile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="/forgot-password"
                  element={<ForgotPassword />}
                ></Route>
              </Routes>
            </AuthProvider>
          </Router>
          <div className="switch">
            <label> {theme === "light" ? "Light mode" : "Dark mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
