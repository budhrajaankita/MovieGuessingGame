// import logo from './logo.svg';
// import "./App.css";
import Login from "./components/Login";
import GamePage from "./components/GamePage";
import GenreSelection from "./components/GenreSelection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/genreSelection" element={<GenreSelection />} />
        <Route exact path="/movieGame" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
