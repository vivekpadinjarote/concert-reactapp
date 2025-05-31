import { Link } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import checkAuth from "./Components/auth/checkAuth";
import HomePage from "./Components/home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
