import React from "react";
import { useState, createContext, useContext } from "react";
import "./index.css";
import ReactSwitch from "react-switch";
import Profile from "./Components/Profile";

export const AuthContext = createContext();
export const ThemeContext = createContext(null);

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={[theme, toggleTheme]}>
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="App" id={theme}>
            <Profile />
            <WelcomePanel />
            <div className="switch">
              <label> {theme === "light" ? "Light mode" : "Dark mode"}</label>
              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
            </div>
          </div>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

const LoginForm = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const canLogin = firstName !== "" && lastName !== "";
  return (
    <>
      <label>
        First name{": "}
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{": "}
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({
            name: firstName + " " + lastName,
          });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
};

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

function WelcomePanel() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ? <Greeting /> : <LoginForm />}
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Greeting() {
  const { currentUser } = useContext(AuthContext);
  return <p>You logged in as {currentUser.name}.</p>;
}
