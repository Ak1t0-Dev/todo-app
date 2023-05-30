import "./App.css";
import Header from "./views/components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/pages/Login/Login";
import { Register } from "./views/pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
