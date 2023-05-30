import "./App.css";
import Header from "./views/components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/pages/Login/Login";
import { Register } from "./views/pages/Register/Register";
import { Home } from "./views/pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
