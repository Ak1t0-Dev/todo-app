import "./App.css";
import Header from "./views/components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./views/pages/Login/Login";
import { Register } from "./views/pages/Register/Register";
import { Home } from "./views/pages/Home/Home";
import { PostPage } from "./views/pages/PostPage/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
