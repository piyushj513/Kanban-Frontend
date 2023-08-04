import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import ErrorLogin from "./components/ErrorLogin";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/home"
          element={isLoggedIn === true ? <Home /> : <ErrorLogin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
