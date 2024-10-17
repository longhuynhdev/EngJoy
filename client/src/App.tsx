import {Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
